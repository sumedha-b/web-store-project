import { Component, OnInit, ViewChild } from '@angular/core';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { EditVendorComponent } from '../edit-vendor/edit-vendor.component';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  public vendorList:Vendor[]=[];

  constructor(private vendorService:VendorService) { }

  ngOnInit() {
    this.vendorService.findVendors().subscribe(data => {
      for(var key in data) {
        this.vendorList.push(data[key]);
      }
    });
  }

  onNotifyForDelete(vendorcode:string):void {
    this.vendorService.deleteVendor(vendorcode).subscribe(data => {
      console.log(data);
      if(data.status=='success'){
        this.vendorList=this.vendorList.filter(v=>v.vcode!==vendorcode);
        console.log(this.vendorList);
      }
    });
  }
}
