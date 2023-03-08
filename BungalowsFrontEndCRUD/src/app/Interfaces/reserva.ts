export interface Reserva {
    idReserva: number,
    nombreCompleto: string,
    idTipoReserva: number,
    nombreTipoReserva?: string,
    costo: number,
    fechaInicio: string,
    fechaSalida: string
}
