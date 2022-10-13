import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetupsComponent } from './my-meetups.component';

describe('MyMeetupsComponent', () => {
  let component: MyMeetupsComponent;
  let fixture: ComponentFixture<MyMeetupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMeetupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
