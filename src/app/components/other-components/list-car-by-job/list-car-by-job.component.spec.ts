import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCarByJobComponent } from './list-car-by-job.component';

describe('ListCarByJobComponent', () => {
  let component: ListCarByJobComponent;
  let fixture: ComponentFixture<ListCarByJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCarByJobComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListCarByJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
