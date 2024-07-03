
export interface UserNotificationAttributes {
  id?: string;
  patientID: string;
  notificationID: string;
  notifications: string;
}

export interface PatientNotificationAttributes {
  id?: string;
  patientID: string;
  userID: string;
  medicineTime: string;
  message: string;
  isRead?:boolean;
  link?:string;
  type?: string;
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

export interface MessagesAttributes {
  id?: string;
  chatID?: string;
  text?: string;
  senderID?: string;
}


