import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageCreateComponent } from './page-create/page-create.component';


const routes: Routes = [
  { path: 'create', component: PageCreateComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule {
}
