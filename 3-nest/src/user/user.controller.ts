import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  register(@Body() body: any) {
    return this.userService.register(body);
  }

  @Get('/all')
  getAllUser() {
    return this.userService.getAll();
  }
  @Get('/search/:term')
  searchUser(@Param('term') term: string) {
    return this.userService.searchUser(term);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  getUserID(@Param('id') id: string) {
    return this.userService.getOne(id);
  }

  @Put('/:id')
  replaceValuePut(@Param('id') id: string, @Body() body: any) {
    return this.userService.replaceValuePut(id, body);
  }
  @Patch('/reset')
  resetDatabase() {
    return this.userService.resetDatabase();
  }

  @Patch('/:id')
  replaceValuePatch(@Param('id') id: string, @Body() body: any) {
    return this.userService.replaceValuePatch(id, body);
  }



  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }



}
