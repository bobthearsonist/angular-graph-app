import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HelloFrameworkModule } from './hello-framework/hello-framework.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    HelloFrameworkModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
