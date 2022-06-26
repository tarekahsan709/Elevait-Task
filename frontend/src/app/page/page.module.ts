import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { PageRoutingModule } from './page-routing.module';

import { PageCreateComponent } from './page-create/page-create.component';

@NgModule({
  declarations: [PageCreateComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PageRoutingModule
  ]
})
export class PageModule {
}
