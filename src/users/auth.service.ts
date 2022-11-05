import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService
    ) { }

    async signup(email: string, password: string) {
        // 1.See if email is in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('email in use');
        }

        // 2.Hash the users password
        // 2.1.Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');
        
        // Create a new user and save it
        const user  = await this.usersService.create(email, result);

        // return a new user 
        return user;
    }

    async signin(email: string, password: string) {
        const [user]  = await this.usersService.find(email);
        if (!user){
            throw new NotFoundException('User not found!');
        }
        const [salt,hash] = user.password.split('.');
        const reHash = (await scrypt(password, salt, 32)) as Buffer;

        if(hash !== reHash.toString('hex')){
            throw new BadRequestException('Incorrect Credentials');
        }
        return user;
    }
}