import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { HashController } from './hash/hash.controller';
import { LinkController } from './link/link.controller';
import { RecaptchaController } from './recaptcha/recaptcha.controller';

@Module({
  imports: [],
  controllers: [HashController, LinkController, RecaptchaController],
  providers: [AppService],
})
export class AppModule {}
