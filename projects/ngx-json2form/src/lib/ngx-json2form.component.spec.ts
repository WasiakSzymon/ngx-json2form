import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJson2formComponent } from './ngx-json2form.component';

describe('NgxJson2formComponent', () => {
  let component: NgxJson2formComponent;
  let fixture: ComponentFixture<NgxJson2formComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxJson2formComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxJson2formComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
