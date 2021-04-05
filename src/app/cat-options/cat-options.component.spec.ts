import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatOptionsComponent } from './cat-options.component';

describe('CatOptionsComponent', () => {
  let component: CatOptionsComponent;
  let fixture: ComponentFixture<CatOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CatOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
