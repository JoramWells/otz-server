import { MessagesAttributes } from "../../models/chats/messages.model";

export class MessageEntity implements MessagesAttributes {
  constructor(
    public chatID?: string,
    public id?: string,
    public text?: string,
    public senderID?: string
  ) {}
}
