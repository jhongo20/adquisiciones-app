import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquisicionDashboardComponent } from './adquisicion-dashboard.component';

describe('AdquisicionDashboardComponent', () => {
  let component: AdquisicionDashboardComponent;
  let fixture: ComponentFixture<AdquisicionDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdquisicionDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdquisicionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
