var should = require('should'),
    request = require('supertest'),
    app = require('../../../../server');

describe('Person Router Tests:', function () {

    it('should execute workflow', function (done) {
        var timestamp = new Date().getTime(), id, savedAt;
        /********** create person *************/
        request(app)
            .post('/api/persons')
            .set('Accept', 'application/json')
            .send({lastname: "thelastname",place: "theplace", email: timestamp + '@swissonline.ch'})
            .expect('Content-Type', 'application/json')
            .expect(200)
            .end(function (err, response) {
                if (err) {
                    throw err;
                }
                id = response.body._id;
                savedAt = response.body.savedAt;
                should.not.exist(err);
                should.equal(response.body.email, timestamp + '@swissonline.ch');
                /********** get created person *************/
                request(app)
                    .get('/api/persons/' + id)
                    .expect('Content-Type', 'application/json')
                    .expect(200)
                    .end(function (err, response) {
                        if (err) {
                            throw err;
                        }
                        should.not.exist(err);
                        should.equal(response.body.email, timestamp + '@swissonline.ch');
                        /********** update person *************/
                        request(app)
                            .put('/api/persons/' + id)
                            .set('Accept', 'application/json')
                            .send({email: timestamp + 'loetupdated@swissonline.ch', savedAt: savedAt})
                            .expect('Content-Type', 'application/json')
                            .expect(200)
                            .end(function (err, response) {
                                if (err) {
                                    throw err;
                                }
                                should.not.exist(err);
                                should.equal(response.body.email, timestamp + 'loetupdated@swissonline.ch');
                                /********** remove person *************/
                                request(app)
                                    .delete('/api/persons/' + id)
                                    .expect(200)
                                    .end(function (err, response) {
                                        if (err) {
                                            throw err;
                                        }
                                        should.not.exist(err);
                                        should.equal(response.body.n, 1);
                                        done();
                                    });
                            })
                    });
            });
    });
});