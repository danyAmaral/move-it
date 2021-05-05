import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IChallenge } from 'src/app/interfaces/IChallenge';
import { CountdownService } from 'src/services/Countdown.service';

@Component({
  selector: 'app-challenge-box',
  templateUrl: './challenge-box.component.html',
  styleUrls: ['./challenge-box.component.scss'],
})
export class ChallengeBoxComponent implements OnInit, OnDestroy {
  challenge: IChallenge;
  constructor(private countdownService: CountdownService) {}

  ngOnDestroy(): void {
    this.countdownService.challengeActive.unsubscribe();
  }

  ngOnInit(): void {
    this.countdownService.challengeActive.subscribe((challenge) => {
      this.challenge = challenge;
    });
  }

  getImgage(image) {
    return `/assets/icons/${image}.svg`;
  }

  completeChallenge() {
    this.countdownService.completeChallenge();
    this.clearChallenge();
  }

  failChallenge() {
    this.countdownService.failChallenge();
    this.clearChallenge();
  }

  clearChallenge() {
    this.challenge = null;
  }
}
