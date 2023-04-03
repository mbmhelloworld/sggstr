import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';

import { ToastComponent } from '../../../../../shared/toast/toast.component';
import { CreatorService } from '../../../../../services/creator.service';
import { AddCreatorComponent } from './add-creator.component';

class CreatorServiceMock { }

describe('Component: AddCreator', () => {
  let component: AddCreatorComponent;
  let fixture: ComponentFixture<AddCreatorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [ AddCreatorComponent ],
      providers: [
        ToastComponent, UntypedFormBuilder,
        { provide: CreatorService, useClass: CreatorServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Add new creator');
  });

  it('should display the add form', () => {
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputLastName, inputForeName, inputOrigin] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputLastName.nativeElement).toBeTruthy();
    expect(inputForeName.nativeElement).toBeTruthy();
    expect(inputOrigin.nativeElement).toBeTruthy();
    expect(inputLastName.nativeElement.value).toBeFalsy();
    expect(inputForeName.nativeElement.value).toBeFalsy();
    expect(inputOrigin.nativeElement.value).toBeFalsy();
    const btnAdd = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(btnAdd).toBeTruthy();
  });

});
