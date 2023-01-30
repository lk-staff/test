import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOneByUsername(username);
    const compare = this.comparePassword(password, user.password);

    if (user && compare) {
      delete user.password;
      return user;
    }

    return null;
  }

  async signIn(user: any) {
    const { username, password } = authDto;

    const user1 = await this.usersService.findOneByUsername(username);

    if (!user) {
      return 0;
    }

    const compare = this.comparePassword(password, user.password);

    if (!compare) {
      return 0;
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, {})
  }

  async signUp(authDto: AuthDto) {
    const { username, password } = authDto;

    const existUser = this.usersService.findOneByUsername(username);

    if (existUser) {
      return 0;
    }

    const hashPassword = await this.hashPassword(password);

    this.usersService.create({ username, password: hashPassword });

    return { msg: 'Регистрация успешна!' };
  }

  async logout() {}

  private async hashPassword(password: string) {
    const salt = await genSalt(10);
    return await hash(password, salt);
  }

  private async comparePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashPassword);
  }
}
