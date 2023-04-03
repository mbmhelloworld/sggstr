import { Component, OnInit } from '@angular/core';

import { GenreService } from '../../../../services/genre.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Genre } from '../../../../shared/models/genre.model';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  genre = new Genre();
  genres: Genre[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private genreService: GenreService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres(): void {
    this.genreService.getGenres().subscribe({
      next: data => this.genres = data,
      error: error => console.log(error),
      complete: () => this.isLoading = false
    });
  }

  enableEditing(genre: Genre): void {
    this.isEditing = true;
    this.genre = genre;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.genre = new Genre();
    this.toast.setMessage('Item editing cancelled.', 'warning');
    this.getGenres();
  }

  editGenre(genre: Genre): void {
    this.genreService.editGenre(genre).subscribe({
      next: () => {
        this.isEditing = false;
        this.genre = genre;
        this.toast.setMessage('Item edited successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

  deleteGenre(genre: Genre): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.genreService.deleteGenre(genre).subscribe({
        next: () => {
          this.genres = this.genres.filter(elem => elem._id !== genre._id);
          this.toast.setMessage('Item deleted successfully.', 'success');
        },
        error: error => console.log(error)
      });
    }
  }

}
