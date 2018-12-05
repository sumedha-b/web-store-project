import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vendor } from 'src/app/model/vendor';
import { Router } from '@angular/router';
import { Binary } from '@angular/compiler';
import { VendorService } from 'src/app/services/vendor.service';
import { Observable } from 'rxjs';
import { AppConfig } from 'src/app/config/app.config';
import { APP_ROOT } from '@angular/core/src/di/scope';

@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.css']
})
export class VendorDetailsComponent implements OnInit {

  @Input("pitem")
  vendorDetails:Vendor;

  public imageUri:string="";
  public root:string="/Users/sumedhabalusu/Documents/my-node-workspace/ecommer-code-dynamic-dashboard";

  @Output()
  notifyForDelete: EventEmitter<string> = new EventEmitter<string>();

  constructor(private router:Router, private service:VendorService) { 
    
  }

  ngOnInit() { 
    this.imageUri=this.vendorDetails.photo.substring(4, this.vendorDetails.photo.length);
    console.log(this.imageUri);
    // this.service.imageLoader(this.vendorDetails).subscribe(data=>{
    //   this.image=data;
    //   console.log(this.image);
    // });
  }
  
  public deleteVendor():void {
    this.notifyForDelete.emit(this.vendorDetails.vcode.toString());
  }

  public editVendor():void {
    this.router.navigate(['edit-vendor', {vcode:this.vendorDetails.vcode}]);
  }
}
