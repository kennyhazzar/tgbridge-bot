import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  async handleListener(payload: Record<string, any>) {
    console.log({ payload });
  }
}
