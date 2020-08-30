import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

import {Post} from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: string = null;
  errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
    this.errorSub = this.postsService.error
      .subscribe(errorMessage => {
        this.error = errorMessage;
      });

    this.onFetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts()
      .subscribe(posts => {
        this.loadedPosts = posts;
        this.isFetching = false;
      }, error => {
        this.loadedPosts = [];
        this.error = error.status + ' ' + error.statusText;
        this.isFetching = false;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => this.loadedPosts = []);
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }

  onHandleError() {
    this.error = null;
  }
}
