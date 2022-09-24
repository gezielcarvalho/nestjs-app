import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class UsersController {

    /**
     * createUser
     */
    @Post('/signup')
    public createUser(@Body() body: CreateUserDto) {
        console.log(body);
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
