'use strict'

const router = require('express').Router()
const StarWarsQueryController = require('../../controller/starwarsPeopleInfo')
const StarWarValidations = require('../validation/starWars')
const validate = require('express-validation')

/**
 * Logs the error
 * @param {JSON} err - The error to be logged.
 * @param {Function} next - The next callback from express to continue the routing.
 */
const log = (err, next) => {
  console.error(err)
  return next(err)
}

/**
 * @api {get} /people Retrieves a list of star wars characters and their resource ids
 * @apiGroup People
 * @apiName PeopleList
 * @apiDescription Retrieves a list of star wars characters and their resource ids
 *
 * @apiParam (query) {String} name  To search for characters by name
 *
 * @apiSuccess {Object} body
 *                               The found result
 * @apiSuccess {Number}   body.count
 *                               The number of records
 * @apiSuccess {Object[]}   body.results
 *                                The list of names and ids
 * @apiSuccess {String}   body.results.name
 *                                The name of character
 * @apiSuccess {Number}   body.results.id
 *                                The resource ID for the people resource
 * @apiError Error    Error response
 */

router.get('/people', validate(StarWarValidations.getByPeople), async (req, res, next) => {
  try {
    const result = await StarWarsQueryController.getDataForPeople(req)
    res.json(result)
  } catch (err) {
    log(err, next)
  }
})

/**
 * @api {get} /people/:id Retrieves summary information for a character in Star Wars Universe
 * @apiGroup People
 * @apiName PersonDetail
 * @apiDescription Retrieves summary information for a character in Star Wars Universe
 *
 * @apiParam (url)  {Number} id   The id of the person on Star Wars API
 *
 * @apiSuccess {Object} body
 *                               The found person information
 * @apiSuccess {String}   body.name
 *                               The name of character
 * @apiSuccess {Number}   body.height
 *                               The height of the character
 * @apiSuccess {Number}   body.mass
 *                               Mass information
 * @apiSuccess {String}   body.hairColor
 *                               Haircolor information
 * @apiSuccess {String}   body.skinColor
 *                               Skin color information
 * @apiSuccess {String}   body.gender
 *                               Gender of the character
 * @apiSuccess {String}   body.birthYear
 *                               Year of birth
 * @apiSuccess {Object}   body.homeWorld
 *                               Information on homeworld
 * @apiSuccess {String}   body.homeWorld.name
 *                               Name of homw world
 * @apiSuccess {String}   body.homeWorld.terrain
 *                               Homeworld terrain
 * @apiSuccess {Number}   body.homeWorld.population
 *                               Population
 * @apiSuccess {Object}   body.species
 *                               Information on species
 * @apiSuccess {String}   body.species.name
 *                               Name of species
 * @apiSuccess {Number}   body.species.averageLifespan
 *                               Species life span
 * @apiSuccess {String}   body.species.classification
 *                               Species classification
 * @apiSuccess {String}   body.species.language
 *                               Species language
 * @apiSuccess {Object[]} body.films
 *                               Information on films
 * @apiSuccess {String}   body.films.title
 *                              Title of film
 * @apiSuccess {String}   body.films.director
 *                               Name of director
 * @apiSuccess {String}   body.films.producers
 *                               Names of producer
 * @apiSuccess {String}   body.films.releaseDate
 *                               Release data
 * @apiError Error    Error response
 */
router.get('/people/:id', validate(StarWarValidations.getById), async (req, res, next) => {
  try {
    const result = await StarWarsQueryController.getDataForPersonById(req)
    res.json(result)
  } catch (err) {
    log(err, next)
  }
})

module.exports = router