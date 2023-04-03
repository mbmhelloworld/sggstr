import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { describe, it } from 'mocha';

process.env.NODE_ENV = 'test';
import { app } from '../app';
import Book from '../models/book';
import Creator from '../models/creator';
import Genre from '../models/genre';

chai.use(chaiHttp).should();

describe('Book', () => {

  beforeEach(done => {
    Book.deleteMany({}, () => {
      done();
    });
  });

  describe('Backend tests for books', () => {

    it('should get all the books', done => {
      chai.request(app)
        .get('/api/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });

    it('should get books count', done => {
      chai.request(app)
        .get('/api/books/count')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('number');
          res.body.should.be.eql(0);
          done();
        });
    });

    it('should create new book', done => {
      const genre = new Genre ({name: 'Crime'});
      const creator = new Creator({lastName: 'Writer' , foreName: 'Steven', origin: 'Germany' });
      const book = new Book({ title: 'A Book', creator, genre ,link: 'www.google.com' });
      chai.request(app)
        .post('/api/book')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.a.property('title');
          res.body.should.have.a.property('creator');
          res.body.should.have.a.property('genre');
          res.body.should.have.a.property('link');
          done();
        });
    });

    it('should get a book by its id', done => {
      const genre = new Genre ({name: 'Crime'});
      const creator = new Creator({lastName: 'Writer' , foreName: 'Steven', origin: 'Germany' });
      const book = new Book({ title: 'A Book', creator, genre ,link: 'www.google.com' });
      book.save((error, newBook) => {
        chai.request(app)
          .get(`/api/book/${newBook.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.a.property('title');
            res.body.should.have.a.property('creator');
            res.body.should.have.a.property('genre');
            res.body.should.have.a.property('link');
            res.body.should.have.property('_id').eql(newBook.id);
            done();
          });
      });
    });

    it('should update a book by its id', done => {
      const genre = new Genre ({name: 'Crime'});
      const creator = new Creator({lastName: 'Writer' , foreName: 'Steven', origin: 'Germany' });
      const book = new Book({ title: 'A Book', creator, genre ,link: 'www.google.com' });
      book.save((error, newBook) => {
        chai.request(app)
          .put(`/api/book/${newBook.id}`)
          .send({ weight: 5 })
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });

    it('should delete a book by its id', done => {
      const genre = new Genre ({name: 'Crime'});
      const creator = new Creator({lastName: 'Writer' , foreName: 'Steven', origin: 'Germany' });
      const book = new Book({ title: 'A Book', creator, genre ,link: 'www.google.com' });
      book.save((error, newBook) => {
        chai.request(app)
          .del(`/api/book/${newBook.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });

});


