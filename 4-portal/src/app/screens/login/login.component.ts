import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

   login(email: string, password: string) {
    if(email == "daniel@gmail.com" && password == "12345678"){
      this.router.navigate(["home"]);
    }
    else{
      alert("Incorrect credentials");
      console.log("Nagkakamali ka ng susi");
    }
  }
}
