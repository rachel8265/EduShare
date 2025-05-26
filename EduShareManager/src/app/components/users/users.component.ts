import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from '../add-user-dialog/add-user-dialog.component';
import { UserService } from '../../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../modals/user';

@Component({
  selector: 'app-users',
  imports: [
    MatToolbarModule, CommonModule, MatInputModule, MatProgressSpinnerModule,
    MatSnackBarModule, MatFormFieldModule, FormsModule, MatTooltipModule,
    MatChipsModule, MatTableModule, MatButtonModule, MatDialogModule,
    MatIconModule, MatCardModule, MatSelectModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
 users: User[] = [];
  filteredUsers: User[] = [];
  loading = false;
  searchTerm = '';
  filterRole = 'All';
  filterStatus = 'All';
  
  // Stats
  totalUsers = 0;
  activeUsers = 0;
  adminUsers = 0;
  editorUsers = 0;

  roles = ['All', 'Admin', 'Editor', 'Viewer'];
  statuses = ['All', 'Active', 'Inactive'];

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users: User[]) => {
        // הוסף ערכי ברירת מחדל לשדות חסרים
        this.users = users.map(user => ({
          ...user,
          status: 'Active',
          lastLoginAt:  user.createdAt,
          fullName:  `${user.fullName || 'no name'}`.trim() || user.email
        }));
        this.filteredUsers = this.users;
        this.updateStats();
        this.loading = false;
        console.log('Users loaded:', this.users);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.showSnackBar('Error loading users', 'error');
        this.loading = false;
      }
    });
  }

  updateStats() {
    this.totalUsers = this.users.length;
    this.activeUsers = this.users.filter(u => u.isDeleted === true).length;
    this.adminUsers = this.users.filter(u => u.role === 'Admin').length;
    this.editorUsers = this.users.filter(u => u.role === 'Editor').length;
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = !this.searchTerm.trim() ||
        user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      const matchesRole = this.filterRole === 'All' || user.role === this.filterRole;
    //   const matchesStatus = this.filterStatus === 'All' || user.status === this.filterStatus;
      
      return matchesSearch && matchesRole
    //    && matchesStatus;
    });
  }

  clearSearch() {
    this.searchTerm = '';
    this.filterRole = 'All';
    this.filterStatus = 'All';
    this.filteredUsers = this.users;
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: { isUpdate: false },
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newUser:Partial< User> = {
          email: result.email,
          fullName: result.fullName,
          password: result.password,
          role: result.role,
        };
        this.userService.addUser(newUser).subscribe({
          next: () => {
            this.loadUsers();
            this.showSnackBar('User added successfully!', 'success');
          },
          error: (error) => {
            console.error('Error adding user:', error);
            this.showSnackBar('Error adding user', 'error');
          }
        });
      }
    });
  }

  openEditDialog(user: User) {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      data: { isUpdate: true, user },
      width: '500px'
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers();
        this.showSnackBar('User updated successfully!', 'success');
      }
    });
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete "${user.fullName}"?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
          this.showSnackBar('User deleted successfully!', 'success');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.showSnackBar('Error deleting user', 'error');
        }
      });
    }
  }

  getUserColor(index: number): string {
    const colors = [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];
    return colors[index % colors.length];
  }

  getUserIcon(role: string): string {
    switch (role?.toLowerCase()) {
      case 'admin': return 'admin_panel_settings';
      case 'editor': return 'edit';
      case 'viewer': return 'visibility';
      default: return 'person';
    }
  }

  getStatusChipColor(isDeleted: boolean): 'primary' | 'accent' | 'warn' {
    return isDeleted ? 'warn' : 'primary';
  }

  getRoleChipColor(role: string): 'primary' | 'accent' | 'warn' {
    switch (role) {
      case 'Admin': return 'warn';
      case 'Editor': return 'accent';
      case 'Viewer': return 'primary';
      default: return 'primary';
    }
  }

  private showSnackBar(message: string, type: 'success' | 'error' | 'warning') {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: [`snackbar-${type}`]
    });
  }
}