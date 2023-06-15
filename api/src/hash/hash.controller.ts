import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../app.service'

@Controller('hash')
export class HashController {
  constructor(private readonly appService: AppService) {}

    @Post(':hash')
    uploadLink(@Body() par) {
      return this.appService.linkFromHash(par);
    }
}
