import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../services/star-wars-service.service'
import { isNumber } from 'util';
import { Router } from '@angular/router';
import { StaticSpinnerService } from '../services/static-spinner.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  listOfPeople: any[] = [{ id: 0, name: 'Please select a name' }]
  selectedId = 0

  constructor(private starWarsService: StarWarsService, private router: Router) {

   }

  ngOnInit() {
    this.loadData()
  }
  get spinnerLoading() {
    return StaticSpinnerService.loadingSpinner
  }

  /**
   * Loads the list of characters listed on the SWAPI for selection
   */
  async loadData() {
    try {
      StaticSpinnerService.loadingSpinner = true
      const peopleResult = await this.starWarsService.getListOfPeople().toPromise().catch(err => console.log(err))
      this.listOfPeople = this.listOfPeople.concat(peopleResult.results)
      StaticSpinnerService.loadingSpinner = false
    } catch (err) {
      StaticSpinnerService.loadingSpinner = false
      console.log(err)
    }
  }
  /**
   * Displays the details of the character as selected from the dropdown
   * @param selectedId Id of the Character selected from the dropdown
   */
  displayDetails(selectedId: any) {
    if (selectedId && selectedId !== '' && isNumber(parseInt(selectedId)) && selectedId > 0) {
      this.router.navigateByUrl(`/person-info/${selectedId}`)
    }
  }
  /**
   * Displays the details of the Star Wars character when searching by the resource id
   * @param selectedId The id input by the user for searching
   */
  displayDetailsById(selectedId: string) {
    if (selectedId && selectedId !== '' && isNumber(parseInt(selectedId)) && parseInt(selectedId) > 0) {
      this.router.navigateByUrl(`/person-info/${selectedId}`)
    }
  }
}
