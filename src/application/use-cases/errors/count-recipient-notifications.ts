import { NotificationsRepository } from '@application/repositories/notification-repository';
import { NotificationNotFound } from './notification-not-found';

import { Injectable } from '@nestjs/common';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

const count = await this.notificationRepository.countManyByRecipentId(
  recipientId,
)
    

    return{count,}
  }
}
