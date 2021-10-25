import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private api: HttpClient) {}

  ngOnInit(): void {}

  fcEmail = new FormControl();
  fcPassword = new FormControl();
  requestResult = '';
  async login() {
    var result: any = await this.api
      .post(environment.API_URL + '/user/login', {
        email: this.fcEmail.value,
        password: this.fcPassword.value,
      })
      .toPromise();
    if(result.success){
      this.nav('home');
    }
    // if (
    //   this.fcEmail.value == 'daniel@gmail.com' &&
    //   this.fcPassword.value == '12345678'
    // ) {
    //   this.nav('home');
    // } else {
    //   alert('Incorrect credentials');
    //   console.log('Nagkakamali ka ng susi');
    // }
  }
  nav(destination: string) {
    this.router.navigate([destination]);
  }
}
