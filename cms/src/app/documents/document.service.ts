import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from './document.model';
// import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

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
    // this.documents = MOCKDOCUMENTS;
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

  fetchDocuments() {
    this.http
      .get<Document[]>('https://cms-application-db-default-rtdb.firebaseio.com/documents.json')
      .subscribe((documents: Document[]) => {
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort((a, b) => a.name.localeCompare(b.name));
        this.documentListChangedEvent.next(this.documents.slice());
      },);
  }

  storeDocuments() {
    const documents = JSON.parse(JSON.stringify(this.getDocuments()));
    this.http.put('https://cms-application-db-default-rtdb.firebaseio.com/documents.json', documents)
      .subscribe((response) => {
        console.log(response);
        this.documentListChangedEvent.next(this.documents.slice());
      })
  }

  addDocument(newDocument: Document): void {
    if (!newDocument || null) return;

    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(
    originalDocument: Document,
    newDocument: Document
  ): void {
    if (!originalDocument || !newDocument || null) return;

    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  deleteDocument(document: Document): void {
    if (!document || null) return;

    const pos = this.documents.indexOf(document);
    if (pos < 0) return;

    this.documents.splice(pos, 1);
    this.storeDocuments();
  }
}
