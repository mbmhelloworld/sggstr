import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { BookService } from '../../../../../services/book.service';
import { ToastComponent } from '../../../../../shared/toast/toast.component';
import { Book } from '../../../../../shared/models/book.model';
import { Creator } from '../../../../../shared/models/creator.model';
import { Genre } from '../../../../../shared/models/genre.model';
import { CreatorService } from '../../../../../services/creator.service';
import { GenreService } from '../../../../../services/genre.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})

export class AddBookComponent {
  @Input() books: Book[] = [];
  @Input() creators: Creator[] = [];
  @Input() genres: Genre[] = [];
  addBookForm: UntypedFormGroup;
  title = new UntypedFormControl('', Validators.required);
  creator = new UntypedFormControl('', Validators.required);
  genre = new UntypedFormControl('', Validators.required);
  buyLink = new UntypedFormControl('', Validators.required);
  cover = new UntypedFormControl('', Validators.required);

  constructor(private bookService: BookService,
              private creatorService: CreatorService,
              private genreService: GenreService,
              private formBuilder: UntypedFormBuilder,
              public toast: ToastComponent) {
    this.creatorService.getCreators().subscribe({
      next: data => this.creators = data,
      error: error => console.log(error),
      complete: () => true
    });
    this.genreService.getGenres().subscribe({
      next: data => this.genres = data,
      error: error => console.log(error),
      complete: () => true
    });
    this.addBookForm = this.formBuilder.group({
      title: this.title,
      creator: this.creator,
      genre: this.genre,
      buyLink: this.buyLink,
      cover: this.cover,
    });
  }

  addBook(): void {
    this.bookService.addBook(this.addBookForm.value).subscribe({
      next: res => {
        this.books.push(res);
        this.addBookForm.reset();
        this.toast.setMessage('Item added successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

}

