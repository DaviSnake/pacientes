import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoComponent } from './nuevo.component';

describe('NuevoComponent', () => {
  let component: NuevoComponent;
  let fixture: ComponentFixture<NuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
