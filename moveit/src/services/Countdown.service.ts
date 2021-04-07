import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICountdown } from 'src/app/interfaces/ICountdown';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  countdown: BehaviorSubject<ICountdown>;
  countdownMain: ICountdown;
  time = 0.1 * 60;

  constructor() {
    this.countdown = new BehaviorSubject<ICountdown>(null);
    const countdownDefault = this.countdownDefault();
    this.countdown.next(countdownDefault);
    this.countdownMain = countdownDefault;
  }

  public startCountdown() {
    this.countdownMain.hasActive = true;
    const interval = setInterval(() => {
      if (this.time > 0) {
        this.time = this.time - 1;
        this.countdownMain.minutes = Math.floor(this.time / 60);
        this.countdownMain.seconds = this.time % 60;
        this.countdown.next(this.countdownMain);
      } else {
        clearInterval(interval);
        this.countdownMain.hasActive = false;
        this.countdownMain.hasFinish = true;
        this.countdown.next(this.countdownMain);
      }
    }, 1000);
  }

  countdownDefault(): ICountdown {
    const timeDefault = 0.1 * 60;
    const minutes = Math.floor(timeDefault / 60);
    const seconds = timeDefault % 60;

    return {
      minutes,
      seconds,
      hasActive: false,
      hasFinish: false,
    } as ICountdown;
  }

  clearCountdown() {
    this.countdownMain = this.countdownDefault();
    this.countdown.next(this.countdownMain);
  }
}
