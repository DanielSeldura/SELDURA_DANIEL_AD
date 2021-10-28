import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, public auth: AuthService) {}

  ngOnInit(): void {
    if (!this.auth.authenticated) this.nav('login');
  }

  logout() {
    this.auth.logout();
    this.nav('login');
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
