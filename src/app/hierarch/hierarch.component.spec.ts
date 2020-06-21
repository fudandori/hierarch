import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchComponent } from './hierarch.component';

describe('HierarchComponent', () => {
  let component: HierarchComponent;
  let fixture: ComponentFixture<HierarchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
