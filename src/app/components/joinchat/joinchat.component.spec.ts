import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinchatComponent } from './joinchat.component';

describe('JoinchatComponent', () => {
  let component: JoinchatComponent;
  let fixture: ComponentFixture<JoinchatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JoinchatComponent]
    });
    fixture = TestBed.createComponent(JoinchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
