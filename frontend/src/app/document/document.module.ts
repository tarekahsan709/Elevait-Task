import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { DocumentRoutingModule } from './document-routing.module';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentCreateComponent } from './document-create/document-create.component';
import { DocumentDetailsComponent } from './document-details/document-details.component';

@NgModule({
  declarations: [DocumentListComponent, DocumentDetailsComponent, DocumentCreateComponent],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule {
}
