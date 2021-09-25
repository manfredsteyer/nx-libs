import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { TabbedPaneModule } from '@my-project/tabbed-pane';
import { LogFormatter, LoggerConfig, LoggerModule } from '@my-project/logger';
import { CustomLogFormatter } from './custom-log.formatter';

@NgModule({
  imports: [
    BrowserModule, 
    TabbedPaneModule,
    LoggerModule.forRoot({
      enableDebug: true,
      // formatter: CustomLogFormatter
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    // {
    //   provide: LogFormatter,
    //   useClass: CustomLogFormatter
    // },
    // {
    //   provide: LoggerConfig,
    //   useValue: {
    //     enableDebug: true
    //   }
    // }
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
