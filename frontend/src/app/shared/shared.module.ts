import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DocumentService } from './services/document.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [
    HttpClientModule
  ],
  providers: [DocumentService]
})
export class SharedModule {
}
