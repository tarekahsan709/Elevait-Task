import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { IDocument, IDocumentResults } from '../models/document.model';

@Injectable()
export class DocumentService {
  constructor(private http: HttpClient) {
  }

  getDocuments(): Observable<IDocumentResults> {
    return this.http.get<IDocumentResults>(`/api/v1/documents`);
  }

  getDocumentById(id: string): Observable<IDocument> {
    return this.http.get<IDocument>(`/api/v1/documents/${id}`);
  }
}
