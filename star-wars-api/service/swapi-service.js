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
      return this.handleResponse(response)
    } catch (err) {
      if (err.hasOwnProperty('statusCode')) {
        throw err
      }
      const error = new Error('Error occurred while fetching data from Star Wars API.')
      error.status = 500
      error.statusCode = 500
      throw error
    }
  },

  /**
   * Handle and return the response of the request
   * @param {object} responseData Query result
   */
  handleResponse(responseData) {
    console.log('Status: ' + `${responseData.status} ${responseData.statusText}`)
    if (responseData !== undefined && responseData.status === 200 && responseData.headers.has('Content-Type') && responseData.headers.get('Content-Type').includes('application/json')) return responseData.json()
    else if (responseData.status === 404) {
      const error = new Error('Requested resource not found on Star Wars API')
      error.status = responseData.status
      error.statusCode = responseData.status
      throw error
    }
  }
}
