import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeCardComponent } from './youtube-card.component';

describe('YoutubeCardComponent', () => {
  let component: YoutubeCardComponent;
  let fixture: ComponentFixture<YoutubeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
