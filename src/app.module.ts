import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule, TelegrafModuleOptions } from 'nestjs-telegraf';
import { MainUpdate } from './telegram';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TelegrafModuleOptions> => {
        const token = configService.get('BOT_TOKEN');

        return {
          token,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, MainUpdate],
})
export class AppModule {}
