import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IDocument, IDocumentResults } from '../models/document.model';
import { IPage, IPageCreate } from '../models/page.model';

@Injectable()
export class DocumentService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  getDocuments(): Observable<IDocumentResults> {
    return this.http.get<IDocumentResults>(`${this.baseUrl}/documents`);
  }

  getDocumentById(id: string): Observable<IDocument> {
    return this.http.get<IDocument>(`${this.baseUrl}/documents/${id}`);
  }

  create(body: IDocument): Observable<IDocument> {
    return this.http.post<IDocument>(`${this.baseUrl}/documents`, body);
  }

  createPage(body: IPageCreate): Observable<IPage> {
    return this.http.post<IPage>(`${this.baseUrl}/pages`, body);
  }
}
