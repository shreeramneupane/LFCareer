require('./../testHepler');

var expect = require('chai').expect,
request = require('supertest'),
express = require('express'),
db = require('../../db'),
HttpStatus = require('http-status-codes'),
uuid = require('node-uuid');

var StageController = require('../../controllers/stageController');

var app = express();

describe('List stage, Controller action index, GET /stages/', function () {
    app.get('/stages/', StageController.index);

    describe('when no any stage are present', function () {
        before(function () {
            return db('stage').whereNot('id', null).del().then();
        });

        it('should respond with empty array json', function (done) {
            request(app)
            .get('/stages')
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

    describe('when stages are present', function () {
        var stage1 = {
            id: uuid.v1(),
            name: "Title 1"
        },
        stage2 = {
            id: uuid.v1(),
            name: "Title 2"
        };

        before(function () {
            return db('stage').whereNot('id', null).del()
            .insert([stage1, stage2]).then();
        });

        it('should respond with array containing stages', function (done) {
            request(app)
            .get('/stages')
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var stage1 = res.body[0];
                var stage2 = res.body[1];
                expect(res.body.length).to.equal(2);
                expect(stage1.id).to.equal(stage1.id);
                expect(stage1.name).to.equal(stage1.name);
                expect(stage2.id).to.equal(stage2.id);
                expect(stage2.name).to.equal(stage2.name);
                done();
            });
        });
    });
});

describe('Show stage detail, Controller action show, GET /stages/:id', function () {
    app.get('/stages/:id', StageController.show);

    describe('when stage is present', function () {
        var stage = {
            id: uuid.v1(),
            name: "Title 1"
        }, id;

        before(function () {
            return db('stage').insert(stage).then();
        });

        it('should respond with json containing stage information', function (done) {
            request(app)
            .get('/stages/' + stage.id)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var stage = res.body;
                expect(stage.id).to.equal(stage.id);
                expect(stage.name).to.equal(stage.name);
                done();
            });
        });
    });

    describe('when stage is not present', function () {
        var id = 9000;

        it('should respond with BAD_REQUEST', function (done) {
            request(app)
            .get('/stages/' + id)
            .set('Accept', 'application/json')
            .expect(HttpStatus.BAD_REQUEST)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.error).to.equal("Can not fetch stage with id: " + id);
                done();
            });
        });
    });
});

describe('Create new stage, Controller action create, POST /stages/', function () {
    app.use(require('body-parser').json());
    app.post('/stages/', StageController.create);

    describe('when stage params are valid', function () {
        var stageParam = {
            name: "Title 1"
        };

        it('should create the a stage and respond with json containing stage information', function (done) {
            request(app)
            .post('/stages')
            .send(stageParam)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var stage = res.body;
                expect(stage.name).to.equal(stageParam.name);
                done();
            });
        });
    });

    describe('when stage params title, description and specification field is empty', function () {
        var stageParam = {
            "name": ''
        };

        it('should resond with error message on title field', function (done) {
            request(app)
            .post('/stages')
            .send(stageParam)
            .set('Accept', 'application/json')
            .expect(HttpStatus.BAD_REQUEST)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.error.name).to.equal("Please provide stage name.");
                done();
            });
        });
    });

});

describe('Update stage, Controller action update, PUT /stages/:id', function () {
    app.use(require('body-parser').json());
    app.put('/stages/:id', StageController.update);

    describe('when update stage params are valid', function () {
        var stage = {
            id: uuid.v1(),
            name: "Title 1"
        };

        before(function () {
            return db('stage').returning('id').insert(stage).then();
        });

        var stageParam = {
            name: "New Stage title"
        };

        it('should update the a Stage and respond with json containing stage updated information', function (done) {
            request(app)
            .put('/stages/' + stage.id)
            .send(stageParam)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.name).to.equal(stageParam.name);
                done();
            });
        });
    });
});
