
export class segurosCommon {
  constructor() {
  }

  getStatus(status: boolean): string {
    switch (status) {
      case true:
           return 'Activo'
      case false:
           return 'Inactivo'
      default:
        return 'Inactivo';
    }
  }

  getSeverity(status: boolean) {
    switch (status) {
        case true:
            return 'success';
        case false:
            return 'danger';
        default:
           return 'danger'
    }
  }
}
