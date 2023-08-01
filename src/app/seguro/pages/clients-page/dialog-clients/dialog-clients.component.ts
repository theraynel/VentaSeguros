import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';


import { Clients } from 'src/app/seguro/interfaces/clients';
import { Sex } from 'src/app/seguro/interfaces/sex';
import { ClientService } from 'src/app/seguro/services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-dialog-clients',
  templateUrl: './dialog-clients.component.html',
  styleUrls: [],
})
export class DialogClientsComponent implements OnInit {
  public nombre: string = '';
  public apellido: string = '';
  public cedula: string = '';
  public id: number = 0;
  public sexo: string ='';
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

    // console.log("this.fechaNacimiento",this.pipe.transform(this.fechaNacimiento, 'dd/MM/YYYY'));

  }

  ngOnInit() {
    this.sexs = this.common.getListSex();
    this.fechaNacimiento = new Date(this.config.data.fechaNacimiento);
  }

  addPlan() {
    const client: Clients = {
      id: 0,
      nombre: this.nombre,
      apellido: this.apellido,
      cedula: this.cedula,
      fechaNacimiento: new Date(this.fechaNacimiento),
      sexo: this.sexo,
    };

    this.clientServices.addClient(client).subscribe((res) => {
      console.log("res del api", res);

      if (res.id > 0) {
        this.ref.close(res);
      }else{
        this.mess.add({
          severity: 'error',
          summary: 'Plan Creado',
          detail: 'A ocurrido un error al crear Plan',
        });
      }
    });
  }
  editPlan() {
    if (this.id > 0) {
      const client: Clients = {
        id: this.id,
        nombre: this.nombre,
        apellido: this.apellido,
        cedula: this.cedula,
        fechaNacimiento: new Date(this.fechaNacimiento),
        sexo: this.sexo,
      };

      console.log("this.fechaNacimiento",this.fechaNacimiento);
      console.log("this.fechaNacimiento2",new Date(this.fechaNacimiento));
      // console.log("this.fechaNacimiento33",this.pipe.transform(this.fechaNacimiento, 'dd/MM/YYYY'));
      console.log("cliente",client);


      this.clientServices.editClient(this.id, client).subscribe((res) => {
        if (res === null) {
          this.ref.close(client);
        } else {
          this.mess.add({
            severity: 'error',
            summary: 'Cliente Editado',
            detail: 'A ocurrido un error al intentar editar el Plan!',
          });
        }
      });
    } else {
      this.mess.add({
        severity: 'error',
        summary: 'Cliente Creado',
        detail: 'Debe enviar la data a Editar',
      });
    }
  }

  close() {
    this.ref.close();
  }
}
