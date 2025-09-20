import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PopupService } from '../../services/popup.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReportService } from '../../services/report.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.html',
  styleUrls: ['./report.css']
})

export class ReportComponent {

  isOverlayVisible = true;
  additionalDetails: string = '';




  constructor(
    private dialogRef: MatDialogRef<ReportComponent>,
    private reportService: ReportService,
    private popupService: PopupService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { userId: number }
  ) { }


  onSubmit(): void {
    if (confirm('Are you sure you want to report user?')) {
      if (!this.additionalDetails.trim()) {
        return;
      }
      const formData = new FormData();
      formData.append("reason", this.additionalDetails);
      this.reportService.addReport(this.data.userId, formData).subscribe({
        next: () => {
          console.log("Reported");
          this.closePopup();
        },
        error: (err) => {
          console.error('Error:', err);
          if (err.status === 401) {
            this.authService.logout()
          }
        }
      })
    }
  }

  private resetForm(): void {
    this.additionalDetails = '';
  }



  closePopup() {
    if (this.dialogRef) {
      this.resetForm()
      this.isOverlayVisible = false;
      this.popupService.closeAllPopups();
    }
  }
}