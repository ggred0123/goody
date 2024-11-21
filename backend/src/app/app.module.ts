import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './modules/config.module';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { RegionModule } from '../region/region.module';
import { CommonModule } from '../common/common.module';
import { ReviewModule } from '../review/review.module';
import { EventModule } from 'src/activity/activity.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    configModule,
    RegionModule,
    CommonModule,
    ReviewModule,
    EventModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
