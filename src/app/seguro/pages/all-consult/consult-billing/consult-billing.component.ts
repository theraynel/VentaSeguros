import { Component } from '@angular/core';
import { Billing } from 'src/app/seguro/interfaces/billings';
import { segurosCommon } from 'src/app/shared/common/common';

@Component({
  selector: 'app-consult-billing',
  templateUrl: './consult-billing.component.html',
  styles: [
  ]
})
export class ConsultBillingComponent {

  public billinglts: Billing[] = [];

  public common = new segurosCommon();

}
