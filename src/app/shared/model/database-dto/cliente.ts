import { Conyuge } from "./conyuge";
import { Usuario } from "./usuario";

export class Cliente {
    dni: string;
    nombre: string;
    apaterno: string;
    amaterno: string;
    celular: string;
    correo: string;
    estado_civil: number;
    direccion: string;
    fk_conyuge: string;
    fk_usu_venta: string;
    vendedor: Usuario;
    conyuge: Conyuge = null
}