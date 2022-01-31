import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthStrategy } from './auth/jwt.strategy';
import { CacheModule } from '@nestjs/common';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    CacheModule.register(),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthStrategy],
})
export class AppModule {}
