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

    if (payload.event === 'join') {
      const { chatId, threadId } = this.botConfig;

      try {
        await this.bot.telegram.sendMessage(
          chatId,
          `Игрок ${payload?.player || ''} зашел на сервер!`,
          {
            message_thread_id: threadId,
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
