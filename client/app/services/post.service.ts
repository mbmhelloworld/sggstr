import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EMPTY, forkJoin, map, Observable, of, switchMap} from 'rxjs';
import { Post } from '../shared/models/post.model';
import {BASE_URL} from '../params';
import {ObjectId} from 'bson';
import {Book} from '../shared/models/book.model';
import {User} from '../shared/models/user.model';
import {BookService} from './book.service';
import {UserService} from './user.service';
import {CreatorService} from './creator.service';
import {GenreService} from './genre.service';

@Injectable()
export class PostService {
  user = new User();
  book = new Book();
  post = new Post();
  constructor(private http: HttpClient,
              private bookService: BookService,
              private creatorService: CreatorService,
              private genreService: GenreService,
              private userService: UserService, ) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(BASE_URL+'/api/posts');
  }

  countPosts(): Observable<number> {
    return this.http.get<number>(BASE_URL+'/api/posts/count');
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(BASE_URL+'/api/post', post);
  }

  getPost(id: ObjectId): Observable<Post> {
    return this.http.get<Post>(`${BASE_URL}/api/post/${id}`);
  }

  editPost(post: Post): Observable<any> {
    return this.http.put(`${BASE_URL}/api/post/${post._id}`, post, { responseType: 'text' });
  }

  deletePost(post: Post): Observable<any> {
    return this.http.delete(`${BASE_URL}/api/post/${post._id}`, { responseType: 'text' });
  }

  upVote(postId: string, userId: string) {
    const url = `${BASE_URL}/posts/${postId}/upvote`;
    return this.http.post(url, { userId });
  }

  downVote(postId: string, userId: string) {
    const url = `${BASE_URL}/posts/${postId}/downvote`;
    return this.http.post(url, { userId });
  }

  getMappedPosts(data: Post[]): Observable<any> {
    const genreObservable = this.genreService.getGenres();
    const creatorObservable = this.creatorService.getCreators();
    const booksObservable = this.bookService.getBooks();

    return forkJoin([genreObservable, creatorObservable, booksObservable]).pipe(
      switchMap(([genres, creators, books]) => {
        // Add genre and creator information to the books
        const booksWithInfo = books.map(book => ({
          ...book,
          genre: genres.find(g => g._id?.toString() === book.genre?.toString()),
          creator: creators.find(c => c._id?.toString() === book.creator?.toString())
        }));

        // Call getMappedBooks with the booksWithInfo array
        return this.bookService.getMappedBooks(booksWithInfo).pipe(
          switchMap(mappedBooks => {
            const userObservables = data.map(post => this.getPostsUser(new ObjectId(post.user?.toString())));
            return forkJoin([...userObservables, of(mappedBooks)]).pipe(
              map(results => {
                const users = results.slice(0, userObservables.length);
                const mappedBooksResult = results[results.length - 1];
                return data.map((post: Post, index: number) => ({
                  _id: post._id?.toString(),
                  title: post.title,
                  text: post.text,
                  upVotes: post.upVotes,
                  downVotes: post.downVotes,
                  book: mappedBooksResult[index],
                  user: users[index],
                }));
              })
            );
          })
        );
      })
    );
  }

  getPostsBook(bookId: ObjectId): Observable<Book> {
    if (!bookId) {
      return EMPTY;
    }
    return this.bookService.getBook(new ObjectId(bookId)).pipe(
      map(book => {
        this.book = book;
        return book;
      })
    );
  }

  getPostsUser(userId: ObjectId): Observable<User> {
    if (!userId) {
      return EMPTY;
    }
    return this.userService.getUser(new ObjectId(userId)).pipe(
      map(user => {
        this.user = user;
        return user;
      })
    );
  }

}
