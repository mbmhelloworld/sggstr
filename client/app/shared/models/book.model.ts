import {Creator} from './creator.model';
import {Genre} from './genre.model';

export class Book {
  _id?: string;
  title?: string;
  creator?: Creator;
  genre?: Genre;
  buyLink?: URL;
  cover?: string;
}
