import { Body, Controller, Delete, Get, Param, Post, Query, Patch } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
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
    @Patch('/:id')
    public updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.service.update(parseInt(id), body);
    }

    /**
     * removeUser
     */
    @Delete('/:id')
    public removeUser(@Param('id') id: string ) {
        return this.service.remove(parseInt(id));
    }


}
