import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: Document[] = [];
  private subscription: Subscription;

  constructor(private DocumentService: DocumentService) { }

  // ngOnInit(): void {
  //   this.documents = this.DocumentService.getDocuments();
  //   this.DocumentService.documentChangedEvent
  //     .subscribe(
  //       (documents: Document[]) => {
  //         this.documents = documents;
  //       }
  //     )
  // }

  ngOnInit(): void {
    this.documents = this.DocumentService.getDocuments();
    this.subscription = this.DocumentService.documentListChangedEvent
      .subscribe(
        (documentsList: Document[]) => {
          this.documents = documentsList;
        }
      )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
