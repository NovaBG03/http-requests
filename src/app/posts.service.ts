import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {Post} from './post.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class PostsService {
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
      });
  }

  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>('https://ng-course-project-d091d.firebaseio.com/posts.json')
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
      }));
  }

  deletePosts() {
    return this.http.delete('https://ng-course-project-d091d.firebaseio.com/posts.json');
  }
}
