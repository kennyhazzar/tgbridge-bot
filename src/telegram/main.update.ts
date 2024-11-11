import { Update, Use } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class MainUpdate {
  @Use()
  async proceed(ctx: Context, next: () => Promise<void>) {
    if (ctx.chat.type !== 'private') {
      return;
    }

    console.log(ctx.chat);

    next();
  }
}
