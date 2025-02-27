import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroesIdComponent } from './heroes-id.component';

describe('HeroesIdComponent', () => {
  let component: HeroesIdComponent;
  let fixture: ComponentFixture<HeroesIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeroesIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
