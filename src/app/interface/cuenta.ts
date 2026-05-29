import { UsuarioI } from "./usuario";

export interface CuentaI {
    usuario: UsuarioI,
    banco: {
        idBanco: number,
        nombre: String
    }
}
