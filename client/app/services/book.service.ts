import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EMPTY, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import { Book } from '../shared/models/book.model';
import { BASE_URL } from '../params';
import { ObjectId } from 'bson';
import {Creator} from '../shared/models/creator.model';
import {Genre} from '../shared/models/genre.model';
import {CreatorService} from './creator.service';
import {GenreService} from './genre.service';

@Injectable()
export class BookService {

  creator = new Creator();
  genre = new Genre();
  creators: Creator[] = [];
  genres: Genre[] = [];
  constructor(private http: HttpClient,
              private creatorService: CreatorService,
              private genreService: GenreService,) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(BASE_URL+'/api/books');
  }

  countBooks(): Observable<number> {
    return this.http.get<number>(BASE_URL+'/api/books/count');
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(BASE_URL+'/api/book', book);
  }

  getBook(id: ObjectId): Observable<Book> {
    return this.http.get<Book>(BASE_URL+`/api/book/${id}`);
  }

  editBook(book: Book): Observable<any> {
    return this.http.put(BASE_URL+`/api/book/${book._id}`, book, { responseType: 'text' });
  }

  deleteBook(book: Book): Observable<any> {
    return this.http.delete(BASE_URL+`/api/book/${book._id}`, { responseType: 'text' });
  }

  getMappedBooks(books: Book[]): Observable<any> {
    const genreObservable = this.genreService.getGenres();
    const creatorObservable = this.creatorService.getCreators();

    return forkJoin([genreObservable, creatorObservable]).pipe(
      switchMap(([genres, creators]) => {
        // Add genre and creator information to the books
        const booksWithInfo = books.map(book => ({
          ...book,
          genre: genres.find(g => g._id?.toString() === book.genre?.toString()),
          creator: creators.find(c => c._id?.toString() === book.creator?.toString())
        }));

        // Map the books to the desired format
        const mappedBooks = booksWithInfo.map(book => ({
          _id: book._id?.toString(),
          title: book.title,
          creator: book.creator,
          genre: book.genre,
          buyLink: book.buyLink,
          cover: book.cover,
        }));

        return of(mappedBooks);
      })
    );
  }

  // getMappedBooks(data: Book[]): Observable<any> {
  //   const creatorObservables = data.map(book => this.getBookCreator(new ObjectId(book.creator?._id?.toString())));
  //   const genreObservables = data.map(book => this.getBookGenre(new ObjectId(book.genre?._id?.toString())));
  //   return forkJoin([...creatorObservables,...genreObservables]).pipe(
  //     map(results => {
  //       const creators = results.slice(0, creatorObservables.length);
  //       const genres = results.slice(genreObservables.length);
  //       return data.map((book: Book, index: number) => ({
  //         _id: book._id?.toString(),
  //         title: book.title,
  //         creator: creators[index],
  //         genre: genres[index],
  //         buyLink: book.buyLink,
  //         cover: book.cover,
  //       }));
  //     })
  //   );
  // }

  getBookCreator(creatorId: ObjectId): Observable<Creator> {
    if (!creatorId) {
      return EMPTY;
    }
    return this.creatorService.getCreator(new ObjectId(creatorId)).pipe(
      map(creator => {
        this.creator = creator;
        return creator;
      })
    );
  }

  getBookGenre(genreId: ObjectId): Observable<Genre> {
    if (!genreId) {
      return EMPTY;
    }
    return this.genreService.getGenre(new ObjectId(genreId)).pipe(
      map(genre => {
        this.genre = genre;
        return genre;
      })
    );
  }

}
