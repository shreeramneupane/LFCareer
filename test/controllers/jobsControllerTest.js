require('./../testHepler');

var expect = require('chai').expect,
request = require('supertest'),
express = require('express'),
db = require('../../db'),
HttpStatus = require('http-status-codes'),
uuid = require('node-uuid');

var JobsController = require('../../controllers/jobsController');

var app = express();

describe('List jobs, Controller action index, GET /jobs/', function () {
    app.get('/jobs/', JobsController.index);

    describe('when no any jobs are present', function () {
        before(function () {
            return db('job').whereNot('id', null).del().then();
        });

        it('should respond with empty array json', function (done) {
            request(app)
            .get('/jobs')
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

    describe('when jobs are present', function () {
        var job = {
            id: uuid.v1(),
            title: "Title 1",
            intro: "Job Intro 1",
            number_of_opening: "3",
            description: 'Description 1',
            specification: 'Specification 1',
            created_date: "2016-04-01T00:00:00.000Z",
            valid_until: "2016-05-01T00:00:00.000Z"
        }, id;

        before(function () {
            var position = {
                id: uuid.v1(),
                title: 'Position 1',
                description: 'Description',
                specification: 'Specification'
            };
            return db('position').returning("id").insert(position).then(function (response) {
                job.position_id = response[0];
                db('job').insert(job).then();

            });
        });
        it('should respond with array containing jobs', function (done) {
            request(app)
            .get('/jobs')
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var resjob1 = res.body[0];
                expect(res.body.length).to.equal(1);
                expect(resjob1.id).to.equal(job.id);
                expect(resjob1.position_id).to.equal(job.position_id);
                expect(resjob1.title).to.equal(job.title);
                expect(resjob1.number_of_opening).to.equal(job.number_of_opening);
                expect(resjob1.intro).to.equal(job.intro);
                expect(resjob1.description).to.equal(job.description);
                expect(resjob1.specification).to.equal(job.specification);
                expect(resjob1.created_date).to.equal(job.created_date);
                expect(resjob1.valid_until).to.equal(job.valid_until);

                done();
            });
        });
    });
});

describe('Show job detail, Controller action show, GET /jobs/:id', function () {
    app.get('/jobs/:id', JobsController.show);

    describe('when job is present', function () {
        var job = {
            id: uuid.v1(),
            title: "Title 1",
            intro: "Job Intro 1",
            number_of_opening: "3",
            description: 'Description 1',
            specification: 'Specification 1',
            created_date: "2016-04-01T00:00:00.000Z",
            valid_until: "2016-05-01T00:00:00.000Z"
        };

        before(function () {
            var position = {
                id: uuid.v1(),
                title: 'Position 1',
                description: 'Description',
                specification: 'Specification'
            };
            return db('position').returning("id").insert(position).then(function (response) {
                job.position_id = response[0];
                db('job').insert(job).then();
            });
        });

        it('should respond with json containing job information', function (done) {
            request(app)
            .get('/jobs/' + job.id)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var responsejob = res.body;

                expect(responsejob.position_id).to.equal(job.position_id);
                expect(responsejob.number_of_opening).to.equal(job.number_of_opening);
                expect(responsejob.title).to.equal(job.title);
                expect(responsejob.intro).to.equal(job.intro);
                expect(responsejob.description).to.equal(job.description);
                expect(responsejob.specification).to.equal(job.specification);
                expect(responsejob.created_date).to.equal(job.created_date);
                expect(responsejob.valid_until).to.equal(job.valid_until);
                done();
            });
        });
    });

    describe('when job is not present', function () {
        var id = 9000;

        it('should respond with BAD_REQUEST', function (done) {
            request(app)
            .get('/jobs/' + id)
            .set('Accept', 'application/json')
            .expect(HttpStatus.BAD_REQUEST)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.error).to.equal("Can not fetch job with id: " + id);
                done();
            });
        });
    });
});

describe('Create new job, Controller action create, POST /jobs/', function () {
    app.use(require('body-parser').json());
    app.post('/jobs/', JobsController.create);

    describe('when job params are valid', function () {
        var jobParam = {
            title: "Title 1",
            intro: "Job Intro 1",
            number_of_opening: "3",
            description: 'Description 1',
            specification: 'Specification 1',
            created_date: "2016-04-01T00:00:00.000Z",
            valid_until: "2016-05-01T00:00:00.000Z"
        };

        before(function () {
            var position = {
                id: uuid.v1(),
                title: 'Position 1',
                description: 'Description',
                specification: 'Specification'
            };
            return db('position').returning("id").insert(position).then(function (response) {
                jobParam.position_id = response[0];
            }
            );
        });

        it('should create the a job and respond with json containing job information', function (done) {
            request(app)
            .post('/jobs')
            .send(jobParam)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                var responsejob = res.body;
                expect(responsejob.position_id).to.equal(jobParam.position_id);
                expect(responsejob.title).to.equal(jobParam.title);
                expect(responsejob.intro).to.equal(jobParam.intro);
                expect(responsejob.number_of_opening).to.equal(jobParam.number_of_opening);
                expect(responsejob.description).to.equal(jobParam.description);
                expect(responsejob.specification).to.equal(jobParam.specification);
                expect(responsejob.created_date).to.equal(jobParam.created_date);
                expect(responsejob.valid_until).to.equal(jobParam.valid_until);
                done();
            });
        });
    });

    describe('when job params title, description and specification field is empty', function () {
        var jobParam = {
            "title": '',
            "position_id": '',
            "intro": '',
            "number_of_opening": '',
            "description": '',
            "specification": '',
            "created_date": '',
            "valid_until": ''

        };

        it('should resond with error message on title field', function (done) {
            request(app)
            .post('/jobs')
            .send(jobParam)
            .set('Accept', 'application/json')
            .expect(HttpStatus.BAD_REQUEST)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.error.title).to.equal("Please provide job title.");
                done();
            });
        });
    });

});

describe('Update job, Controller action update, PUT /jobs/:id', function () {
    app.use(require('body-parser').json());
    app.put('/jobs/:id', JobsController.update);

    describe('when update job params are valid', function () {
        var job = {
            id: uuid.v1(),

            title: "Title 1",
            intro: "Job Intro 1",
            number_of_opening: "3",
            description: 'Description 1',
            specification: 'Specification 1',
            created_date: "2016-04-01T00:00:00.000Z",
            valid_until: "2016-05-01T00:00:00.000Z"
        };
        var updatedjob = {
            title: "Title 1 updated",
            intro: "Job Intro 1 updated",
            number_of_opening: "3",
            description: 'Description 1 updated',
            specification: 'Specification 1',
            created_date: "2016-04-01T00:00:00.000Z",
            valid_until: "2016-05-01T00:00:00.000Z"
        };

        before(function () {
            var position = {
                id: uuid.v1(),
                title: 'Position 1',
                description: 'Description',
                specification: 'Specification'
            };
            return db('position').returning("id").insert(position).then(function (response) {
                job.position_id = response[0];
                updatedjob.position_id = response[0];
                db('job').insert(job).then();

            });
        });

        it('should update the job and respond with json containing job updated information', function (done) {
            request(app)
            .put('/jobs/' + job.id)
            .send(updatedjob)
            .set('Accept', 'application/json')
            .expect(HttpStatus.OK)
            .end(function (err, res) {
                if (err) {
                    done(err);
                }
                expect(res.body.title).to.equal(updatedjob.title);
                expect(res.body.description).to.equal(updatedjob.description);
                expect(res.body.specification).to.equal(updatedjob.specification);
                done();
            });
        });
    });
});
