import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { GenreService } from '../../../../../services/genre.service';
import { ToastComponent } from '../../../../../shared/toast/toast.component';
import { Genre } from '../../../../../shared/models/genre.model';

@Component({
  selector: 'app-add-genre',
  templateUrl: './add-genre.component.html',
  styleUrls: ['./add-genre.component.scss']
})

export class AddGenreComponent {
  @Input() genres: Genre[] = [];

  addGenreForm: UntypedFormGroup;
  name = new UntypedFormControl('', Validators.required);

  constructor(private genreService: GenreService,
              private formBuilder: UntypedFormBuilder,
              public toast: ToastComponent) {
    this.addGenreForm = this.formBuilder.group({
      name: this.name,
    });
  }

  addGenre(): void {
    this.genreService.addGenre(this.addGenreForm.value).subscribe({
      next: res => {
        this.genres.push(res);
        this.addGenreForm.reset();
        this.toast.setMessage('Item added successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

}
