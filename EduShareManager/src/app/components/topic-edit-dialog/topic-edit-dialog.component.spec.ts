import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicEditDialogComponent } from './topic-edit-dialog.component';

describe('TopicEditDialogComponent', () => {
  let component: TopicEditDialogComponent;
  let fixture: ComponentFixture<TopicEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicEditDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
