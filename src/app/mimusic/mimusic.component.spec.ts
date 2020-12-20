import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MimusicComponent } from './mimusic.component';

describe('MimusicComponent', () => {
  let component: MimusicComponent;
  let fixture: ComponentFixture<MimusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MimusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MimusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
