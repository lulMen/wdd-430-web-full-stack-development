import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      "1",
      "CIT 366 - Full Web Stack Development",
      " Learn how to develop modern web applications using the MEAN stack.",
      " https://contentbyui.edu/",
      null
    ),
    new Document(
      "2",
      "CIT 260 - Object Oriented Programming",
      " Understand the principles of object-oriented programming and apply them using Java.",
      " https://contentbyui.edu/",
      null
    ),
    new Document(
      "3",
      "CIT 425 - Data Warehousing",
      " Explore the design and implementation of data warehouses for business intelligence and analytics.",
      " https://contentbyui.edu/",
      null
    ),
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
