import { Component, OnInit } from '@angular/core';
import { ShopkeeperService } from '../../providers/shopkeeper/shopkeeper.service';
import { AppConstants } from '../../constant'; 

@Component({
  selector: 'app-shopkeeper-dashboard',
  templateUrl: './shopkeeper-dashboard.component.html',
  styleUrls: ['./shopkeeper-dashboard.component.css']
})
export class ShopkeeperDashboardComponent implements OnInit {

  constructor(private shopkeeperService: ShopkeeperService) { }

  shopkeeper: any;
  ngOnInit() {
    this.getLoggedinShopkeeperDetails();
  }

  getLoggedinShopkeeperDetails() {
    this.shopkeeperService.getLoggedinShopkeeperProfile()
    .subscribe(result=> {
      this.shopkeeper = result.body;
      localStorage.setItem(AppConstants.LOGGEDIN_USER_ID_STORATE_NAME, this.shopkeeper._id);
    }, error=> {
      console.log('profile get error ' + error);
    })
  } 
}
