import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) {}

  fcEmail = new FormControl();
  fcPassword = new FormControl();

  ngOnInit(): void {}

  login() {
    if (
      this.fcEmail.value == 'daniel@gmail.com' &&
      this.fcPassword.value == '12345678'
    ) {
      this.router.navigate(['home']);
    } else {
      alert('Incorrect credentials');
      console.log('Nagkakamali ka ng susi');
    }
  }

  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
