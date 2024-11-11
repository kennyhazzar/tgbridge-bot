import { Update, Use } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class MainUpdate {
  @Use()
  async proceed(ctx: Context, next: () => Promise<void>) {
    console.log(ctx.chat);
    console.log(ctx.message);

    next();
  }
}
