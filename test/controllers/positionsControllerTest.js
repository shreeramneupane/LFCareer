require('./../testHepler');

var expect = require('chai').expect,
request = require('supertest'),
express = require('express'),
db = require('../../db'),
HttpStatus = require('http-status-codes');

var PositionsController = require('../../controllers/positionsController');

var app = express();

describe('List position, Controller action index, GET /positions/', function () {
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
          done(err);
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
          done(err);
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

describe('Show position detail, Controller action show, GET /positions/:id', function () {
  app.get('/positions/:id', PositionsController.show);

  describe('when position is present', function () {
    var position = {
      title: "Title 1",
      description: 'Description 1',
      specification: 'Specification 1'
    }, id;

    before(function () {
      return db('position').returning('id').insert(position)
      .then(function (response) {
        id = response[0];
      });
    });

    it('should respond with json containing position information', function (done) {
      request(app)
      .get('/positions/' + id)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        var responsePosition = res.body;
        expect(responsePosition.id).to.equal(id);
        expect(responsePosition.title).to.equal(position.title);
        expect(responsePosition.description).to.equal(position.description);
        expect(responsePosition.specification).to.equal(position.specification);
        done();
      });
    });
  });

  describe('when position is not present', function () {
    var id = 9000;

    it('should respond with BAD_REQUEST', function (done) {
      request(app)
      .get('/positions/' + id)
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.error).to.equal("Can not fetch position with id: " + id);
        done();
      });
    });
  });
});

describe('Create new position, Controller action create, POST /positions/', function () {
  app.use(require('body-parser').json());
  app.post('/positions/', PositionsController.create);

  describe('when position params are valid', function () {
    var positionParam = {
      "position": {
        "title": "Title 1",
        "description": 'Description 1',
        "specification": 'Specification 1'
      }
    };

    before(function () {
      return db('position').whereNot('id', null).del().then();
    });

    it('should create the a position and respond with json containing position information', function (done) {
      request(app)
      .post('/positions')
      .send(positionParam)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        var responsePosition = res.body,
        position = positionParam.position;
        expect(responsePosition.title).to.equal(position.title);
        expect(responsePosition.description).to.equal(position.description);
        expect(responsePosition.specification).to.equal(position.specification);
        done();
      });
    });
  });

  describe('when position params title, description and specification field is empty', function () {
    var positionParam = {
      "position": {
        "title": '',
        "specification": ''
      }
    };

    it('should resond with error message on title field', function (done) {
      request(app)
      .post('/positions')
      .send(positionParam)
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.error.title).to.equal("Please provide job title.");
        expect(res.body.error.description).to.equal("Please provide job description.");
        expect(res.body.error.specification).to.equal("Please provide job specification.");
        done();
      });
    });
  });

  describe('when position params contain not required parameter', function () {
    var positionParam = {
      "position": {
        "title": "Title 1",
        "description": 'Description 1',
        "specification": 'Specification 1',
        "more": "This is more parameter"
      }
    };

    it('should resond with error message on title field', function (done) {
      request(app)
      .post('/positions')
      .send(positionParam)
      .set('Accept', 'application/json')
      .expect(HttpStatus.BAD_REQUEST)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.error).to.equal("Can not create new position with provided parameters.");
        done();
      });
    });
  });
});

describe('Update position, Controller action update, PUT /positions/:id', function () {
  app.use(require('body-parser').json());
  app.put('/positions/:id', PositionsController.update);

  describe('when update position params are valid', function () {
    var position = {
      title: "Title 1",
      description: 'Description 1',
      specification: 'Specification 1'
    }, id;

    before(function () {
      return db('position').returning('id').insert(position)
      .then(function (response) {
        id = response[0];
      });
    });

    var positionParam = {
      position: {
        title: "New Position title",
        description: 'New Description',
        specification: 'New Specification'
      }
    };

    it('should update the a position and respond with json containing position updated information', function (done) {
      request(app)
      .put('/positions/' + id)
      .send(positionParam)
      .set('Accept', 'application/json')
      .expect(HttpStatus.OK)
      .end(function (err, res) {
        if (err) {
          done(err);
        }
        expect(res.body.title).to.equal(positionParam.position.title);
        expect(res.body.description).to.equal(positionParam.position.description);
        expect(res.body.specification).to.equal(positionParam.position.specification);
        done();
      });
    });
  });
});
