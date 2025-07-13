import { Component, Optional, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-papier',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  standalone: true,
  templateUrl: './papier.component.html',
  styleUrl: './papier.component.css'
})
export class PapierComponent {
  title = 'Hello'
  content = 'hi'
  showToolbar = false;
  toolbarPosition = { x: 0, y: 0 };
  publish(){}
  close(){}
  formatText(s: String){}
  createLink(){}
  insertQuote(){}
  insertCode(){}
  insertImage(){}
  insertList(){}
  handleTextSelection(){}
  onContentChange(event: any){}
}
