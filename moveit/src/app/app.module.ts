import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PomodoroTimerComponent } from './pages/pomodoro-timer/pomodoro-timer.component';
import { ExperienceBarComponent } from './pages/pomodoro-timer/components/experience-bar/experience-bar.component';
import { CountdownComponent } from './pages/pomodoro-timer/components/countdown/countdown.component';
import { ChallengeBoxComponent } from './pages/pomodoro-timer/components/challenge-box/challenge-box.component';
import { CompletedChallengesComponent } from './pages/pomodoro-timer/components/completed-challenges/completed-challenges.component';
import { ProfileComponent } from './pages/pomodoro-timer/components/profile/profile.component';

import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PomodoroTimerComponent,
    ExperienceBarComponent,
    CountdownComponent,
    ChallengeBoxComponent,
    CompletedChallengesComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
