import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-movies-info',
  templateUrl: './show-movies-info.component.html'
})
export class ShowMoviesInfoComponent implements OnInit {
  @Input('filmsList') filmsList: any[]
  constructor() { }

  ngOnInit() {
  }

}
