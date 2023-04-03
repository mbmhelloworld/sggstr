import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FrontPageComponent } from './front-page.component';

describe('Component: frontPage', () => {
  let component: FrontPageComponent;
  let fixture: ComponentFixture<FrontPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('frontPage');
  });

});
