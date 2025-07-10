import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { AdminSidebarComponent } from '../../shared/components/admin-sidebar/admin-sidebar.component';
import { UserSidebarComponent } from '../../shared/components/user-sidebar/user-sidebar.component';

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, UserSidebarComponent,HeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.css',
})
export class UserLayoutComponent {}
