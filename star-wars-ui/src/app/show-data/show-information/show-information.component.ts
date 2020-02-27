import { Component, OnInit } from '@angular/core'
import { StarWarsService } from '../../services/star-wars-service.service'
import { ActivatedRoute } from '@angular/router'
import { StaticSpinnerService } from '../../services/static-spinner.service'

@Component({
  selector: 'app-show-information',
  templateUrl: './show-information.component.html',
  host: {
    class: 'container-fluid'
  }
})
export class ShowInformationComponent implements OnInit {

  personInformation: any

  constructor(private route: ActivatedRoute, private starWarsService: StarWarsService) { 
    this.personInformation = {
      bio: {
        title: 'About',
        message: 'Here is some information about the character you selected..',
        details: {}
      },
      homePlanet: {
        title: 'Home World',
        message: 'Where this person comes from..',
        details: {}
      },
      speciesInfo: {
        title: 'Type of Species',
        message: 'And what makes them unique..',
        details: {}
      },
      films: []
    }
  }

  ngOnInit() {
    this.getData()
  }

  reinitializeData() {
    this.personInformation = {
      bio: {
        title: 'About',
        message: 'Here is some information about the character you selected..',
        details: {}
      },
      homePlanet: {
        title: 'Home World',
        message: 'Where this person comes from..',
        details: {}
      },
      speciesInfo: {
        title: 'Type of Species',
        message: 'And what makes them unique..',
        details: {}
      },
      films: []
    }
  }

  get spinnerLoading() {
    return StaticSpinnerService.loadingSpinner
  }

  /**
   * Gets the Star Wars character summary data
   */
  async getData() {
    try {
      this.route.params.subscribe(async params => {
        this.reinitializeData()
        StaticSpinnerService.loadingSpinner = true
        const queryResult: any = await this.starWarsService.getPersonInformationById(params['id']).toPromise().catch(err => console.log(err))
        if (queryResult) {
          this.personInformation.bio.details = {
            'Name': queryResult.name || 'n/a',
            'Height': queryResult.height || 'n/a',
            'Mass': queryResult.mass || 'n/a',
            'Hair Color': queryResult.hairColor || 'n/a',
            'Skin Color': queryResult.skinColor || 'n/a',
            'Gender': queryResult.gender || 'n/a',
            'Birth Year': queryResult.birthYear || 'n/a'
          }
          this.personInformation.homePlanet.details = {
            'Name': (queryResult.homeWorld && queryResult.homeWorld.name) ? queryResult.homeWorld.name : 'n/a',
            'Terrain Type': (queryResult.homeWorld && queryResult.homeWorld.terrain) ? queryResult.homeWorld.terrain : 'n/a',
            'Population': (queryResult.homeWorld && queryResult.homeWorld.population) ? queryResult.homeWorld.population : 'n/a'
          }
          this.personInformation.speciesInfo.details = {
            'Name': (queryResult.species && queryResult.species.name) ? queryResult.species.name : 'n/a',
            'Avg Lifespan': (queryResult.species && queryResult.species.averageLifespan) ? queryResult.species.averageLifespan : 'n/a',
            'Classification': (queryResult.species && queryResult.species.classification) ? queryResult.species.classification : 'n/a',
            'Language': (queryResult.species && queryResult.species.language) ? queryResult.species.language : 'n/a'
          }
          this.personInformation.films = queryResult.films
        }
        StaticSpinnerService.loadingSpinner = false
      })
    } catch (err) {
      StaticSpinnerService.loadingSpinner = false
      console.log(err)
    }
  }

}
