import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Query, 
    Patch, 
    NotFoundException, 
    UseInterceptors, 
    ClassSerializerInterceptor 
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { SerializerInterceptor } from '../interceptors/serialize.interceptor';

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
    @UseInterceptors(SerializerInterceptor)
    @Get('/:id')
    public async findUser(@Param('id') id: string) {
        console.log('(2) Handler is running');
        const user = await this.service.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found!');
        }
        return user;
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
