import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperDashboardComponent } from './shopkeeper-dashboard.component';

describe('ShopkeeperDashboardComponent', () => {
  let component: ShopkeeperDashboardComponent;
  let fixture: ComponentFixture<ShopkeeperDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopkeeperDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopkeeperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
