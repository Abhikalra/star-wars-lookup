'use strict'

const StarWarsService = require('../service/swapi-service')

const nestedUrlsList = ['homeworld', 'species', 'films']

const baseURL = `${process.env.SWAPI_URL}`

module.exports = {
  /**
   * Gets the data for a people resource when querying by the id or searching by name from the Star Wars API
   * @param {object} req Request Object
   */
  async getDataForPersonById(req) {
    let peopleRoute = 'people'
    let dataToReturn
    if (req.params.id) {
      peopleRoute += `/${req.params.id}`
    }
    const peopleResult = await StarWarsService.getData(peopleRoute)
    if (peopleResult && typeof peopleResult === 'object') {
      for (let [key, value] of Object.entries(peopleResult)) {
        if (nestedUrlsList.includes(key) && typeof value === 'string') {
          if (value.includes(baseURL)) {
            peopleResult[key] = await StarWarsService.getData(value)
          }
        } else if (nestedUrlsList.includes(key) && Array.isArray(value)) {
          const resultsArray = []
          for (let endPoint of value) {
            if (endPoint.includes(baseURL)) {
              const innerResult = await StarWarsService.getData(endPoint)
              resultsArray.push(innerResult)
            }
          }
          peopleResult[key] = resultsArray
        }
      }
      dataToReturn = {
        name: peopleResult.name,
        height: peopleResult.height,
        mass: peopleResult.mass,
        hairColor: peopleResult['hair_color'],
        skinColor: peopleResult['skin_color'],
        gender: peopleResult.gender,
        birthYear: peopleResult['birth_year'],
        homeWorld: {
          name: peopleResult.homeworld.name || '',
          terrain: peopleResult.homeworld.terrain || '',
          population: peopleResult.homeworld.population || ''
        },
        species: peopleResult.species.map(speciesType => {
          return {
            name: speciesType.name || '',
            averageLifespan: speciesType['average_lifespan'] || '',
            classification: speciesType.classification || '',
            language: speciesType.language || ''
          }
        }),
        films: peopleResult.films.map(film => {
          return {
            title: film.title || '',
            director: film.director || '',
            producers: film.producer || '',
            releaseDate: film['release_date'] || ''
          }
        })
      }
    }
    return dataToReturn
  },

  async getDataForPeople(req) {
    let dataToReturn = { count: 0, results: [] }
    const personName = req.query.name || null
    const getPeopleDataIterative = async (returnData, resourceType, personName = null) => {
      const peopleResult = await StarWarsService.getData(resourceType, personName)
      if (peopleResult && typeof peopleResult === 'object') {
        if (peopleResult.hasOwnProperty('count')) {
          returnData.count = peopleResult.count
          for (let personResult of peopleResult.results) {
            const extractURL = personResult.url.split('/')
            returnData.results.push({ name: personResult.name, id: extractURL[extractURL.length - 2] })
          }
        }
        if (peopleResult.next !== null) {
          return getPeopleDataIterative(returnData, peopleResult.next)
        }
        return returnData
      }
    }
    dataToReturn = await getPeopleDataIterative(dataToReturn, 'people', personName)
    return dataToReturn
  }
}