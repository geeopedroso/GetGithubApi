import { switchMap, map, debounceTime,filter,distinctUntilChanged } from 'rxjs/operators';
import { GithubService } from 'src/app/services/github.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';

const ESPERA_DIGITACAO = 300;
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  queryField = new FormControl();

  allUsers$ = this.service.getData();

  filteredUsers$ = this.queryField.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.service.getData().pipe(
        map((users) =>
          users.filter((user: any) => {
            return (user.login.toLowerCase().indexOf(valorDigitado?.toLowerCase()) > -1);
          })
        )
      )
    )
  );

  users$ = merge(this.allUsers$, this.filteredUsers$);

  constructor(private service: GithubService) {}
}
