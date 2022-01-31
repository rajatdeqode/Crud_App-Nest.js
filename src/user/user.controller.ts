import {
  Logger,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Req,
  Query,
  CacheTTL,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query, Request } from 'express';
import { UserService } from './user.service';
import { UpdateUserDto, updateUserValidation } from './dto/update-user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CacheTTLTime } from './schemas/user.schema';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @CacheTTL(CacheTTLTime.FIVE_MINUTE)
  @Get('get-user-by-id/:id')
  async getById(@Param('id') id: string, @Req() request: Request) {
    if (!id) {
      return 'id is required';
    }

    return await this.userService.getUserById(id);
  }
  @CacheTTL(CacheTTLTime.FIVE_MINUTE)
  @ApiBearerAuth()
  @Get('get-all-user')
  async getAllUser(@Query() query) {
    return await this.userService.getAllUser(query);
  }
  @ApiBearerAuth()
  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await updateUserValidation.validateAsync(updateUserDto);
    return this.userService.updateUser(id, updateUserDto);
  }
  @ApiBearerAuth()
  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    if (!id) {
      return 'id is required';
    }
    return this.userService.deleteUser(id);
  }
}
