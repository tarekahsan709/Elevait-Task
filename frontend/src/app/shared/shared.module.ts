import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { CartCounterComponent } from './cart-counter/cart-counter.component';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, NgSelectModule],
  exports: [
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CartCounterComponent,
  ],
  declarations: [CartCounterComponent],
  providers: [UserService, ProductService],
})
export class SharedModule {}
