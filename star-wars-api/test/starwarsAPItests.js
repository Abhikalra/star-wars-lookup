'use strict'

const assert = require('assert')
const sinon = require('sinon')
const request = require('supertest')

describe('Tests for fetching data from Star Wars API', function () {
  let server
  const port = process.env.API_PORT || '8100'
  this.timeout(60000)
  before(()=> {
    server = require('../app')
    server = server.listen(port)
  })
  describe('Test for error cases on the /get-starwars-info routes endpoints', ()=> {

    it('Calling the /get-starwars-info/people/:id with string text as opposed to id should throw a validation error', async ()=> {
      const result = await request(server).get('/get-starwars-info/people/incorrect')
      assert(result.status === 400, 'Validation error status code was not found')
      assert(result.body.message === 'validation error', 'Validation eror message should have been present')
      assert(result.body.error.status === 400)
    })

    it('Calling the /get-starwars-info/people/:id endpoint with negative id should throw a validation error', async()=>{
      const result = await request(server).get('/get-starwars-info/people/-1')
      assert(result.status === 400, 'Validation error status code was not found')
      assert(result.body.message === 'validation error', 'Validation eror message should have been present')
      assert(result.body.error.status === 400)
    })

    it('Calling the /get-starwars-info/people/:id endpoint with id above 1000 should throw a validation error', async()=>{
      const result = await request(server).get('/get-starwars-info/people/1001')
      assert(result.status === 400, 'Validation error status code was not found')
      assert(result.body.message === 'validation error', 'Validation eror message should have been present')
      assert(result.body.error.status === 400)
    })

    it('Calling the /get-starwars-info/people endpoint with a query param besides name should throw a validation error', async()=>{
      const result = await request(server).get('/get-starwars-info/people?incorrect=abhinav')
      assert(result.status === 400, 'Validation error status code was not found')
      assert(result.body.message === 'validation error', 'Validation eror message should have been present')
      assert(result.body.error.status === 400)
    })
  })

  describe('Tests for fetching data from the SWAPI and the composite object being returned to user', ()=>{

    it('Calling the /get-starwars-info/people endpoint should return list of names and the associated ids', async()=>{
      const getDataSpy = sinon.spy(require('../service/swapi-service'), 'getData')
      const result = await request(server).get('/get-starwars-info/people')      
      const body = result.body
      assert(typeof body === 'object', 'result is undefined')
      assert(body.count > 0, 'Count should be greater than 0')
      assert(body.results.length > 0, 'Results should be greater than 0')
      assert(body.results.filter(result =>result.name.toLowerCase().includes('luke skywalker')).length === 1)
      assert(getDataSpy.callCount >=1)
      getDataSpy.restore()
    })

    it('Calling the /get-starwars-info/people endpoint with a search param name should return list of names matching that name', async()=>{
      const getDataSpy = sinon.spy(require('../service/swapi-service'), 'getData')
      const result = await request(server).get('/get-starwars-info/people?name=lu')    
      const body = result.body
      assert(typeof body === 'object', 'result is undefined')
      assert(body.count === 2, 'Count should be equal to two')
      assert(body.results.length === 2, 'Results should be equal to two')
      assert(body.results.filter(result =>result.name.toLowerCase().includes('luke skywalker')).length === 1)
      sinon.assert.called(getDataSpy)
      getDataSpy.restore()
    })
    it('Calling the /get-starwars-info/people/:id endpoint with an id for non existing resource should return 404', async()=>{
      const getDataSpy = sinon.spy(require('../service/swapi-service'), 'getData')
      const result = await request(server).get('/get-starwars-info/people/199')
      const body = result.body
      assert(result.status === 404)
      assert(body.message ===  'Requested resource not found on Star Wars API')
      assert(body.error.status === 404)
      sinon.assert.called(getDataSpy)
      getDataSpy.restore()
    })
    it('Calling the /get-starwars-info/people/:id endpoint an id should return consolidated information for the character', async()=>{
      const getDataSpy = sinon.spy(require('../service/swapi-service'), 'getData')
      const result = await request(server).get('/get-starwars-info/people/1')    
      const body = result.body
      assert(typeof body === 'object', 'result is undefined')
      assert(body.hasOwnProperty('name'), 'Name should be present')
      assert(body.hasOwnProperty('homeWorld'), 'Homeworld should be present')
      assert(body.hasOwnProperty('species'), 'Species informatin should be present')
      assert(body.hasOwnProperty('films'), 'List of films should be present')
      assert(body.name === 'Luke Skywalker')
      assert(body.species.name === 'Human')
      assert(body.films.length > 0)
      sinon.assert.called(getDataSpy)
      getDataSpy.restore()
    })
  })

  after(()=> {
    server.close()
  })
})