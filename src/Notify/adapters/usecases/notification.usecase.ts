import { PatientNotificationAttributes } from "otz-types";
import { PatientNotificationInteractor } from "../../application/interactors/notify/patientNotificationInteractor";
import { PatientNotificationRepository } from "../repositories/notify/paitientNotificationRepository";

async function createNotification(data: PatientNotificationAttributes[]){
    const repository = new PatientNotificationRepository()
    const interactor = new PatientNotificationInteractor(repository)
    return await interactor.createPatientNotification(data)
}

export {createNotification}