import { Component, OnChanges, OnInit } from '@angular/core';
import { IChallenge } from 'src/app/interfaces/IChallenge';
import { CountdownService } from 'src/services/Countdown.service';

@Component({
  selector: 'app-challenge-box',
  templateUrl: './challenge-box.component.html',
  styleUrls: ['./challenge-box.component.scss'],
})
export class ChallengeBoxComponent implements OnInit {
  challenge: IChallenge;
  constructor(private _countdownService: CountdownService) {}
  ngOnInit(): void {
    this._countdownService.challengeActive.subscribe((challenge) => {
      this.challenge = challenge;
    });
  }

  getImgage(image) {
    return `/assets/icons/${image}.svg`;
  }
}
