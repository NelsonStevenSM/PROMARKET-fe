import { Cliente } from "./cliente";
import { Financiamiento } from "./financiamiento";

export class Puesto {
    id: string;
    nro_proyecto: number;
    nro_local: string;
    nivel: string;
    ancho: number;
    largo: number;
    profundidad: number;
    previo_venta: string;
    estado: number;
    fk_cliente: string;
    fk_financiamiento: string;
    comentario: string;
    cliente: Cliente
    financiamiento: Financiamiento

    conyuge_dni: string
    cliente_dni: string
    financiamiento_id: string
}