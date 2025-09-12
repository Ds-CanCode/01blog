import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PopupService } from '../../services/popup.service';
import { Router } from '@angular/router';

interface MediaFile {
  file: File;
  url: string;
  type: string;
  name: string;
  size: string;
}

@Component({
  selector: 'app-papier',
  standalone: true,
  imports: [
    // CommonModule,
    // MatDialogModule,
    // MatButtonModule,
    // MatIconModule,
    // MatToolbarModule
  ],
  templateUrl: './papier.component.html',
  styleUrls: ['./papier.component.css']
})
export class PapierComponent {
  
}