import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TestService {
  public readonly windowSizeChanged = new BehaviorSubject<number>(window.innerWidth);

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map((event: any) => event['currentTarget'].innerWidth)
      )
      .subscribe((windowSize) => {
        this.windowSizeChanged.next(windowSize);
      });
  };
}
