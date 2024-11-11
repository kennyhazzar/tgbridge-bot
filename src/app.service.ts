import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class AppService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly configService: ConfigService,
  ) {}

  async handleListener(payload: Record<string, any>) {
    console.log({ payload });
    const { chatId, threadId } = this.botConfig;

    if (payload.event === 'join') {
      try {
        await this.bot.telegram.sendMessage(
          +chatId,
          `Игрок ${payload?.player || ''} зашел на сервер!`,
          {
            message_thread_id: +threadId,
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else if (payload.event === 'death') {
      try {
        await this.bot.telegram.sendMessage(
          +chatId,
          `Игрок ${payload?.player || ''} умер!`,
          {
            message_thread_id: +threadId,
          },
        );
      } catch (error) {
        console.log(error);
      }
    } else if (payload.event === 'quit') {
      try {
        await this.bot.telegram.sendMessage(
          +chatId,
          `Игрок ${payload?.player || ''} вышел с сервера!`,
          {
            message_thread_id: +threadId,
          },
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  get botConfig() {
    const chatId = this.configService.get('BOT_CHAT_ID');
    const threadId = this.configService.get('BOT_THREAD_ID');

    return { chatId, threadId };
  }
}
