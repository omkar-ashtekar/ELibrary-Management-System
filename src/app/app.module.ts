import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';

import {MatCardModule} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {  ReactiveFormsModule } from '@angular/forms';  
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

//used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { SurfComponent } from './surf';
import { QuizComponent } from './quiz';
import { LoginComponent } from './account';
import { RegisterComponent } from './account';
import { AppRoutingModule } from './app-routing.module';
@NgModule({
    imports: [
            BrowserModule,
            ReactiveFormsModule,
            HttpClientModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            MatSidenavModule,
            MatToolbarModule,
            MatButtonModule,
            MatListModule,
            MatIconModule,MatSelectModule,
            MatCardModule,MatFormFieldModule,MatInputModule,FormsModule,MatProgressSpinnerModule,MatTableModule,
            FlexLayoutModule
        ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        SurfComponent,
        QuizComponent
    ],
    providers: [
        //provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }