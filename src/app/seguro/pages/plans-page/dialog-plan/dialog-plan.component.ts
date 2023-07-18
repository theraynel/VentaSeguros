import { Component } from '@angular/core';
 import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { Plans } from 'src/app/seguro/interfaces/plans';

import { PlansService } from 'src/app/seguro/services/plans.service';

@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  providers: [ MessageService],
  styles: [],
})
export class DialogPlanComponent {
  public code: string = '';
  public name: string = '';
  public cuota: number = 0;
  public edad: number = 0;
  public id: number = 0;
  public estado: boolean = false;

  constructor(
    private planServices: PlansService,
    public ref: DynamicDialogRef,
    private mess: MessageService,
    private config: DynamicDialogConfig
  ) {
    this.code = this.config.data.codigo;
    this.name = this.config.data.nombre;
    this.cuota = this.config.data.cuota;
    this.edad = this.config.data.edadMaxima;
    this.id = this.config.data.id;
    this.estado = this.config.data.estado;
  }

  addPlan() {
    const plan: Plans = {id: 0, codigo: this.code, nombre: this.name, cuota: this.cuota, edadMaxima: this.edad, estado: this.estado};

    this.planServices.addPlan(plan).subscribe((res) => {
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
      const plan: Plans = {
        id: this.id,
        codigo: this.code,
        nombre: this.name,
        cuota: this.cuota,
        edadMaxima: this.edad,
        estado: this.estado,
      };

      this.planServices.editPlan(this.id, plan).subscribe((res) => {
        if (res === null) {
          this.ref.close(plan);
        }else{
          this.mess.add({
            severity: 'error',
            summary: 'Plan Editado',
            detail: 'A ocurrido un error al intentar editar el Plan!',
          });
        }
      });
    } else {
      this.mess.add({
        severity: 'error',
        summary: 'Plan Creado',
        detail: 'Debe enviar la data a Editar',
      });
    }
  }

  close(){
    this.ref.close();
  }
}
