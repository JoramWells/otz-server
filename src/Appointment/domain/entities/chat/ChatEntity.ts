import { ChatAttributes } from "../../models/chats/chat.model";

export class ChatEntity implements ChatAttributes {
  constructor(
    public members?: string[],
    public id?: string,
  ) {}
}
