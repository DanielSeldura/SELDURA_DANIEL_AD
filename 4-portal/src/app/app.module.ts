import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { HomeComponent } from './screens/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './screens/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { UsersComponent } from './screens/users/users.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditComponent } from './screens/edit/edit.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, PERSISTENCE } from '@angular/fire/compat/auth';
import { AuthGuard } from './shared/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DefaultLayoutComponent,
    NavbarComponent,
    FooterComponent,
    UsersComponent,
    EditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [{ provide: PERSISTENCE, useValue: 'session' },AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
