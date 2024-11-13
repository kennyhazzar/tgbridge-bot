import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  handleListener(@Body() payload: Record<string, any>) {
    setImmediate(() => {
      // this.appService.handleListener(payload);
      console.log({ payload });
    });
  }
}
