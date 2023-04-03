import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Creator } from '../shared/models/creator.model';
import {BASE_URL} from '../params';
import {ObjectId} from 'bson';

@Injectable()
export class CreatorService {

  constructor(private http: HttpClient) { }

  getCreators(): Observable<Creator[]> {
    return this.http.get<Creator[]>(BASE_URL+'/api/creators');
  }

  countCreators(): Observable<number> {
    return this.http.get<number>(BASE_URL+'/api/creators/count');
  }

  addCreator(creator: Creator): Observable<Creator> {
    return this.http.post<Creator>(BASE_URL+'/api/creator', creator);
  }

  getCreator(id: ObjectId): Observable<Creator> {
    return this.http.get<Creator>(BASE_URL+`/api/creator/${id}`);
  }

  editCreator(creator: Creator): Observable<any> {
    return this.http.put(BASE_URL+`/api/creator/${creator._id}`, creator, { responseType: 'text' });
  }

  deleteCreator(creator: Creator): Observable<any> {
    return this.http.delete(BASE_URL+`/api/creator/${creator._id}`, { responseType: 'text' });
  }

}
