import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-clients-page',
  templateUrl: './clients-page.component.html',
  providers: [MessageService, ConfirmationService],
  styles: [
  ]
})
export class ClientsPageComponent implements OnInit{
      productDialog: boolean = false;

      products!: Product[];

      product!: Product;

      selectedProducts!: Product[] | null;

      submitted: boolean = false;

      statuses!: any[];

      constructor( private messageService: MessageService, private confirmationService: ConfirmationService) {}

      ngOnInit() {
          this.products = [{
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'bamboo-watch.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5
        },
        {
          id: '1001',
          code: 'nvklal433',
          name: 'Black Watch',
          description: 'Product Description',
          image: 'black-watch.jpg',
          price: 72,
          category: 'Accessories',
          quantity: 61,
          inventoryStatus: 'OUTOFSTOCK',
          rating: 4
      },
      {
          id: '1002',
          code: 'zz21cz3c1',
          name: 'Blue Band',
          description: 'Product Description',
          image: 'blue-band.jpg',
          price: 79,
          category: 'Fitness',
          quantity: 2,
          inventoryStatus: 'LOWSTOCK',
          rating: 3
      },
      {
          id: '1003',
          code: '244wgerg2',
          name: 'Blue T-Shirt',
          description: 'Product Description',
          image: 'blue-t-shirt.jpg',
          price: 29,
          category: 'Clothing',
          quantity: 25,
          inventoryStatus: 'INSTOCK',
          rating: 5
      },
      {
          id: '1004',
          code: 'h456wer53',
          name: 'Bracelet',
          description: 'Product Description',
          image: 'bracelet.jpg',
          price: 15,
          category: 'Accessories',
          quantity: 73,
          inventoryStatus: 'INSTOCK',
          rating: 4
      }];

          this.statuses = [
              { label: 'INSTOCK', value: 'instock' },
              { label: 'LOWSTOCK', value: 'lowstock' },
              { label: 'OUTOFSTOCK', value: 'outofstock' }
          ];
      }

      openNew() {
          this.product = {};
          this.submitted = false;
          this.productDialog = true;
      }

      deleteSelectedProducts() {
          this.confirmationService.confirm({
              message: 'Are you sure you want to delete the selected products?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                  this.selectedProducts = null;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
              }
          });
      }

      editProduct(product: Product) {
          this.product = { ...product };
          this.productDialog = true;
      }

      deleteProduct(product: Product) {
          this.confirmationService.confirm({
              message: 'Are you sure you want to delete ' + product.name + '?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.products = this.products.filter((val) => val.id !== product.id);
                  this.product = {};
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
              }
          });
      }

      hideDialog() {
          this.productDialog = false;
          this.submitted = false;
      }

      saveProduct() {
          this.submitted = true;

          if (this.product.name?.trim()) {
              if (this.product.id) {
                  this.products[this.findIndexById(this.product.id)] = this.product;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
              } else {
                  this.product.id = this.createId();
                  this.product.image = 'product-placeholder.svg';
                  this.products.push(this.product);
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
              }

              this.products = [...this.products];
              this.productDialog = false;
              this.product = {};
          }
      }

      findIndexById(id: string): number {
          let index = -1;
          for (let i = 0; i < this.products.length; i++) {
              if (this.products[i].id === id) {
                  index = i;
                  break;
              }
          }

          return index;
      }

      createId(): string {
          let id = '';
          var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          for (var i = 0; i < 5; i++) {
              id += chars.charAt(Math.floor(Math.random() * chars.length));
          }
          return id;
      }
      getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default: return 'danger';
        }
    }
}
