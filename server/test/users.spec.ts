import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import User from '../models/user';

chai.use(chaiHttp).should();

describe('Users', () => {

  beforeEach(done => {
    User.deleteMany({}, err => {
      done();
    });
  });

  describe('tests for users', () => {

    it('get all the users', done => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('get users count', done => {
      chai.request(app)
        .get('/api/users/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('create new user', done => {
      const user = new User({ username: 'Peter', email: 'P@eter.com', role: 'user' });
      chai.request(app)
        .post('/api/user')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('username');
          res.body.should.have.a.property('email');
          res.body.should.have.a.property('role');
          done();
        });
    });

    it('get a user by its id', done => {
      const user = new User({ username: 'User', email: 'user@user.com', role: 'user' });
      user.save((error, newUser) => {
        chai.request(app)
          .get(`/api/user/${newUser.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username');
            res.body.should.have.property('email');
            res.body.should.have.property('role');
            res.body.should.have.property('_id').eql(newUser.id);
            done();
          });
      });
    });

    it('update a user by its id', done => {
      const user = new User({ username: 'User', email: 'user@user.com', role: 'user' });
      user.save((error, newUser) => {
        chai.request(app)
          .put(`/api/user/${newUser.id}`)
          .send({ username: 'User 2' })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('delete a user by its id', done => {
      const user = new User({ username: 'User', email: 'user@user.com', role: 'user' });
      user.save((error, newUser) => {
        chai.request(app)
          .del(`/api/user/${newUser.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


