import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { AppConfig } from 'src/app/config/app.config';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  public vendor:Vendor=new Vendor();
  private vcodeToEdit:String="";
  public imageShow:string|ArrayBuffer;
  public selectedFile:File;

  constructor(private router:Router, private route: ActivatedRoute, private vendorService:VendorService) { 
    this.vcodeToEdit=this.route.snapshot.params['vcode'];
    console.log("vcodeToEdit: "+this.vcodeToEdit);
  }

  ngOnInit() {
    this.vendor.vcode=this.vcodeToEdit;
    this.vendorService.findVendorByCode(this.vcodeToEdit).subscribe(data=>{
      for(var key in data) {
        this.vendor[key]=data[key];
      }
      this.imageShow=data.photo.substring(4, data.photo.length);
    });
  }

  editVendor() {
    console.log(this.vendor);
    this.vendorService.editVendor(this.vendor, this.selectedFile).subscribe(data =>{
      console.log(data);
    });
    this.router.navigate(['vendor-alist']);
  }

  public onFileChanged(event) : void {
    console.log("_________NAGENDRA____________");
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];

    //Below Code for image preview only ...this is not mandetory !!!
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
                      // reading selected image
      this.imageShow = (<FileReader>event.target).result;
      //this.imageShow = URL of the image
    }
  }

}
