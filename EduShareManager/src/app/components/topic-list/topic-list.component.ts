import { Component, OnInit } from '@angular/core';
import { Topic } from '../../modals/topic';
import { TopicService } from '../../services/topic.service';
import { FileService } from '../../services/file.service';
import { MatDialog } from '@angular/material/dialog';
import { TopicEditDialogComponent } from '../topic-edit-dialog/topic-edit-dialog.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topic-list',
  imports: [MatToolbarModule,CommonModule,MatInputModule,MatProgressSpinnerModule,MatSnackBarModule,MatFormFieldModule,FormsModule,MatTooltipModule ,MatChipsModule,MatTableModule, MatButtonModule, MatDialogModule, MatIconModule, MatCardModule],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.css'
})
export class TopicListComponent implements OnInit {
  topics: Topic[] = [];
  filteredTopics: Topic[] = [];
  filesCount: { [topicId: number]: number } = {};
  loading = false;
  searchTerm = '';
  
  // Stats
  totalTopics = 0;
  totalFiles = 0;
  averageFilesPerTopic = 0;

  constructor(
    private topicService: TopicService,
    private fileService: FileService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTopics();
  }

  loadTopics() {
    this.loading = true;
    this.topicService.getTopics().subscribe({
      next: (topics) => {
        this.topics = topics;
        this.filteredTopics = topics;
        this.loadFilesCounts();
        this.updateStats();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.showSnackBar('Error loading topics', 'error');
        this.loading = false;
      }
    });
  }

  loadFilesCounts() {
    this.fileService.getAllFiles().subscribe({
      next: (files) => {
        // Count files per topic
        this.filesCount = {};
        files.forEach(file => {
          if (file.topicId) {
            this.filesCount[file.topicId] = (this.filesCount[file.topicId] || 0) + 1;
          }
        });
        this.totalFiles = files.length;

        //לבדוק אם צריך לקרא פעמיים לפונקציה הזו
        this.updateStats();
        debugger
        console.log('Files count loaded:', files);
      },
      error: (error) => {
        console.error('Error loading files count:', error);
      }
    });
  }

  updateStats() {
    this.totalTopics = this.topics.length;
    this.averageFilesPerTopic = this.totalTopics > 0 ? 
      Math.round(this.totalFiles / this.totalTopics * 10) / 10 : 0;
  }

  applySearch() {
    if (!this.searchTerm.trim()) {
      this.filteredTopics = this.topics;
    } else {
      this.filteredTopics = this.topics.filter(topic =>
        topic.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        topic.description?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredTopics = this.topics;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(TopicEditDialogComponent, {
      data: { isUpdate: false },
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTopics();
        this.showSnackBar('Topic added successfully!', 'success');
      }
    });
  }

  openEditDialog(topic: Topic) {
    const dialogRef = this.dialog.open(TopicEditDialogComponent, {
      data: { isUpdate: true, topic },
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTopics();
        this.showSnackBar('Topic updated successfully!', 'success');
      }
    });
  }

  deleteTopic(topic: Topic) {
    const fileCount = this.filesCount[topic.id] || 0;
    
    if (fileCount > 0) {
      this.showSnackBar(`Cannot delete topic with ${fileCount} files. Move files first.`, 'warning');
      return;
    }

    if (confirm(`Are you sure you want to delete "${topic.name}"?`)) {
      this.topicService.deleteTopic(topic.id).subscribe({
        next: () => {
          this.loadTopics();
          this.showSnackBar('Topic deleted successfully!', 'success');
        },
        error: (error) => {
          console.error('Error deleting topic:', error);
          this.showSnackBar('Error deleting topic', 'error');
        }
      });
    }
  }

  getTopicColor(index: number): string {
    const colors = [
      '#e8f5e8', '#e3f2fd', '#fff3e0', '#fce4ec',
      '#f3e5f5', '#e0f2f1', '#fff8e1', '#ffebee'
    ];
    return colors[index % colors.length];
  }

  getTopicIcon(topicName: string): string {
    const name = topicName.toLowerCase();
    if (name.includes('math') || name.includes('mathematics')) return 'calculate';
    if (name.includes('science') || name.includes('physics') || name.includes('chemistry')) return 'science';
    if (name.includes('english') || name.includes('language')) return 'language';
    if (name.includes('history') || name.includes('social')) return 'history_edu';
    if (name.includes('art') || name.includes('creative')) return 'palette';
    if (name.includes('music')) return 'music_note';
    if (name.includes('physical') || name.includes('sport')) return 'sports';
    if (name.includes('technology') || name.includes('computer')) return 'computer';
    return 'topic';
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`]
    });
  }
}
