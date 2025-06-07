import { Component, Inject, OnInit } from '@angular/core';
import { TopicService } from '../../services/topic.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Topic } from '../../modals/topic'; 
export interface TopicData {
  isUpdate: boolean;
  topic?: Topic;
  };
@Component({
  selector: 'app-topic-edit-dialog',
  imports: [ CommonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
    
    ],
  templateUrl: './topic-edit-dialog.component.html',
  styleUrl: './topic-edit-dialog.component.css'
})
export class TopicEditDialogComponent{
  name = '';
  description = '';
  isUpdate = false;
  isLoading = false;

  constructor(
    private topicService: TopicService,
    private dialogRef: MatDialogRef<TopicEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TopicData
  ) {
    if (data?.isUpdate && data?.topic) {
      this.name = data.topic.name;
      this.description = data.topic.description || '';
      this.isUpdate = true;
    }
  }

  save() {
    if (!this.name.trim()) {
      return;
    }

    this.isLoading = true;
    
    const topicData = {
      name: this.name.trim(),
      description: this.description.trim()
    };

    if (this.isUpdate && this.data.topic) {
      this.topicService.updateTopic(this.data.topic.id, topicData).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error updating topic:', error);
          // Handle error - maybe show a snackbar or error message
        }
      });
    } else {
      this.topicService.addTopic(topicData).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error adding topic:', error);
          // Handle error - maybe show a snackbar or error message
        }
      });
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
