import { Op } from "sequelize";
import { Chat } from "../domain/models/chats/chat.model";
import { Messages } from "../domain/models/chats/messages.model";

export async function notifySockets (id: string){
    // find recent chats
    // const recentMessages = await Messages.findAll({
    //     where:{
    //         chatID
    //     }
    // })

    // find recent chats
    const recentChat = Chat.findAll({
      where: {
        members: {
          [Op.contains]: [id],
        },
      },

      include: [
        {
          model: Messages,
          attributes: ["text", "createdAt"],
          limit: 1,
          order: [["createdAt", "DESC"]],
        },
      ],
    }); 

    return recentChat

}