import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/document', pathMatch: 'full' },
  {
    path: 'document',
    loadChildren: () =>
      import('./document/document.module').then((module) => module.DocumentModule)
  },
  {
    path: 'page',
    loadChildren: () =>
      import('./page/page.module').then((module) => module.PageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
