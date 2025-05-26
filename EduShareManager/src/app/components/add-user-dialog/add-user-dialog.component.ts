import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-add-user-dialog',
  imports: [CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {
 fullName = '';
  email = '';
  password = '';
  role = '';
  hidePassword = true;
  
  constructor(private dialogRef: MatDialogRef<AddUserDialogComponent>) {}
  
  add() {
    if (this.fullName && this.email && this.password && this.role) {
      this.dialogRef.close({ 
        fullName: this.fullName, 
        email: this.email, 
        password: this.password,
        role: this.role 
      });
    }
  }
  
  cancel() {
    this.dialogRef.close();
  }

}
