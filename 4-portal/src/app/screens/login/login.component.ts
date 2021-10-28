import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { AuthService } from 'src/app/shared/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  error = '';
  async login() {
    this.error = '';
    var result: any = await this.auth.login(
      this.fcEmail.value,
      this.fcPassword.value
    );
    console.log(result);
    if (this.auth.authenticated) {
      this.nav('home');
    } else {
      this.error = result.data;
    }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
