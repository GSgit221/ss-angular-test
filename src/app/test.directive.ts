import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { TestService } from './services/test.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IConfig } from './interfaces/config';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[onlyForScreen]'
})
export class TestDirective implements OnInit, OnDestroy {

  @Input()
  onlyForScreen: string = '';

  private config: IConfig;
  private _unsubscribe = new Subject();

  constructor(
    private testService: TestService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  ngOnInit() {
    const { production, ...config } = environment;
    this.config = config;

    this.testService.windowSizeChanged
      .pipe(
        takeUntil(this._unsubscribe)
      )
      .subscribe(width => {
        this.viewContainer.clear();
        if (width > this.config.tablet && this.onlyForScreen === 'desktop') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        if (width > this.config.mobile && width < this.config.tablet && this.onlyForScreen === 'tablet') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        if (width < this.config.mobile && this.onlyForScreen === 'mobile') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
      });
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

}
