import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notifiation: Notification): Promise<void>
  abstract countManyByRecipentId(recipientId: string): Promise<number>
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>
}
