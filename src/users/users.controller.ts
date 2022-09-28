import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(
        private service: UsersService
    ){}
    /**
     * createUser
     */
    @Post('/signup')
    public createUser(@Body() body: CreateUserDto) {
        this.service.create(body.email, body.password);
    }

    /**
     * findUser
     */
    public findUser() {
        
    }

    /**
     * findAllUser
     */
    public findAllUser() {
        
    }

    /**
     * updateUser
     */
    public updateUser() {
        
    }

    /**
     * removeUser
     */
    public removeUser() {
        
    }


}
