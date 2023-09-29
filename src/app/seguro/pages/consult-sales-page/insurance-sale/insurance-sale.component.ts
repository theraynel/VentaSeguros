import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ClientService } from 'src/app/seguro/services/client.service';
import { segurosCommon } from 'src/app/shared/common/common';
import { Clients } from 'src/app/seguro/interfaces/clients';
import { PlansService } from 'src/app/seguro/services/plans.service';
import { Plans } from 'src/app/seguro/interfaces/plans';
import { AccountTypeService } from 'src/app/seguro/services/account-type.service';
import { AccountTypes } from 'src/app/seguro/interfaces/accountTypes';
import { InsuranceTypeService } from 'src/app/seguro/services/insurance-type.service';
import { InsuranceTypes } from 'src/app/seguro/interfaces/insuranceTypes';

@Component({
  selector: 'app-insurance-sale',
  templateUrl: './insurance-sale.component.html',
  styles: [
  ]
})
export class InsuranceSaleComponent {

  public clienteId: number = 0;
  public planId: number = 0;
  public accountTypeId: number = 0;
  public InsranceTypeId: number = 0;
  public id: number = 0;
  public fechaVenta: Date;
  public noProducto: string = '';
  public noSeguro: string = '';

  public common = new segurosCommon();

  public clients: Clients[] = [];
  public plans: Plans[] = [];
  public account: AccountTypes[] = [];
  public type: InsuranceTypes[] = [];


  SalesForm = this.fb.group({
    clientSale: ['', Validators.required],
    planSale: ['', Validators.required],
    acountSale: ['', Validators.required],
    insuranceSale: ['', Validators.required],
    fechaVentaSale: ['', Validators.required],
    noProductoSale: ['', Validators.required],
    noSeguroSale: ['', Validators.required]
  });

  constructor(
    private clientService: ClientService,
    private planServices: PlansService,
    private accountServices: AccountTypeService,
    private typeServices: InsuranceTypeService,
    public ref: DynamicDialogRef,
    private mess: MessageService,
    private config: DynamicDialogConfig,
    private fb: FormBuilder
  ) {
    this.clienteId = this.config.data.clienteId;
    this.planId = this.config.data.planId;
    this.accountTypeId = this.config.data.accountTypeId;
    this.InsranceTypeId = this.config.data.InsranceTypeId;
    this.noProducto = this.config.data.noProducto;
    this.noSeguro = this.config.data.noSeguro;
    this.id = this.config.data.id;
    this.fechaVenta = new Date(this.config.data.fechaVenta);
  }

  ngOnInit() {
    this.getClients();
    this.getPlan();
    this.getAccountType();
    this.getType();
    this.fechaVenta = new Date(this.config.data.fechaVenta);

  }

  getClients() {
     this.clientService.getClients().subscribe((res: any) => {
      this.clients = this.getCbListClient(res);
    });
  }

  getPlan() {
     this.planServices.getPlans().subscribe( (res: any) =>{
        this.plans = res
     });
  }

  getAccountType(){
      this.accountServices.getAccountType().subscribe( (res: any) => {
         this.account = res
      })
  }

  getType(){
     this.typeServices.getInsurenceType().subscribe((res: any) => {
       this.type = res
     })
  }

  getCbListClient(clients: Clients[]) {
    return clients.map((t) => {
      return {
        id: t.id,
        nombre: t.nombre,
        cedula: t.cedula,
        apellido: t.apellido,
        sexo: t.sexo,
        fechaNacimiento: t.fechaNacimiento,
        nombreCompleto: `${t.nombre} ${t.apellido}`
      };
    });
  }
  editClient(){}
  addClient(){}
  close(){}

}
