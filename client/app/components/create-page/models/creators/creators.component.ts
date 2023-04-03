import { Component, OnInit } from '@angular/core';

import { CreatorService } from '../../../../services/creator.service';
import { ToastComponent } from '../../../../shared/toast/toast.component';
import { Creator } from '../../../../shared/models/creator.model';

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.scss']
})
export class CreatorsComponent implements OnInit {

  creator = new Creator();
  creators: Creator[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private creatorService: CreatorService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getCreators();
  }

  getCreators(): void {
    this.creatorService.getCreators().subscribe({
      next: data => this.creators = data,
      error: error => console.log(error),
      complete: () => this.isLoading = false
    });
  }

  enableEditing(creator: Creator): void {
    this.isEditing = true;
    this.creator = creator;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.creator = new Creator();
    this.toast.setMessage('Item editing cancelled.', 'warning');
    this.getCreators();
  }

  editCreator(creator: Creator): void {
    this.creatorService.editCreator(creator).subscribe({
      next: () => {
        this.isEditing = false;
        this.creator = creator;
        this.toast.setMessage('Item edited successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

  deleteCreator(creator: Creator): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.creatorService.deleteCreator(creator).subscribe({
        next: () => {
          this.creators = this.creators.filter(elem => elem._id !== creator._id);
          this.toast.setMessage('Item deleted successfully.', 'success');
        },
        error: error => console.log(error)
      });
    }
  }

}
