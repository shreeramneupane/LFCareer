require('./../testHepler');

var expect = require('chai').expect,
request = require('supertest'),
express = require('express'),
db = require('../../db'),
HttpStatus = require('http-status-codes');

var PositionsController = require('../../controllers/positionsController');

var app = express();

describe('GET /positions/', function () {
  app.get('/positions/', PositionsController.index);

  describe('when no any position are present', function () {
    before(function () {
      return db('position').whereNot('id', null).del().then();
    });

    it('should respond with empty array json', function (done) {
      request(app)
      .get('/positions')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end(function (err, res) {
        if (err) {
          throw new Error();
        }
        expect(res.body.length).to.equal(0);
        done();
      });
    });
  });

  describe('when positions are present', function () {
    var position1 = {
      title: "Title 1",
      description: 'Description 1',
      specification: 'Specification 1'
    },
    position2 = {
      title: "Title 2",
      description: 'Description 2',
      specification: 'Specification 2'
    };

    before(function () {
      return db('position').whereNot('id', null).del()
      .insert([position1, position2]).then();
    });

    it('should respond with array containing positions', function (done) {
      request(app)
      .get('/positions')
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end(function (err, res) {
        if (err) {
          throw new Error();
        }
        var resPosition1 = res.body[0];
        var resPosition2 = res.body[1];
        expect(res.body.length).to.equal(2);
        expect(resPosition1.title).to.equal(position1.title);
        expect(resPosition1.description).to.equal(position1.description);
        expect(resPosition1.specification).to.equal(position1.specification);
        expect(resPosition2.title).to.equal(position2.title);
        expect(resPosition2.description).to.equal(position2.description);
        expect(resPosition2.specification).to.equal(position2.specification);
        done();
      });
    });
  });
});
