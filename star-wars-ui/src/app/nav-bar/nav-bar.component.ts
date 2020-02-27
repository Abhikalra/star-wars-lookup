import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../services/star-wars-service.service'
import { isNumber } from 'util';
import { Router } from '@angular/router';
import { StaticSpinnerService } from '../services/static-spinner.service'
import { NgxSmartModalService } from 'ngx-smart-modal'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {

  listOfPeople: any[] = [{ id: 0, name: 'Please select a name' }]
  selectedId = 0

  constructor(private starWarsService: StarWarsService, private router: Router, private modalService: NgxSmartModalService) {

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
      const peopleResult = await this.starWarsService.getListOfPeople().toPromise()
      this.listOfPeople = this.listOfPeople.concat(peopleResult.results)
      StaticSpinnerService.loadingSpinner = false
    } catch (err) {
      StaticSpinnerService.loadingSpinner = false
      if (typeof err === 'string') {
        this.handleError(err)
      } else this.handleError('There was an error fetching data from the API.')
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
  /**
 * Opens a modal to display message
 * @param message Message
 */
  handleError(message: string) {
    this.modalService.create('alertModal', message).open()
  }
}
