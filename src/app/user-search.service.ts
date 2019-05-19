import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserSearchService {
  url = 'https://core.blockstack.org/v1/search?query';
  constructor(
    private httpClient: HttpClient
  ) { }

  search(query: string) {
    return this.httpClient.get(`${this.url}=${query}`);
  }
}
