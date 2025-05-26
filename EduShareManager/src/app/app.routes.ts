// import { Routes } from '@angular/router';
import { Routes } from '@angular/router';
// import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TopicListComponent } from './components/topic-list/topic-list.component';
import { UsersComponent } from './components/users/users.component';

export const routes: Routes = [

    // { path: '', redirectTo: 'users', pathMatch: 'full' },
{ path: '', component: DashboardComponent },
  { path: 'users', component: UsersComponent },
  { path: 'topics', component: TopicListComponent },
];
