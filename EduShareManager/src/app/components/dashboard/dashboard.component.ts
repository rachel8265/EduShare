import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TopicService } from '../../services/topic.service';
import { FileService } from '../../services/file.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatDialogModule,MatIconModule,
    MatCardModule, MatToolbarModule,NgxChartsModule,MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
// usersCount = 0;
//   topicsCount = 0;
//   filesCount = 0;
//   filesByTopic: any[] = [];
//   colorScheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };

//   constructor(
//     private userService: UserService,
//     private topicService: TopicService,
//     private fileService: FileService
//   ) {}

//   ngOnInit(): void {
//     this.userService.getUsers().subscribe(users => this.usersCount = users.length);
//     this.topicService.getTopics().subscribe(topics => {
//       this.topicsCount = topics.length;
//       // דוגמה: בניית נתוני גרף קבצים לפי נושא
//       this.fileService.getAllFiles().subscribe(files => {
//         this.filesByTopic = topics.map(topic => ({
//           name: topic.name,
//           value: files.filter(f => f.topicId === topic.id).length
//         }));
//         this.filesCount = files.length;
//       });
//     });
//   }
 // Stats
  usersCount = 0;
  topicsCount = 0;
  filesCount = 0;
  activeUsersCount = 0;
  
  // Loading states
  loading = true;
  
  // Chart data
  filesByTopic: any[] = [];
  userRegistrations: any[] = [];
  fileUploadsOverTime: any[] = [];
  
  // Chart options
  colorScheme = {
    domain: ['#81c784', '#64b5f6', '#ffb74d', '#f8bbd9', '#aed581', '#90caf9']
  };
  
  // View dimensions for responsive charts
  view: [number, number] = [700, 400];

  constructor(
    private userService: UserService,
    private topicService: TopicService,
    private fileService: FileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading = true;
    
    // Load users data
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.usersCount = users.length;
        this.activeUsersCount = users.filter(u => u.createdAt).length;
        this.generateUserRegistrationData(users);
      },
      error: (error) => console.error('Error loading users:', error)
    });

    // Load topics and files data
    this.topicService.getTopics().subscribe({
      next: (topics) => {
        this.topicsCount = topics.length;
        
        this.fileService.getAllFiles().subscribe({
          next: (files) => {
            this.filesCount = files.length;
            this.generateFilesByTopicData(topics, files);
            this.generateFileUploadsData(files);
            this.loading = false;
          },
          error: (error) => {
            console.error('Error loading files:', error);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        console.error('Error loading topics:', error);
        this.loading = false;
      }
    });
  }

  generateFilesByTopicData(topics: any[], files: any[]): void {
    this.filesByTopic = topics.map(topic => ({
      name: topic.name,
      value: files.filter(f => f.topicId === topic.id).length
    })).filter(item => item.value > 0);
  }

  // generateUserRegistrationData(users: any[]): void {
  //   // Simulate monthly registration data
  //   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  //   this.userRegistrations = months.map((month, index) => ({
  //     name: month,
  //     value: Math.floor(Math.random() * 20) + 5
  //   }));
  // }
generateUserRegistrationData(users: any[]): void {
  const registrationsByMonth: { [month: string]: number } = {};

  users.forEach(user => {
    if (user.createdAt) {
      const date = new Date(user.createdAt);
      const month = date.toLocaleString('default', { month: 'short' }); // eg: 'Jan'
      registrationsByMonth[month] = (registrationsByMonth[month] || 0) + 1;
    }
  });

  this.userRegistrations = Object.keys(registrationsByMonth).map(month => ({
    name: month,
    value: registrationsByMonth[month]
  }));
}
  // generateFileUploadsData(files: any[]): void {
  //   // Simulate weekly upload data
  //   const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  //   this.fileUploadsOverTime = weeks.map((week, index) => ({
  //     name: week,
  //     value: Math.floor(Math.random() * 50) + 10
  //   }));
  // }
  generateFileUploadsData(files: any[]): void {
  const uploadsByMonth: { [month: string]: number } = {};

  files.forEach(file => {
    if (file.uploadDate || file.createdAt) {
      const date = new Date(file.uploadDate || file.createdAt);
      const month = date.toLocaleString('default', { month: 'short' }); // eg: 'Mar'
      uploadsByMonth[month] = (uploadsByMonth[month] || 0) + 1;
    }
  });

  this.fileUploadsOverTime = Object.keys(uploadsByMonth).map(month => ({
    name: month,
    value: uploadsByMonth[month]
  }));
}


  navigateToUsers(): void {
    this.router.navigate(['/users']);
  }

  navigateToTopics(): void {
    this.router.navigate(['/topics']);
  }

  navigateToFiles(): void {
    this.router.navigate(['/files']);
  }

  refreshData(): void {
    this.loadDashboardData();
  }

}
