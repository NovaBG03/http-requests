import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Post} from './post.model';
import {PostsService} from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error: string = null;

  constructor(private http: HttpClient, private postsService: PostsService) {
  }

  ngOnInit() {
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
        this.error = error.status + ' ' + error.statusText;
      });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts()
      .subscribe(() => this.loadedPosts = []);
  }

}
