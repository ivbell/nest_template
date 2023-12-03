import configuration from '@/src/config/configuration';
import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    JwtModule.register({
      global: true,
      secret: configuration().jwt.secret,
      signOptions: {
        expiresIn: configuration().jwt.expires_in,
      },
    }),
    forwardRef(() => UserModule),
  ],
  exports: [AuthService],
})
export class AuthModule {}
