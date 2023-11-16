import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent implements OnInit {
  public timeLeft: string = '00:00:00';

  ngOnInit(): void {
    this.updateTimer();
    setInterval(() => {
      this.updateTimer();
    }, 1000);
  }

  private updateTimer(): void {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const timeDifference = midnight.getTime() - now.getTime();
    this.timeLeft = this.formatTime(timeDifference);
  }

  private formatTime(milliseconds: number): string {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return (
      this.padNumber(hours) +
      ':' +
      this.padNumber(minutes) +
      ':' +
      this.padNumber(seconds)
    );
  }

  private padNumber(num: number): string {
    return (num < 10 ? '0' : '') + num;
  }
}
