import { Controller, Delete, Get, Param, Post, Body, ParseIntPipe, ValidationPipe } from '@nestjs/common';

//

import { UserService } from './user.service';

// dto

import { CreateUserDto } from 'src/dto/create.user.dto';

@Controller('api/v1/user')
export class UserController {

  constructor(private readonly user: UserService) {}

  @Get()
  getUsers() {
    return this.user.getUser();
  }

  @Get(':id')
  getSingleUser(@Param('id', ParseIntPipe) id: number) {
    return this.user.getSingleUser(id);
  }

  @Post()
  createUser(@Body(new ValidationPipe()) user: CreateUserDto) {
    return this.user.createUser(user);
  }



  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.user.deleteUser(id);
  }
}
