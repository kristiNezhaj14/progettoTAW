import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupchatComponent } from './groupchat.component';

describe('GroupchatComponent', () => {
  let component: GroupchatComponent;
  let fixture: ComponentFixture<GroupchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroupchatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
