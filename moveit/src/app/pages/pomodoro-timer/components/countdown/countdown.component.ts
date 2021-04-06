import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountdown } from 'src/app/interfaces/ICountdown';
import { CountdownService } from '../../../../../services/Countdown.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
})
export class CountdownComponent implements OnInit, OnChanges {
  constructor(private _countdownService: CountdownService) {}
  countdown: ICountdown;
  secondLeft: string;
  secondRigth: string;
  minuteLeft: string;
  minuteRigth: string;
  hasActive = false;

  ngOnInit(): void {
    this._countdownService.countdown.subscribe((countdown) => {
      this.countdown = countdown;
      this.setTimeInfo();
    });
  }

  ngOnChanges() {
    this.countdown = this._countdownService.countdown.value;
    this.setTimeInfo();
  }

  startCountdown() {
    this._countdownService.startCountdown();
  }

  setTimeInfo() {
    const [minuteLeft, minuteRigth] = String(this.countdown.minutes)
      .padStart(2, '0')
      .split('');
    const [secondLeft, secondRigth] = String(this.countdown.seconds)
      .padStart(2, '0')
      .split('');

    this.secondLeft = secondLeft;
    this.secondRigth = secondRigth;
    this.minuteLeft = minuteLeft;
    this.minuteRigth = minuteRigth;
    this.hasActive = this.countdown.hasActive;
  }
}
