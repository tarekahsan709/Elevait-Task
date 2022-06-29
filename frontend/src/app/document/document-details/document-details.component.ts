import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IDocument } from '../../shared/models/document.model';
import { DocumentService } from '../../shared/services/document.service';
import { IPage } from '../../shared/models/page.model';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss']
})
export class DocumentDetailsComponent implements OnInit {
  document: IDocument;
  selectedPage: IPage;

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
      },
      complete: () => {
        console.log('Document details has loaded');
      },
      error: () => {
        console.error('Document details loading failed');
      }
    });
  }

  hasSelected(page: IPage): boolean {
    return this.selectedPage && page._id === this.selectedPage._id;
  }

  onPage(page: IPage) {
    this.selectedPage = page;
  }

}
