import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor';
import { VendorService } from 'src/app/services/vendor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  public vendor:Vendor=new Vendor();
  public message:String=""; 
  public selectedFile:File;
  public imageShow:string|ArrayBuffer;

  constructor(private vendorService:VendorService, private router:Router) { }

  ngOnInit() {
  }

  public addVendor(){
    console.log(this.vendor);
     this.vendorService.addVendor(this.vendor, this.selectedFile).subscribe(data =>{
        console.log(data);
        this.message="Vendor is uploaded!";
        this.router.navigate(['vendor-alist']);
     });

  }

  public onFileChanged(event) : void {
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
