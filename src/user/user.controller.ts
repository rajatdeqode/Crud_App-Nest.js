import {
  Logger,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, createUserValidation } from './dto/create-user.dto';
import { UpdateUserDto, updateUserValidation } from './dto/update-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  private readonly logger = new Logger(UserController.name);

  @Post('add')
  async addUser(@Body() createUserDto: CreateUserDto) {
    try {
      await createUserValidation.validateAsync(createUserDto);
      const user = await this.userService.createUser(createUserDto);
      return user;
    } catch (e) {
      console.log(e);
      this.logger.error(e.toString());
    }
  }

  @Get('get-user-by-id/:id')
  async getById(@Param('id') id: string) {
    if (!id) {
      return 'id is required';
    }
    return await this.userService.getUserById(id);
  }

  @Get('get-all-user')
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  @Put('update-user/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await updateUserValidation.validateAsync(updateUserDto);
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete-user/:id')
  deleteUser(@Param('id') id: string) {
    if (!id) {
      return 'id is required';
    }
    return this.userService.deleteUser(id);
  }
}
