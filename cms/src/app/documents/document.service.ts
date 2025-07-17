import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getMaxId(): number {
    let maxId = 0;

    this.documents.forEach(document => {
      const id = parseInt(document.id)

      if (id > maxId) {
        maxId = id;
      }
    });

    return maxId;
  }

  sortAndSend() {
    this.documents.sort((a, b) => a.name.localeCompare(b.name));
    this.documentListChangedEvent.next(this.documents.slice());
  }

  fetchDocuments() {
    this.http
      .get<{ documentList: Document[] }>('http://localhost:3000/documents')
      .subscribe(responseData => {
        this.documents = responseData.documentList;
        this.maxDocumentId = this.getMaxId();
        this.sortAndSend();
      },);
  }

  addDocument(newDocument: Document): void {
    if (!newDocument) { return };

    newDocument.id = '';
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string, newDocument: Document }>(
        'http://localhost:3000/documents', newDocument, { headers: headers }
      )
      .subscribe((responseData => {
        this.documents.push(responseData.newDocument);
        this.sortAndSend();
      }))
  }

  updateDocument(originalDocument: Document, newDocument: Document): void {
    if (!originalDocument || !newDocument) { return };

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);
    if (pos < 0) { return };

    newDocument.id = originalDocument.id;
    newDocument._id = originalDocument._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(
        'http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers }
      )
      .subscribe(() => {
        this.documents[pos] = newDocument;
        this.sortAndSend();
      });
  }

  deleteDocument(document: Document): void {
    if (!document) { return };

    const pos = this.documents.findIndex(d => d.id === document.id);
    if (pos < 0) { return };

    this.http
      .delete('http://localhost:3000/documents/' + document.id)
      .subscribe(() => {
        this.documents.splice(pos, 1);
        this.sortAndSend();
      });
  }
}
