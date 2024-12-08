import { Server, Socket } from "socket.io";
import { PharmacySocketIO } from "../../../application/usecase/pharmacy.usecase";

const pharmacyNotifications = new PharmacySocketIO()

export const pharmacySocketController = (io: Server, socket: Socket) =>{
    socket.on("getPharmacyNotifications", (pharmacySocket) => {
        // console.log(pharmacySocket, "pharmacy-data");

        pharmacyNotifications.sendPharmacyNotification(pharmacySocket)

        io.emit("newPharmacyNotifications", pharmacySocket);
    });
}