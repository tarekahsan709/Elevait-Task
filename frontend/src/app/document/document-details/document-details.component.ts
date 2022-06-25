import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocument } from '../../shared/models/document.model';
import { DocumentService } from '../../shared/services/document.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  document: IDocument;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private service: DocumentService
  ) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getDocumentDetails(id);
  }

  getDocumentDetails(id: string): void {
    this.service.getDocumentById(id).subscribe({
      next: (data: IDocument) => {
        this.document = data;
        console.log('Document', this.document);
      },
      complete: () => {
        console.log('Document details has loaded');
      },
      error: () => {
        console.error('Document details loading failed');
      }
    });
  }

}
