import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../services/plans.service';
import { Plans } from '../../interfaces/plans';

import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogPlanComponent } from './dialog-plan/dialog-plan.component';

@Component({
  selector: 'app-plans-page',
  templateUrl: './plans-page.component.html',
  providers: [DialogService],
  styles: [
  ]
})
export class PlansPageComponent implements OnInit {

  ref: DynamicDialogRef | undefined;

  constructor(
    private planServices: PlansService,
    public dialogService: DialogService
    ){}

  public planslts : Plans[] = [];

  ngOnInit(): void {
     this.getPlan();
  }

  getPlan(){
    this.planServices.getPlans().subscribe((response: any) => {
        console.log(response);

        this.planslts = response;
    });
  };

  show() {
    this.ref = this.dialogService.open(DialogPlanComponent, {
        data: {
            id: '51gF3'
        },
        header: 'Crear Plan'
    });
}
}
