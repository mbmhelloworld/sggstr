import {Book} from './book.model';
import {User} from './user.model';

export class Post {
  _id?: string;
  title?: string;
  text?: string;
  upVotes?: number;
  downVotes?: number;
  book?: Book;

  user?: User;
}
