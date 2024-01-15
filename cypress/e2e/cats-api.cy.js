const apiKey = 'ncTBJBpHnBt15D/K38UgDA==XncB5bK0GjNYLtNg'
const baseUrl = 'https://api.api-ninjas.com/v1/cats'

describe('cats-api tests', () => {
  before(function () {
    cy.fixture('cats').then(function (data) {
      this.data = data;
    })
  })
  
  it('GET /cats by name', function () {
    cy.request({
        method: 'GET',
        headers: { 'x-api-key': apiKey },
        url: baseUrl,
        qs: {
          "name": this.data.name
        } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      const catBody = response.body[0];
      expect(catBody.length).to.equal(this.data.length)
      expect(catBody.origin).to.equal(this.data.origin)
      expect(catBody.image_link).to.equal(this.data.image_link)
      expect(catBody.family_friendly).to.equal(this.data.family_friendly)
      expect(catBody.shedding).to.equal(this.data.shedding)
      expect(catBody.general_health).to.equal(this.data.general_health)
      expect(catBody.playfulness).to.equal(this.data.playfulness)
      expect(catBody.children_friendly).to.equal(this.data.children_friendly)
      expect(catBody.grooming).to.equal(this.data.grooming)
      expect(catBody.intelligence).to.equal(this.data.intelligence)
      expect(catBody.min_weight).to.equal(this.data.min_weight)
      expect(catBody.max_weight).to.equal(this.data.max_weight)
      expect(catBody.min_life_expectancy).to.equal(this.data.min_life_expectancy)
      expect(catBody.max_life_expectancy).to.equal(this.data.max_life_expectancy)
      expect(catBody.name).to.equal(this.data.name)
     })
  })

  it('GET /cats with invalid x-api-key', function () {
    cy.request({
        method: 'GET',
        headers: { 'x-api-key': '1234' },
        url: baseUrl,
        failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400)
     })
  })

  it('GET /cats by name when it is not found', function () {
    cy.request({
        method: 'GET',
        headers: { 'x-api-key': apiKey },
        url: baseUrl,
        qs: {
          "name": "not found"
        } 
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body.length).to.eq(0)
     })
  })
})  

