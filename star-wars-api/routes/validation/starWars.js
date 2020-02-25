'use strict'

const joi = require('joi')

module.exports = {
  getById: {
    params: {
      id: joi.number().integer().min(1).max(1000).required()
    }
  },

  getByPeople: {
    query: joi.object({
      name: joi.string().min(0).max(255).trim().optional()
    }).unknown(false)
  }
}
