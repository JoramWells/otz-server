// const chai = require('chai');
const request = require('supertest');
const server = require('../index');

describe('Express route', () => {
  it('soudl return response for root service', (done) => {
    request(server).get('/patients/fetchAll')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
      });
  });
});
