import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquisicionFilterComponent } from './adquisicion-filter.component';

describe('AdquisicionFilterComponent', () => {
  let component: AdquisicionFilterComponent;
  let fixture: ComponentFixture<AdquisicionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdquisicionFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdquisicionFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
