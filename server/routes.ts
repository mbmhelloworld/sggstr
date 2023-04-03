import { Router, Application } from 'express';
import BookCtrl from './controllers/book';
import CreatorCtrl from './controllers/creator';
import GenreCtrl from './controllers/genre';
import PostCtrl from './controllers/post';
import UserCtrl from './controllers/user';

const setRoutes = (app: Application): void => {
  const router = Router();
  const bookCtrl = new BookCtrl();
  const creatorCtrl = new CreatorCtrl();
  const genreCtrl = new GenreCtrl();
  const postCtrl = new PostCtrl();
  const userCtrl = new UserCtrl();

  // book
  router.route('/books').get(bookCtrl.getAll);
  router.route('/books/count').get(bookCtrl.count);
  router.route('/book').post(bookCtrl.insert);
  router.route('/book/:id').get(bookCtrl.get);
  router.route('/book/:id').put(bookCtrl.update);
  router.route('/book/:id').delete(bookCtrl.delete);

  // creator
  router.route('/creators').get(creatorCtrl.getAll);
  router.route('/creators/count').get(creatorCtrl.count);
  router.route('/creator').post(creatorCtrl.insert);
  router.route('/creator/:id').get(creatorCtrl.get);
  router.route('/creator/:id').put(creatorCtrl.update);
  router.route('/creator/:id').delete(creatorCtrl.delete);

  // genre
  router.route('/genres').get(genreCtrl.getAll);
  router.route('/genres/count').get(genreCtrl.count);
  router.route('/genre').post(genreCtrl.insert);
  router.route('/genre/:id').get(genreCtrl.get);
  router.route('/genre/:id').put(genreCtrl.update);
  router.route('/genre/:id').delete(genreCtrl.delete);

  // post
  router.route('/posts').get(postCtrl.getAll);
  router.route('/posts/count').get(postCtrl.count);
  router.route('/post').post(postCtrl.insert);
  router.route('/post/:id').get(postCtrl.get);
  router.route('/post/:id').put(postCtrl.update);
  router.route('/post/:id').delete(postCtrl.delete);

  // user
  router.route('/login').post(userCtrl.login);
  router.route('/users').get(userCtrl.getAll);
  router.route('/users/count').get(userCtrl.count);
  router.route('/user').post(userCtrl.insert);
  router.route('/user/:id').get(userCtrl.get);
  router.route('/user/:id').put(userCtrl.update);
  router.route('/user/:id').delete(userCtrl.delete);

  // Apply the routes
  app.use('/api', router);

};

export default setRoutes;
