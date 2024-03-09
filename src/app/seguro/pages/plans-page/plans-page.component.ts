import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans.service';
import { Plans } from '../../interfaces/plans';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPlanComponent } from './dialog-plan/dialog-plan.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  providers: [DialogService, MessageService, ConfirmationService],
  styles: [],
})
export class PlansPageComponent implements OnInit {
  ref: DynamicDialogRef | undefined;

  public planslts: Plans[] = [];
  public plans2: Plans = { id: 0, codigo: '', nombre: '', edadMaxima: 0, cuota: 0, estado: false };

  public common = new segurosCommon;

  constructor(
    private planServices: PlansService,
    public mess: MessageService,
    public confirmationService: ConfirmationService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.getPlan();
  }

  getPlan() {
    this.planServices.getPlans().subscribe((response: any) => {
      this.planslts = response;
    });
  }

  delete(plan: Plans) {
    this.confirmationService.confirm({
      message: 'Deseas eliminar este Registro?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.planServices.deletePlan(plan.id).subscribe((res) => {
          if (res == null) {
            this.getPlan();
            this.mess.add({
              severity: 'info',
              summary: 'Confirmed',
              detail: 'Registro eliminado Correctamente!',
            });
          }
        });
      },
      reject: () => {},
    });
  }

  show() {
    this.ref = this.dialogService.open(DialogPlanComponent, {
      header: 'Crear Plan',
      data: this.plans2,
    });

    this.ref.onClose.subscribe((plan) => {
      this.getPlan();

      if (plan !== undefined) {
        this.mess.add({
          severity: 'success',
          summary: 'Plan Creado',
          detail: `Plan ${ plan.nombre } creado con Exito!`
        });
      }
    });
  }

  openEdit(plan: Plans) {
    this.ref = this.dialogService.open(DialogPlanComponent, {
      header: 'Editar Plan',
      data: plan,
    });

    this.ref.onClose.subscribe((plan) => {
      this.getPlan();

      if (plan !== undefined) {
        this.mess.add({
          severity: 'success',
          summary: 'Plan Editado',
          detail: `Plan ${ plan.nombre } editado con Exito!`
        });
      }
    });
  }

  updateStatus(plan: Plans){
    if (plan.estado == true) plan.estado = false;
    else plan.estado = true;

    this.planServices
      .editPlan(plan.id, plan)
      .subscribe((res) => {
        if (res === null) {
          this.getPlan();
        }
      });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
