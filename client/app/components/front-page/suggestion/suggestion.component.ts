import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { Post } from '../../../shared/models/post.model';
import { Genre } from '../../../shared/models/genre.model';
import { Book } from '../../../shared/models/book.model';
import { Creator } from '../../../shared/models/creator.model';
import {switchMap} from 'rxjs';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  post = new Post();
  genre = new Genre();
  book = new Book();
  creator = new Creator();
  posts: Post[] = [];
  genres: Genre[] = [];
  books: Book[] = [];
  creators: Creator[] = [];
  isLoading = true;
  currentUser = this.auth.getCurrentUser();
  constructor(private postService: PostService,
              public auth: AuthService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getSuggs();

  }

  getSuggs(): void {
    this.isLoading = true;
    this.postService.getPosts().pipe(
      switchMap(data => this.postService.getMappedPosts(data))
    ).subscribe({
      next: posts => this.posts = posts,
      error: error => console.log(error),
      complete: () => this.isLoading = false,
    });
  }

  upVote(post: Post): void {
    if (post._id != null && this.currentUser._id != null) {
      this.postService.upVote(post._id, this.currentUser._id);
    }
  }

  downVote(post: Post): void {
    if (post._id != null && this.currentUser._id != null) {
      this.postService.downVote(post._id, this.currentUser._id);
    }
  }
  createComment(post: Post): void {
    this.post = post;
  }
}
