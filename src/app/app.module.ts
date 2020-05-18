import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestDirective } from './test.directive';
import { TestService } from './services/test.service';

@NgModule({
  declarations: [
    AppComponent,
    TestDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
