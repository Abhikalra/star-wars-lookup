import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'show-details',
  templateUrl: './show-details.component.html'
})
export class ShowDetailsComponent implements OnInit {

  @Input('title') title: string
  @Input('message') message: string
  @Input('details') detailsData: any

  constructor() { }

  ngOnInit() {
  }

}
