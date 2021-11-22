import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { ApiService } from './api.service';
import { CRUDReturn } from '../model/crud_return.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user?: User | null;

  constructor(private api: ApiService, private auth: AngularFireAuth ) {}

  get authenticated(): boolean {
    return this.user != undefined && this.user != null;
  }

  async login(email: string, password: string): Promise<any> {
    try {
      var r = await this.auth.signInWithEmailAndPassword(email,password);
      console.log(r.user?.email);
      // var result: any = await this.api.post('/user/login', { email, password });
      // var output: CRUDReturn = { success: result.success, data: result.data };
      // if (output.success === true) {
      //   this.user = User.fromJson(output.data.id, output.data);
      // }
      // return output;
       return { success: false, data: r.user };
    } catch (error) {
      // if (error instanceof Error)
      //   return { success: false, data: error.message };
      // else return { success: false, data: 'unknown login error' };
    }
  }

  async register(payload: {
    name: string;
    age: number;
    email: string;
    password: string;
  }): Promise<CRUDReturn> {
    var result: any = await this.api.post('/user/register', payload);
    var output: CRUDReturn = { success: result.success, data: result.data };
    if (output.success === true) {
      this.user = User.fromJson(output.data.id, output.data);
    }
    return output;
  }

  logout() {
    this.user = null;
  }
}
