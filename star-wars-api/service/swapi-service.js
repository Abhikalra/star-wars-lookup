'use strict'
const fetch = require('node-fetch')

const baseURL = `${process.env.SWAPI_URL}`
const { URL, URLSearchParams } = require('url')

module.exports = {

  /**
   * Gets data from the Star Wars API
   * @param {string} urlPath Star Wars API path for the resourse
   * @param {string} nameQuery Query param if searching for a resource by name
   */
  async getData(urlPath, nameQuery = null) {
    try {
      const url = new URL(urlPath, baseURL)
      if (nameQuery) {
        url.search = new URLSearchParams({ search: nameQuery })
      }
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      return response.json()
    } catch (err) {
      const error = new Error()
      error.message = 'Error occurred while fetching data from Star Wars API.'
      error.code = 500
      throw error
    }

  }
}
