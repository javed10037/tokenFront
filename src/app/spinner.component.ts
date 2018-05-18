import {Component} from '@angular/core';
import { GlobalService} from './GlobalService';
@Component({
  selector: 'spinner-component',
  'template': '<div *ngIf="active" class="spinner loading"></div>'
})
export class SpinnerComponent {
  public active: boolean;

  public constructor(spinner: GlobalService) {
    // spinner.status.subscribe((status: boolean) => {
    //   this.active = status;
    // });
  }
}