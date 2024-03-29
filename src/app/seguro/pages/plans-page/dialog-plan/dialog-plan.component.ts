import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { Plans } from 'src/app/seguro/interfaces/plans';

import { PlansService } from 'src/app/seguro/services/plans.service';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  providers: [MessageService],
  styles: [],
})
export class DialogPlanComponent {
  public code: string = '';
  public name: string = '';
  public cuota: number = 0;
  public edad: number = 0;
  public id: number = 0;
  public estado: boolean = false;
  public user_id: number = 0;

  public common = new segurosCommon();

  planForm = this.fb.group({
    codePlan: ['', Validators.required],
    namePlan: ['', Validators.required],
    cuotaPlan: ['', Validators.required],
    edadPlan: [null, Validators.min(1)],
  });

  constructor(
    private planServices: PlansService,
    public ref: DynamicDialogRef,
    private mess: MessageService,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.code = this.config.data.codigo;
    this.name = this.config.data.nombre;
    this.cuota = this.config.data.cuota;
    this.edad = this.config.data.edadMaxima;
    this.id = this.config.data.id;
    this.estado = this.config.data.estado;
    this.user_id = this.config.data.user_id;
  }

  addPlan() {
    const plan: Plans = {
      id: 0,
      codigo: this.code,
      nombre: this.name,
      cuota: this.cuota,
      edadMaxima: this.edad,
      estado: true,
      user_id: this.common.getUserId(),
    };

    this.planServices.addPlan(plan).subscribe((res) => {
      if (res.id > 0) {
        this.ref.close(res);
      } else {
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
        user_id: this.user_id
      };

      this.planServices.editPlan(this.id, plan).subscribe((res) => {
        if (res === null) {
          this.ref.close(plan);
        } else {
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

  close() {
    this.ref.close();
  }
}
