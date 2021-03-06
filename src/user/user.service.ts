import { Injectable, Logger } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async updateUser(id, updateUserDto: UpdateUserDto) {
    this.logger.log(
      `updateUser:Inside update user provider:${UserService.name}`,
    );
    if (!id) {
      return 'id is required';
    }
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          name: updateUserDto.name,
          email: updateUserDto.email,
          updatedOn: new Date(),
          isDeleted: false,
        },
        {
          new: true,
        },
      );
      if (!updatedUser) {
        return 'User not found';
      }
      return updatedUser;
    } catch (e) {
      console.log(e);
      return this.logger.error(e.toString());
    }
  }
  async deleteUser(id) {
    this.logger.log(
      `deleteUser:Inside delete user provider:${UserService.name}`,
    );
    if (!id) {
      return 'id is required';
    }
    try {
      const deletedUser = await this.userModel
        .findByIdAndUpdate(
          id,
          {
            isDeleted: true,
          },
          {
            new: true,
          },
        )
        .select('-__v -createdOn -updatedOn -password');
      if (!deletedUser) {
        return 'User not found';
      }
      return deletedUser;
    } catch (e) {
      console.log(e);
      return this.logger.error(e.toString());
    }
  }
  async getAllUser(query) {
    this.logger.log(
      `getAllUsers:Inside get all user provider ${UserService.name}`,
    );
    const per_page = parseInt(query.per_page) ? parseInt(query.per_page) : 10;
    const page_no = parseInt(query.page_no) ? parseInt(query.page_no) : 1;
    try {
      const getUser = await this.userModel
        .find()
        .where('isDeleted')
        .equals(false)
        .select('-__v -createdOn -updatedOn -isDeleted -password')
        .limit(per_page)
        .skip((page_no - 1) * per_page);
      return getUser;
    } catch (e) {
      console.log(e);
      return this.logger.error(e.toString());
    }
  }
  async getUserById(id) {
    this.logger.log(`getUsers:Inside get user provider${UserService.name}`);
    if (!id) {
      return 'id is required';
    }
    try {
      const getUser = await this.userModel
        .findById(id)
        .select('-__v -createdOn -updatedOn -isDeleted -password');
      if (!getUser) {
        return 'User not found';
      }
      return getUser;
    } catch (e) {
      console.log(e);
      return this.logger.error(e.toString());
    }
  }
}
