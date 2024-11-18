
export interface UserNotificationAttributes {
  id?: string;
  patientID: string;
  notificationID: string;
  notifications: string;
}

export interface PatientNotificationAttributes {
  id?: string;
  patientID?: string;
  userID?: string;
  medicineTime?: string;
  message: string;
  isRead?: boolean;
  isSent?:boolean;
  isSentDate?:Date;
  link?: string;
  type?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface NotificationTypeAttributes {
  id: string;
  notificationTypeName: string;
}

export interface NotificationSubCategoryAttributes {
  id: string;
  notificationCategoryID: string;
  notificationSubCategoryName: string;
}

export interface NotificationCategoryAttributes {
  id: string;
  notificationDescription: string;
}

export interface NotificationAttributes {
  id: string;
  notificationSubCategoryID: string;
  notificationDescription: string;
}

export interface MessageTextReplyAttributes {
  id: string;
  messageText: string;
}

export interface ChatAttributes {
  id?: string;
  // messages?: string;
  members?: string[];
}

export enum MessageTypes{
  text ='text',
  doc='doc',
  image = 'image',
  video = 'video',
  link = 'link'
}

export interface MessagesAttributes {
  id?: string;
  chatID?: string;
  text?: string;
  type?: MessageTypes;
  filePath?: string;
  senderID?: string;
  isSent?: boolean
  isRead?: boolean
}

export enum FriendRequestStatus{
  Pending = 'pending',
  Accepted= 'accepted',
  Rejected='rejected'
}

export interface FriendRequestsAttributes {
  id?: string;
  patientID?: string;
  from?: string;
  message: string;
  status: FriendRequestStatus;
}

export interface PhoneNumberVerificationInterface {
  id?: string;
  patientID?: string;
  userID?: string;
  phoneNo: string;
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}


