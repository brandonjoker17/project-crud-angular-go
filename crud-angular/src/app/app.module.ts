import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { environment } from '../environments/environment';
import { TaskState } from '../store/task.state';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { InputTaskComponent } from './input-task/input-task.component';
import { TaskComponent } from './task/task.component';
import {FormsModule} from '@angular/forms';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ViewTaskComponent,
    InputTaskComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    NgxsModule.forRoot([TaskState], {
      developmentMode: !environment.production
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
