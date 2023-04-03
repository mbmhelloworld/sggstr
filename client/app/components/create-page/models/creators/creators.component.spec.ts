import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../../../../shared/toast/toast.component';
import { CreatorService } from '../../../../services/creator.service';
import { CreatorsComponent } from './creators.component';
import { of, Observable } from 'rxjs';

class CreatorServiceMock {
  mockCreators = [
    { lastName: 'Peterson',foreName: 'Peter', origin: 'Finland'},
    { lastName: 'Lederson',foreName: 'Leder', origin: 'Norway'},
  ];
  getCreators(): Observable<object[]> {
    return of(this.mockCreators);
  }
}

describe('Component: Creators', () => {
  let component: CreatorsComponent;
  let fixture: ComponentFixture<CreatorsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ CreatorsComponent ],
      providers: [
        ToastComponent, UntypedFormBuilder,
        { provide: CreatorService, useClass: CreatorServiceMock }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current creators (2)');
  });

  it('should display the text for no creators', () => {
    component.creators = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current creators (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no creators in the DB. Add a new creator below.');
  });

  it('should display current creators', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('Creator 1');
    expect(tds[1].nativeElement.textContent).toContain('1');
    expect(tds[2].nativeElement.textContent).toContain('2');
    expect(tds[4].nativeElement.textContent).toContain('creator 2');
    expect(tds[5].nativeElement.textContent).toContain('3');
    expect(tds[6].nativeElement.textContent).toContain('4.2');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.creator = { lastName: 'Pan', foreName: 'Peter', origin: 'Nimmerland' };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputLastName, inputForeName, inputOrigin] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputLastName.nativeElement.value).toContain('Pan');
    expect(inputForeName.nativeElement.value).toContain('Peter');
    expect(inputOrigin.nativeElement.value).toContain('Nimmerland');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
