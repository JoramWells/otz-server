import { Op } from "sequelize";
import { User } from "../domain/models/user.model";
import { NotificationCategory } from "../domain/models/notify/notificationCategory.model";
import { Notification } from "../domain/models/notify/notification.model";
import { NotificationSubCategory } from "../domain/models/notify/notificationSubCategory.model";

export async function addPhoneNumber(moduleID: string, hospitalID: string) {
  const nullPhones = await User.findAll({
    where: {
      phoneNo: {
        [Op.is]: null,
      },
    } as any,
  });

  //   find notificationcateory
  const communication = await NotificationSubCategory.findOne({
    where: {
      notificationSubCategoryName: "Contacts",
    },
  });

  const notifications = nullPhones.map((user) => ({
    notificationSubCategoryID: communication?.id,
    notificationDescription: `Kindly add ${user.firstName} number for easier communication`,
    moduleID,
    hospitalID,
  }));

  await Notification.bulkCreate(notifications)
}
