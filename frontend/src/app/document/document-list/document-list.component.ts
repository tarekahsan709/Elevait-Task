import { Component, OnInit } from '@angular/core';

import { DocumentService } from '../../shared/services/document.service';
import { IDocument, IDocumentResults } from '../../shared/models/document.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  documents: IDocument[] = [];

  constructor(private service: DocumentService) {
  }

  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.service.getDocuments().subscribe({
      next: (data: IDocumentResults) => {
        this.documents = data.docs;
        console.log('Documents', this.documents);
      },
      complete: () => {
        console.log('Documents has loaded');
      },
      error: () => {
        console.error('Documents loading failed');
      }
    });
  }
}
