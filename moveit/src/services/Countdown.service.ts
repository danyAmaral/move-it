import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
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

  constructor(private cookieService: CookieService) {
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
    this.time = timeDefault;

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
    // new Audio('/notification.mp3').play();
    // if (Notification.permission === 'granted') {
    //   const notify = new Notification('Novo desafio', {
    //     body: `valendo ${challenge.amount} xp!`,
    //   });
    // }
  }

  setAtiveChallenge(challenge?: IChallenge) {
    if (this.challengeActive) {
      this.challengeActive.next(challenge);
    }
  }

  failChallenge() {
    this.reset();
  }

  reset() {
    this.clearCountdown();
    this.resetCountdown();
    this.setAtiveChallenge(null);
  }

  completeChallenge() {
    if (!this.challengeActive?.value) {
      return;
    }

    const challenge = this.challengeActive.value;
    const currentExperience = Number(this.getCookie('currentExperience'));
    const amount = challenge.amount;
    const finalExperiece = currentExperience + amount;

    // if (finalExperiece >= experienceToNextLevel) {
    //   finalExperiece = finalExperiece - experienceToNextLevel;
    //   // levelUp();
    // }

    this.setCurrentExperience(finalExperiece);
    // setChallengesCompleted(challengesCompleted + 1);
    this.reset();
  }

  setCurrentExperience(newCurrentExperience: number) {
    this.setCookie('currentExperience', newCurrentExperience.toString());
  }

  setCookie(key: string, value: string) {
    this.cookieService.set(key, value);
  }

  getCookie(key: string) {
    return this.cookieService.get(key);
  }
}
