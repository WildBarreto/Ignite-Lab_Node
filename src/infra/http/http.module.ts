import { SendNotification } from './../../application/use-cases/errors/send-notification';
import { UnreadNotification } from './../../application/use-cases/errors/unread-notification';
import { ReadNotification } from './../../application/use-cases/errors/read-notifications';
import { GetRecipientNotifications } from './../../application/use-cases/errors/get-recipient-notification';
import { CountRecipientNotifications } from './../../application/use-cases/errors/count-recipient-notifications';
import { CancelNotification } from './../../application/use-cases/errors/cancel-notification';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
