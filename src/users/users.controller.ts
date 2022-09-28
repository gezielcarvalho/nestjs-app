import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
    @Get('/:id')
    public findUser(@Param('id') id: string) {
        return this.service.findOne(parseInt(id));
    }

    /**
     * findAllUser
     */
    @Get()
    public findAllUser(@Query('email') email: string) {
        return this.service.find(email);
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
