import { Clients } from "src/app/seguro/interfaces/clients";

export class segurosCommon {
  constructor() {}

  getStatus(status: boolean): string {
    return status === true ? 'Activo' : 'Inactivo';
  }

  getSeverity(status: boolean) {
    return status === true
      ? 'p-button-primary p-button-text'
      : 'p-button-danger p-button-text';
  }

  getSexo(sex: string) {
    return sex === 'M' ? 'Masculino' : 'Femenino';
  }

  getListSex() {
    const list = [
      { name: 'Masculino', code: 'M' },
      { name: 'Femenino', code: 'F' },
    ];

    return list;
  }

  getMes(mes: number){

     switch (mes) {
      case 1: return "Enero";
      case 2: return "Febrero";
      case 3: return "Marzo";
      case 4: return "Abril";
      case 5: return "Mayo";
      case 6: return "Junio";
      case 7: return "Julio";
      case 8: return "Agosto";
      case 9: return "Septiembre";
      case 10: return "Octubre";
      case 11: return "Noviembre";
      case 12: return "Diciembre";
      default : return "";
     }
  }

  getCbListClient(clients: Clients[]) {
    return clients.map((t) => {
      return {
        id: t.id,
        nombre: t.nombre,
        cedula: t.cedula,
        apellido: t.apellido,
        sexo: t.sexo,
        email: t.email,
        fechaNacimiento: t.fechaNacimiento,
        nombreCompleto: `${t.nombre} ${t.apellido}`,
        user_id: t.user_id
      };
    });
  }

  getUserId(): number{
    const currentUser = sessionStorage.getItem('currentUser');

    const userId = currentUser?.length ? JSON.parse(currentUser).id : 0;

    return Number(userId)
  }
}
