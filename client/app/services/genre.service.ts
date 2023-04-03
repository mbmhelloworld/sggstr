import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Genre } from '../shared/models/genre.model';
import {BASE_URL} from '../params';
import {ObjectId} from 'bson';

@Injectable()
export class GenreService {

  constructor(private http: HttpClient) { }

  getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(BASE_URL+'/api/genres');
  }

  countGenres(): Observable<number> {
    return this.http.get<number>(BASE_URL+'/api/genres/count');
  }

  addGenre(genre: Genre): Observable<Genre> {
    return this.http.post<Genre>(BASE_URL+'/api/genre', genre);
  }

  getGenre(id: ObjectId): Observable<Genre> {
    return this.http.get<Genre>(BASE_URL+`/api/genre/${id}`);
  }

  editGenre(genre: Genre): Observable<any> {
    return this.http.put(BASE_URL+`/api/genre/${genre._id}`, genre, { responseType: 'text' });
  }

  deleteGenre(genre: Genre): Observable<any> {
    return this.http.delete(BASE_URL+`/api/genre/${genre._id}`, { responseType: 'text' });
  }

}
