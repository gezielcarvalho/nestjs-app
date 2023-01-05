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
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/interceptors/auth.guard';


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
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@Session() session: any) {
        return this.service.findOne(session.userId);
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    /**
     * findUser
     */
    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any ) {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any) {
        return session.color;
    }

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
