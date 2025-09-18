// report.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { MatDialogRef } from '@angular/material/dialog';

interface ReportedUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface ReportReason {
  value: string;
  label: string;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})

export class ReportComponent {
  isOverlayVisible = true;
  reportedUser: ReportedUser | null = null;
  

  selectedReason: string = '';
  additionalDetails: string = '';
  isSubmitting = false;
  showConfirmation = false;

  reportReasons: ReportReason[] = [
    { value: 'spam', label: 'Spam or unwanted commercial content' },
    { value: 'misinformation', label: 'False information or misinformation' },
    { value: 'copyright', label: 'Copyright or intellectual property violation' },
    { value: 'impersonation', label: 'Impersonation or fake account' },
    { value: 'other', label: 'Other violation (please specify in details)' }
  ];

  
 
  constructor(
    private dialogRef: MatDialogRef<ReportComponent>,
  ) {}


  onSubmit(): void {
  }

 
  private resetForm(): void {
    this.selectedReason = '';
    this.additionalDetails = '';
    this.isSubmitting = false;
    this.showConfirmation = false;
  }



  getReasonLabel(value: string): string {
    const reason = this.reportReasons.find(r => r.value === value);
    return reason ? reason.label : value;
  }

  closePopup() {
    if (this.dialogRef) {
      this.resetForm()
      this.isOverlayVisible = false;
      this.dialogRef.close();
    }
  }
}