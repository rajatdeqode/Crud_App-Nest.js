import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user.dto';
import { User, UserDocument } from '../user/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}
  async createUser(signupUserDto: SignupUserDto) {
    this.logger.log(
      `signupUser:Inside auth service provider:${AuthService.name}`,
    );

    try {
      const findUser = await this.userModel.findOne({
        email: signupUserDto.email,
      });
      if (findUser) {
        return { status: 400, message: 'User is already register' };
      }
      const saltOrRounds = 10;
      const password = signupUserDto.password;
      const hash = await bcrypt.hash(password, saltOrRounds);
      const createdUser = new this.userModel({
        name: signupUserDto.name,
        email: signupUserDto.email,
        password: hash,
        createdOn: new Date(),
        isDeleted: false,
      });
      return createdUser.save();
    } catch (e) {
      console.log(e);
      this.logger.log(e.toString());
    }
  }
  async loginUser(loginUserDto: LoginUserDto) {
    this.logger.log(
      `LoginUser:Inside auth service provider:${AuthService.name}`,
    );
    try {
      const user = await this.userModel.findOne({ email: loginUserDto.email });
      if (!user) {
        throw new BadRequestException('User not found');
      }
      const compare = bcrypt.compareSync(loginUserDto.password, user.password);
      if (!compare) {
        throw new BadRequestException('Please enter valid credentials');
      }
      const access_token = this.jwtService.sign({
        email: user.email,
        userId: user._id,
      });
      return access_token;
    } catch (e) {
      console.log(e);
      this.logger.log(e.toString());
    }
  }
}
