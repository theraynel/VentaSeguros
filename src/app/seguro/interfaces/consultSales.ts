export interface ConsultSales
{
    id: number,
    nombre: string,
    apellido: string,
    cedula: string,
    fechaNacimiento: Date
    fechaVenta: Date,
    NoSeguro: string,
    Montocuota: number,
    noProducto: number,
    idTiposeguro: number,
    tipoSeguro: string,
    idPlan: number,
    tipoPlan: string,
    idTipoCuenta: number,
    tipoCuenta: string
}
