import { Component, Input } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { CreatorService } from '../../../../../services/creator.service';
import { ToastComponent } from '../../../../../shared/toast/toast.component';
import { Creator } from '../../../../../shared/models/creator.model';

@Component({
  selector: 'app-add-creator',
  templateUrl: './add-creator.component.html',
  styleUrls: ['./add-creator.component.scss']
})

export class AddCreatorComponent {
  @Input() creators: Creator[] = [];

  addCreatorForm: UntypedFormGroup;
  lastName = new UntypedFormControl('', Validators.required);
  foreName = new UntypedFormControl('', Validators.required);
  origin = new UntypedFormControl('', Validators.required);

  constructor(private creatorService: CreatorService,
              private formBuilder: UntypedFormBuilder,
              public toast: ToastComponent) {
    this.addCreatorForm = this.formBuilder.group({
      lastName: this.lastName,
      foreName: this.foreName,
      origin: this.origin
    });
  }

  addCreator(): void {
    this.creatorService.addCreator(this.addCreatorForm.value).subscribe({
      next: res => {
        this.creators.push(res);
        this.addCreatorForm.reset();
        this.toast.setMessage('Item added successfully.', 'success');
      },
      error: error => console.log(error)
    });
  }

}
