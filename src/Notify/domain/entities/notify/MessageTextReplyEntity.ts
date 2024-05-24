import { MessageTextReplyAttributes } from "../../models/notify/messageTextReply.model";

export class MessageTextReplyEntity implements MessageTextReplyAttributes {
  constructor(
    public id: string,
    // public patientID: string,
    public messageText: string,
  ) {}
}
