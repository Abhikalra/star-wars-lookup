'use strict'

const router = require('express').Router()
const StarWarsQueryController = require('../controller/starwarsPeopleInfo')

/**
 * Logs the error
 * @param {JSON} err - The error to be logged.
 * @param {Function} next - The next callback from express to continue the routing.
 */
const log = (err, next) => {
  console.error(err)
  return next(err)
}

router.get('/people', async (req, res, next) => {
  try {
    const result = await StarWarsQueryController.getDataForPeople(req)
    res.json(result)
  } catch (err) {
    log(err, next)
  }
})

router.get('/people/:id', async (req, res, next) => {
  try {
    const result = await StarWarsQueryController.getDataForPersonById(req)
    res.json(result)
  } catch (err) {
    log(err, next)
  }
})

module.exports = router