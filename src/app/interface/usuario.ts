export interface UsuarioI {
    nombre: string,
    apellidoPaterno: string,
    apellidoMaterno: string,
    curp: string,
    fechaNacimiento: string,
    email: string,
    password: string,
    telefono: string,

    banco: {
        idBanco:number
    }
}