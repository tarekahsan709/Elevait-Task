import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  declarations: [DocumentListComponent],

  imports: [
    CommonModule,
    SharedModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule {
}
