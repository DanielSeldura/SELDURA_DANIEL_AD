import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private api: HttpClient) {}

  async post(url: string, body: any): Promise<any> {
    try {
      return await this.api.post(environment.API_URL+url, body).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async get(url: string): Promise<any> {
    try {
      return await this.api.get(environment.API_URL+url).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async patch(url: string, body?:any): Promise<any> {
    try {
      return await this.api.patch(environment.API_URL+url,body).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async delete(url: string): Promise<any> {
    try {
      return await this.api.delete(environment.API_URL+url).toPromise();
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
