import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../shared/models/user.model';
import {BASE_URL} from '../params';
import {ObjectId} from 'bson';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(BASE_URL+'/api/user', user);
  }

  login(credentials: object): Observable<any> {
    return this.http.post(BASE_URL+'/api/login', credentials);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(BASE_URL+'/api/users');
  }

  countUsers(): Observable<number> {
    return this.http.get<number>(BASE_URL+'/api/users/count');
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(BASE_URL+'/api/user', user);
  }

  getUser(userId: ObjectId): Observable<User> {
    return this.http.get<User>(BASE_URL+`/api/user/${userId}`);
  }

  editUser(user: User): Observable<any> {
    return this.http.put(BASE_URL+`/api/user/${user._id}`, user, { responseType: 'text' });
  }

  deleteUser(user: User): Observable<any> {
    return this.http.delete(BASE_URL+`/api/user/${user._id}`, { responseType: 'text' });
  }

}
