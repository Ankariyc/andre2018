import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { Timer } from '../timer';

@Component({
  selector: 'app-stopwatch',
  templateUrl: './stopwatch.component.html',
  styleUrls: ['./stopwatch.component.css']
})
export class StopwatchComponent implements OnInit {
  timer = new Timer();
  startStop: string;
  resetStatus: boolean;
  pauseTimestamp: number;
  dotCSS: any;
  singleTrigger: boolean;

  secCounter = interval(1000);

  msCounter = interval(1);

  constructor() { }

  ngOnInit() {
    this.resetStatus = true;
    this.startStop = 'Start';
    this.dotCSS = {
      color: 'green',
    };
    this.singleTrigger = true;
  }

  toggle(): void {
    this.singleTrigger = true;

    if (this.startStop === 'Start') {
      this.startStop = 'Stop';
      if (this.resetStatus) {
        this.resetStatus = false;
        this.timer.init(new Date().getTime());

        const resetedSubscription = this.msCounter.subscribe(() => {
          this.timer.update(new Date().getTime());
          if (this.startStop === 'Start') {
            resetedSubscription.unsubscribe();
          }
        });

      } else {
        const resumeTimestamp = new Date().getTime();
        this.timer.setStartMilliseconds = this.timer.getStartMilliseconds + resumeTimestamp - this.pauseTimestamp;

        const resetedSubscription = this.msCounter.subscribe(() => {
          this.timer.update(new Date().getTime());
          if (this.startStop === 'Start') {
            resetedSubscription.unsubscribe();
          }
        });
      }

    } else if (this.startStop === 'Stop') {
      this.startStop = 'Start';
      this.pauseTimestamp = new Date().getTime();
    }

  }

  getStyle(): object {
    if (this.startStop === 'Start' && this.resetStatus) {
      this.dotCSS.color = 'green';

    } else if (this.startStop === 'Start' && !this.resetStatus && this.singleTrigger) {
      this.singleTrigger = false;
      const blinkingDotSubscribtion = interval(1000).subscribe(() => {
        if (this.dotCSS.color !== 'transparent') {
          this.dotCSS.color = 'transparent';
        } else { this.dotCSS.color = 'red'; }

        if (!(this.startStop === 'Start' && !this.resetStatus)) {
          blinkingDotSubscribtion.unsubscribe();
        }
      });

    } else if (this.startStop === 'Stop') {
      this.dotCSS.color = 'red';
    }
    return this.dotCSS;
  }

  reset(): void {
    this.timer.reset();
    this.resetStatus = true;
  }


}
