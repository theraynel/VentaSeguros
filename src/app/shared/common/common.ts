
export class segurosCommon {
  constructor() {
  }

  getStatus(status: boolean): string {
    return status === true ? 'Activo' : 'Inactivo';
  }

  getSeverity(status: boolean) {
    return status === true ? 'p-button-primary p-button-text' : 'p-button-danger p-button-text';
  }

  getSexo(sex: string){
    return sex === 'M'? 'Masculino' : 'Femenino'
  }
}
