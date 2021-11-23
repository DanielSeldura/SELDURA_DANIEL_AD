import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { CRUDReturn } from '../model/crud_return.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: User | null;
  public userObs?: Subscription;
  constructor(
    private api: ApiService,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    console.log('I am instance' + `${Date.now()}`);
    this.userObs = this.afAuth.user.subscribe((data) => {
      console.log('data');
      console.log(data);
      if (data == undefined || data == null) return;
      if (!this.authenticated) {
        this.api.get(`/user/${data?.uid}`).then((result) => {
          var output: CRUDReturn = {
            success: result.success,
            data: result.data,
          };
          if (output.success === true) {
            console.log('Subscription');
            this.user = User.fromJson(output.data.id, output.data);
            console.log('Successful Login');
            this.user?.log();
            this.router.navigate(['home']);
          }
        });
      }
    });
  }

  get authenticated(): boolean {
    return this.user != undefined && this.user != null;
  }

  async login(email: string, password: string): Promise<CRUDReturn> {
    try {
      //log in to firebase auth
      var resultOfLogin: any;
      try {
        resultOfLogin = await this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
      } catch (error) {
        throw error;
      }
      //get the data from the db regarding the user
      var result: any = await this.api.get(`/user/${resultOfLogin.user?.uid}`);
      var output: CRUDReturn = { success: result.success, data: result.data };
      if (output.success === true) {
        this.user = User.fromJson(output.data.id, output.data);
      }
      return output;
    } catch (error) {
      console.log('Login Error');
      if (error instanceof Error)
        return { success: false, data: error.message };
      else return { success: false, data: 'unknown login error' };
    }
  }

  async register(payload: {
    name: string;
    age: number;
    email: string;
    password: string;
  }): Promise<CRUDReturn> {
    //send the registration request to the Api
    var result: any = await this.api.post('/user/register', payload);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = User.fromJson(output.data.id, output.data);
      var resultOfLogin: any;
      //sign in the frontend if registration is successful;
      try {
        resultOfLogin = await this.afAuth.signInWithEmailAndPassword(
          payload.email,
          payload.password
        );
      } catch (error) {
        console.log(error);
        console.log('Register Error');
        if (error instanceof Error)
          return { success: false, data: error.message };
        else return { success: false, data: 'unknown register error' };
      }
    }
    console.log(output);

    return output;
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.user = null;
    });
  }
}
