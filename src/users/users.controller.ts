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
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
    constructor(
        private service: UsersService,
        private authService: AuthService
    ){}
    /**
     * createUser
     */
    @Post('/signup')
    public createUser(@Body() body: CreateUserDto) {
        return this.authService.signup(body.email, body.password);
    }

    @Post('/signin')
    public signin(@Body() body: CreateUserDto) {
        return this.authService.signin(body.email, body.password);
    }

    /**
     * findUser
     */
    @Get('/:id')
    public async findUser(@Param('id') id: string) {
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
