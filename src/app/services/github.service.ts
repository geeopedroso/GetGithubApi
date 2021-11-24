import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>('https://api.github.com/users').pipe(
      map((users) => users.sort((userA:any, userB:any) => this.ordenaPorCodigo(userA, userB))
      )
    );
  }

  private ordenaPorCodigo(userA: any, userB: any) {
    if (userA.login.toLowerCase() > userB.login.toLowerCase()) {
      return 1;
    }

    if (userA.login.toLowerCase() < userB.login.toLowerCase()) {
      return -1;
    }

    return 0;
  }
}
