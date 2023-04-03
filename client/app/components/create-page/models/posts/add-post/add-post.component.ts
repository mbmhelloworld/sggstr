import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { PostService } from '../../../../../services/post.service';
import { ToastComponent } from '../../../../../shared/toast/toast.component';
import { Post } from '../../../../../shared/models/post.model';
import { Book } from '../../../../../shared/models/book.model';
import { AuthService } from '../../../../../services/auth.service';
import { BookService } from '../../../../../services/book.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})

export class AddPostComponent {
  @Input() posts: Post[] = [];
  @Input() books: Book[] = [];
  addPostForm: UntypedFormGroup;
  title = new UntypedFormControl('', Validators.required);
  text = new UntypedFormControl('', Validators.required);
  book = new UntypedFormControl('', Validators.required);

  constructor(private postService: PostService,
              private bookService: BookService,
              private authService: AuthService,
              private formBuilder: UntypedFormBuilder,
              public toast: ToastComponent) {
    this.bookService.getBooks().subscribe({
      next: data => this.books = data,
      error: error => console.log(error),
      complete: () => true
    });
    this.addPostForm = this.formBuilder.group({
      title: this.title,
      text: this.text,
      book: this.book,
      user: this.authService.getCurrentUser(),
    });
  }

  addPost(): void {
    this.postService.addPost(this.addPostForm.value).subscribe({
      next: res => {
        this.posts.push(res);
        this.addPostForm.reset();
        this.toast.setMessage('Item added successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

}
