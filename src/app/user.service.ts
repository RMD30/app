import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  

getUser(): Observable<User[]> {
  return this.http.get<User[]>('/user');
}

addUser(user:User):Observable<User>{
  return this.http.post<User>(
    '/user',
    user,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
  });
}


updateUser(user:User, id:string):Observable<User>{
  return this.http.put<User>(
    '/user/' + id,
    user,{
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      })
  });
}

deleteUser(id:string){
  return this.http.delete(
    '/user/' + id);
}

}
