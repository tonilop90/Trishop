import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:5000/users';

  constructor(private http: HttpClient) {
  }

  signUser(data: { name: string, password: string, email: string }, callback: (response: any) => any = null) {
    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'text/plain',
    });
    return this.http.post<{ _id: any }>(`${this.url}/signup`, JSON.stringify(data), {
      headers
    }).subscribe(response => {
      localStorage.setItem('user', JSON.stringify(response));
      if (callback) callback(response);
    }, e => {
      console.error(e)
    })
  }

  logUser(user: { name: string, password: string }, callback: (response: any) => any = null) {
    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'text/plain',
    });
    return this.http.post<{ _id: any; }>(`${this.url}/login`, JSON.stringify(user), {
      headers
    }).subscribe((response: any) => {
      if (response.login) {
        localStorage.setItem('user', JSON.stringify(response));
      } else {
        alert('El usuario no es correcto')
      }
      if (callback) callback(response);

    }, e => {
      console.error(e)
    });
  }

  getUser(): any {
    const user = localStorage.getItem("user");
    let userObj = null;
    if (user) {
      userObj = JSON.parse(user)
    }
    return userObj;
  }

  getOrders(userId: any) {
    return this.http.get(`http://localhost:5000/users/${userId}/orders`)
  }

  addOrder(pedido: any, callback: (response: any) => any = null) {
    let headers = new HttpHeaders({
      'Accept': '*/*',
      'Content-Type': 'text/plain',
    });
    return this.http.post(`${this.url}/setOrder`, JSON.stringify(pedido), {
      headers
    }).subscribe((response: any) => {
      if (callback) callback(response);
    }, e => {
      console.error(e)
    });

  }
}
