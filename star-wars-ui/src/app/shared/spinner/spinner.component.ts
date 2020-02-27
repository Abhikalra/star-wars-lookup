import { Component, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html'
})
export class SpinnerComponent implements OnDestroy {

  currentTimeout: any
  isDelayedRunning = false

  @Input()
  public delay = 300

  @Input()
  public set isRunning(value: boolean) {
    // toggling status of variable
    if (!value) {
      this.cancelTimeout()
      this.isDelayedRunning = false
    }

    if (this.currentTimeout) {
      return
    }

    this.currentTimeout = setTimeout(() => {
      this.isDelayedRunning = value
      this.cancelTimeout()
    }, this.delay)
  }

  /**
   * Toggle timeout
   */
  private cancelTimeout(): void {
    clearTimeout(this.currentTimeout)
    this.currentTimeout = undefined
  }

  ngOnDestroy(): any {
    this.cancelTimeout()
  }

}
