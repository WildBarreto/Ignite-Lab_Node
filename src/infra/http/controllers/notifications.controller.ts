import { GetRecipientNotifications } from './../../../application/use-cases/errors/get-recipient-notification';
import { CountRecipientNotifications } from './../../../application/use-cases/errors/count-recipient-notifications';
import { UnreadNotification } from './../../../application/use-cases/errors/unread-notification';
import { ReadNotification } from './../../../application/use-cases/errors/read-notifications';
import { CancelNotification } from './../../../application/use-cases/errors/cancel-notification';
import { SendNotification } from './../../../application/use-cases/errors/send-notification';
import { NotificationViewModel } from './../view-models/notification-view-model';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post, Param, Patch, Get } from '@nestjs/common';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private SendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string,
  ): Promise<{ count: number }> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string,
  ){
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
     notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    console.log(body);
    const { recipientId, content, category } = body;

    const { notification } = await this.SendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationViewModel.toHTTP(notification),
    };
  }
}
