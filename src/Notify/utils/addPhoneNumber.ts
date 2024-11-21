import { Op } from "sequelize";
import { User } from "../domain/models/user.model";
import { NotificationCategory } from "../domain/models/notify/notificationCategory.model";
import { Notification } from "../domain/models/notify/notification.model";
import { NotificationSubCategory } from "../domain/models/notify/notificationSubCategory.model";
import { AppModule } from "../domain/models/appModules/appModules";
import moment from "moment";

export async function addPhoneNumber() {
  try {
    const currentDate = moment().format("YYYY-MM-DD");

    const nullPhones = await User.findAll({
      where: {
        phoneNo: {
          [Op.is]: null,
        },
      } as any,
    });

    console.log("findin");

    //   find notificationcateory
    const communication = await NotificationSubCategory.findOne({
      where: {
        notificationSubCategoryName: "Contacts",
      },
    });

    const appModule = await AppModule.findOne({
      where: {
        title: "Users",
      },
    });

    
     const notifications = await Promise.all(
      nullPhones.map(async (user) => {
      const isSet = await Notification.findOne({
        where: {
          userID: user.id,
          currentDate,
        },
      });

      if (!isSet) {
        return {
          notificationSubCategoryID: communication?.id,
          notificationDescription: `Kindly add ${user.firstName} ${user.middleName} number for easier communication`,
          moduleID: appModule?.id,
          userID: user.id,
          currentDate,
        };
      }
      return null
    }))

    const validNotification = notifications.filter(Boolean)

    if (validNotification?.length > 0) {
      console.log(validNotification, 'notifications')
      const isToday = await Notification.bulkCreate(validNotification);
    }
  } catch (error) {
    console.log(error);
  }
}
