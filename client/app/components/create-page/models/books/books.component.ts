import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/book.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Book } from '../../../../shared/models/book.model';
import { Creator } from '../../../../shared/models/creator.model';
import { Genre } from '../../../../shared/models/genre.model';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  book = new Book();
  creator = new Creator();
  genre = new Genre();
  books: Book[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private bookService: BookService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.isLoading = true;
    this.bookService.getBooks().pipe(
      switchMap(data => this.bookService.getMappedBooks(data))
    ).subscribe({
      next: books => this.books = books,
      error: error => console.log(error),
      complete: () => this.isLoading = false,
    });
  }

  enableEditing(book: Book): void {
    this.isEditing = true;
    this.book = book;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.book = new Book();
    this.toast.setMessage('Item editing cancelled.', 'warning');
    this.getBooks();
  }

  editBook(book: Book): void {
    this.bookService.editBook(book).subscribe({
      next: () => {
        this.isEditing = false;
        this.book = book;
        this.toast.setMessage('Item edited successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

  deleteBook(book: Book): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.bookService.deleteBook(book).subscribe({
        next: () => {
          this.books = this.books.filter(elem => elem._id !== book._id);
          this.toast.setMessage('Item deleted successfully.', 'success');
        },
        error: error => console.log(error)
      });
    }
  }
}
