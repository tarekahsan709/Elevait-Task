import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
  declarations: [DocumentListComponent],
  imports: [
    CommonModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule {
}
