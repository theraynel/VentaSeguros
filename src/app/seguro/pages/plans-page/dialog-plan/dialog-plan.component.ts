import { Component, inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';

import { Plans } from 'src/app/seguro/interfaces/plans';

import { PlansService } from 'src/app/seguro/services/plans.service';


@Component({
  selector: 'app-dialog-plan',
  templateUrl: './dialog-plan.component.html',
  providers: [DynamicDialogRef, MessageService]
})
export class DialogPlanComponent  {

  public code: string = "";
  public name: string = "";
  public cuota: number = 0;
  public edad: number = 0;
  public id: number = 0;
  public estado: boolean = false;
  // @inject(ref) public refr

  constructor(
     private planServices: PlansService,
     public mess: MessageService,
     public ref: DynamicDialogRef,
     private config: DynamicDialogConfig<DialogPlanComponent>
  ){
    //  this.code = this.config.data.codigo;
    //  this.name = this.config.data.nombre;
    //  this.cuota = this.config.data.cuota;
    //  this.edad = this.config.data.edadMaxima;
    //  this.id = this.config.data.id;
    //  this.estado = this.config.data.estado;

     console.log("config",this.config);

  }


  addPlan(){
    // const plan: Plans = { id:0, codigo: this.code, nombre: this.name, cuota: this.cuota, edadMaxima: this.edad, estado:true};

    // this.planServices.addPlan(plan).subscribe( res => {
    //   console.log("response",res);
    //   if (res.id > 0) {
    //     console.log("Entro");
    //      this.dialog.close(plan);
    //      this.mess.add({ severity: 'success', summary: 'Plan Creado', detail: "Plan creado con Exito!" });
    //   }
    // });

    this.ref.close();
     this.ref.destroy();

    // this.mess.add({ severity: 'success', summary: 'Plan Creado', detail: "Plan creado con Exito!" });

  }
  editPlan(){
    if (this.id > 0) {
      const plan: Plans = { id:this.id, codigo: this.code, nombre: this.name, cuota: this.cuota, edadMaxima: this.edad, estado:this.estado};

      this.planServices.editPlan(this.id, plan).subscribe( res => {
      if (res ===null) {
        this.ref.close(plan);
        this.mess.add({ severity: 'success', summary: 'Plan Editado', detail: "Plan editado con Exito!" });
      }
      })
    }else{
      this.mess.add({ severity: 'error', summary: 'Plan Creado', detail: "Debe enviar la data a Editar" });
    }

  }
}
