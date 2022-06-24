import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentCreateComponent } from './document-create/document-create.component';

const routes: Routes = [
  { path: '', component: DocumentListComponent },
  { path: 'create', component: DocumentCreateComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentRoutingModule {}
