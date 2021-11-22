import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [ApiService, AuthService],
  exports: [],
})
export class SharedModule {}
