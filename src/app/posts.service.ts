import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {Post} from './post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  createAndStorePost(title: string, content: string) {
    const postData: Post = {title, content};
    this.http
      .post<{ name: string }>(
        'https://ng-course-project-d091d.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        this.error.next(error.status + ' ' + error.statusText);
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-course-project-d091d.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: new HttpParams()
            .append('print', 'pretty')
            .append('custom', 'key'),
        }
      )
      .pipe(map(responseData => {
          const array: Post[] = [];
          if (!responseData) {
            return array;
          }
          for (const key of Object.keys(responseData)) {
            if (responseData.hasOwnProperty(key)) {
              array.push({...responseData[key], id: key});
            }
          }
          return array;
        }),
        catchError(err => {
          // some logic
          return throwError(err);
        }));
  }

  deletePosts() {
    return this.http.delete('https://ng-course-project-d091d.firebaseio.com/posts.json');
  }
}
