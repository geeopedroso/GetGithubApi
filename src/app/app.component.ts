import { GithubService } from './services/github.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private service: GithubService) {}
  item = "teste props";

  ngOnInit() {}
}
