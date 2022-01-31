import { Logger, Body, Controller, Post } from '@nestjs/common';
import { SignupUserDto, signupUserValidation } from './dto/signup-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto, loginUserValidate } from './dto/login-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { SignupDto } from './dto/signup-user.dto';
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  private readonly logger = new Logger(AuthController.name);

  @Post('signup')
  async signupUser(@Body() signupUserDto: SignupDto) {
    let user = null;
    try {
      await signupUserValidation.validateAsync(signupUserDto);
      user = await this.authService.createUser(signupUserDto);
    } catch (e) {
      console.log(e.response);
      this.logger.error(e.toString());
    }
    return { status: 200, message: 'Success', user };
  }
  @Post('login')
  async loginUser(@Body() loginUserDto: LoginDto) {
    try {
      await loginUserValidate.validateAsync(loginUserDto);
      const access_token = await this.authService.loginUser(loginUserDto);
      return {
        status: 200,
        message: 'Success',
        access_token,
      };
    } catch (e) {
      console.log(e);
      this.logger.error(e.toString());
    }
  }
}
