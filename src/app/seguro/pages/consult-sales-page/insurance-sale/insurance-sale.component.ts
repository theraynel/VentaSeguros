import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Sex } from 'src/app/seguro/interfaces/sex';
import { ClientService } from 'src/app/seguro/services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-insurance-sale',
  templateUrl: './insurance-sale.component.html',
  styles: [
  ]
})
export class InsuranceSaleComponent {

  public nombre: string = '';
  public apellido: string = '';
  public cedula: string = '';
  public id: number = 0;
  public sexo: string = '';
  public fechaNacimiento: Date;

  public common = new segurosCommon();

  public sexs: Sex[] = [];

  clientForm = this.fb.group({
    nameClient: ['', Validators.required],
    apellidoClient: ['', Validators.required],
    sexoClient: ['', Validators.required],
    cedulaClient: ['', Validators.required],
    fechaNacimientoClient: ['', Validators.required],
  });

  constructor(
    private clientServices: ClientService,
    public ref: DynamicDialogRef,
    private mess: MessageService,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.nombre = this.config.data.nombre;
    this.apellido = this.config.data.apellido;
    this.cedula = this.config.data.cedula;
    this.sexo = this.config.data.sexo;
    this.id = this.config.data.id;
    this.fechaNacimiento = new Date(this.config.data.fechaNacimiento);
  }

  ngOnInit() {
    this.sexs = this.common.getListSex();
    this.fechaNacimiento = new Date(this.config.data.fechaNacimiento);
  }

  editClient(){}
  addClient(){}
  close(){}

}
