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

    const isSet = await Notification.findOne({
      where: {
        currentDate,
      },
    });

    if (isSet === null) {
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

      const notifications = nullPhones.map((user) => ({
        notificationSubCategoryID: communication?.id,
        notificationDescription: `Kindly add ${user.firstName} ${user.middleName} number for easier communication`,
        moduleID: appModule?.id,
        userID: user.id,
        currentDate,
      }));

      const isToday = await Notification.bulkCreate(notifications);
    }
  } catch (error) {
    console.log(error);
  }
}
