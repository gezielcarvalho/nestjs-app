import { Test } from '@nestjs/testing';
import { AuthService } from "./auth.service";
import { User } from './user.entity';
import { UsersService } from "./users.service";

describe('AuthService', () => {
    
    let service: AuthService;

    beforeEach(async () => {
        // Mock UsersService
        const mockUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: () => Promise.resolve({
                id: 1,
                email: 'test@test.com',
                password: '123456'
            } as User),
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: mockUsersService
                }
            ]
        }).compile();

        service = module.get(AuthService);

    });

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });
});

