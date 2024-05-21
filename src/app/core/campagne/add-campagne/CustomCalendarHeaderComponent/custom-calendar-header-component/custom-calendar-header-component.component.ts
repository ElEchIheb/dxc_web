import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatCalendarHeader } from '@angular/material/datepicker';

@Component({
  selector: 'app-custom-calendar-header-component',
  templateUrl: './custom-calendar-header-component.component.html',
  styleUrls: ['./custom-calendar-header-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomCalendarHeaderComponentComponent extends MatCalendarHeader<Date>{

  get label() {
    return super.periodButtonText;
  }

  public next() {
    super.nextClicked();
  }

  public prev() {
    super.previousClicked();
  }
}

