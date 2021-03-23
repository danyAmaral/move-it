import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PomodoroTimerComponent } from './pages/pomodoro-timer/pomodoro-timer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pomodoro-timer', component: PomodoroTimerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
