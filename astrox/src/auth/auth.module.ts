import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './jtw.constants';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '45m' },
    }),
  ],
  providers: [PrismaService, AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
