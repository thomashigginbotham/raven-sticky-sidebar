import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StickySidebarModule } from 'projects/sticky-sidebar/src/public_api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StickySidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
