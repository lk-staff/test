import { Controller, Get, Post, Body, Patch, Param, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Req() reqeust: Request) {
    this.authService.signIn(reqeust.user);
  }
}
