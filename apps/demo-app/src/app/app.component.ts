import { Component } from '@angular/core';
import { LoggerService } from '@my-project/logger';

@Component({
  selector: 'my-project-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo-app';

  constructor(private logger: LoggerService) {
    logger.debug('Debug: Manfred was here!');
    logger.log(`Log: You've been haaaaacked!!`);
  }
}
