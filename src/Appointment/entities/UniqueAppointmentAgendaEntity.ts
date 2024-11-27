export interface UniqueAppointmentInterface{
    status?: string
    count?: number
    agendaDescription?: string
    appointmentDate?: string | Date
    [key: string]: string | number | Date | undefined
}