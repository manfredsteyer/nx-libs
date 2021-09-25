import { TestBed } from '@angular/core/testing';
import { ConsoleLogAppender, LogAppender } from './log-appender';
import { LoggerService } from './logger.service';
import { LoggerConfig } from './logger.config';
import { LoggerModule } from './logger.module';

describe('LogFormatterService', () => {
  let logger: LoggerService;
  let appender: LogAppender;
  let config: LoggerConfig;

  beforeEach(() => {

    config = {
      enableDebug: true,
      appender: ConsoleLogAppender,
    };

    TestBed.configureTestingModule({
      imports: [
        LoggerModule.forRoot(config)
      ]
    });

    logger = TestBed.inject(LoggerService);
    appender = TestBed.inject(LogAppender);

    jest.spyOn(appender, 'append').mockImplementation(() => null)

  });

  it('should debug', () => {
    config.enableDebug = true;
    logger.debug('debug!');

    expect(appender.append).toHaveBeenCalledTimes(1);
    expect(appender.append).toHaveBeenCalledWith('DEBUG', 'debug!');
  });

  it('should not debug', () => {
    config.enableDebug = false;
    logger.debug('debug!');

    expect(appender.append).toHaveBeenCalledTimes(0);
  });

  it('should log', () => {
    config.enableDebug = true;
    logger.log('log!');

    expect(appender.append).toHaveBeenCalledTimes(1);
    expect(appender.append).toHaveBeenCalledWith('LOG', 'log!');
  });

  it('should log even if enableDebug = false', () => {
    config.enableDebug = false;
    logger.log('log!');

    expect(appender.append).toHaveBeenCalledTimes(1);
    expect(appender.append).toHaveBeenCalledWith('LOG', 'log!');
  });

});
