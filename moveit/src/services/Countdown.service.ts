import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChallenge } from 'src/app/interfaces/IChallenge';
import { ICountdown } from 'src/app/interfaces/ICountdown';

import * as data from '../services/challenges.json';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  countdown: BehaviorSubject<ICountdown>;
  countdownMain: ICountdown;
  challengeActive: BehaviorSubject<IChallenge>;
  time = 0.1 * 60;
  challenges: IChallenge[];
  interval: any;

  constructor() {
    this.countdown = new BehaviorSubject<ICountdown>(null);
    this.challengeActive = new BehaviorSubject<IChallenge>(null);
    const countdownDefault = this.countdownDefault();
    this.countdown.next(countdownDefault);
    this.countdownMain = countdownDefault;
    this.challenges = (data as any).default as IChallenge[];
  }

  public startCountdown() {
    this.countdownMain.hasActive = true;
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time = this.time - 1;
        this.countdownMain.minutes = Math.floor(this.time / 60);
        this.countdownMain.seconds = this.time % 60;
        this.countdown.next(this.countdownMain);
      } else {
        clearInterval(this.interval);
        this.countdownMain.hasActive = false;
        this.countdownMain.hasFinish = true;
        this.countdown.next(this.countdownMain);
        this.startNewChallenge();
      }
    }, 1000);
  }

  resetCountdown() {
    clearInterval(this.interval);
    this.countdownMain.hasActive = false;
    this.countdownMain.hasFinish = false;
    this.countdown.next(this.countdownDefault());
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

  startNewChallenge() {
    const randomChallengeIndex = Math.floor(
      Math.random() * this.challenges.length
    );
    const challenge = this.challenges[randomChallengeIndex];
    this.setAtiveChallenge(challenge);
    new Audio('/notification.mp3').play();
    if (Notification.permission === 'granted') {
      const notify = new Notification('Novo desafio', {
        body: `valendo ${challenge.amount} xp!`,
      });
    }
  }

  setAtiveChallenge(challenge) {
    this.challengeActive.next(challenge);
  }
}
