import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConfig } from '../config/app.config';
import { Vendor } from '../model/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  endpoint:string = AppConfig.VENDOR_ENDPOINT;

  constructor(private http: HttpClient) { }
  
  public addVendor(vendor:Vendor, photo:File):Observable<any>{
    console.log("-----service layer method is called!!!!!!!!!!!");
    console.log(vendor);
    console.log(photo);
    const httpOptions = {headers:new HttpHeaders({'Content-Type':'application/json'})};

    let formdata: FormData = new FormData();
    formdata.append('vcode', vendor.vcode+"");
    formdata.append('name', vendor.name+'');
    formdata.append('email', vendor.email+'');
    formdata.append('mobile', vendor.mobile+'');
    formdata.append('comment', vendor.comment+'');
    formdata.append('address', vendor.address+'');
    formdata.append('photo', photo);

    //return this.http.post(this.endpoint,formdata,httpOptions);
    const req = new HttpRequest('POST', this.endpoint, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public findVendors():Observable<Vendor>{
    return this.http.get<Vendor>(this.endpoint);
  }

  public deleteVendor(vcode):Observable<any>{
    console.log("From Service Layer: ");
    return this.http.delete(this.endpoint);
  }

  public editVendor(vendor:Vendor, photo:File):Observable<any>{
    let formdata: FormData = new FormData();
    formdata.append('vcode', vendor.vcode+"");
    formdata.append('name', vendor.name+'');
    formdata.append('email', vendor.email+'');
    formdata.append('mobile', vendor.mobile+'');
    formdata.append('comment', vendor.comment+'');
    formdata.append('address', vendor.address+'');
    formdata.append('photo', photo);

    //return this.http.post(this.endpoint,formdata,httpOptions);
    const req = new HttpRequest('PATCH', this.endpoint, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }

  public imageLoader(vendor:Vendor):Observable<any>{
    const imageEndpoint = AppConfig.VENDOR_IMAGE_ENDPOINT+"?vcode="+vendor.vcode;
    return this.http.get(imageEndpoint);
  }

  public findVendorByCode(vcode:String):Observable<any>{
    let findendpoint=AppConfig.VENDOR_BY_CODE+'?vcode='+vcode;
    return this.http.get(findendpoint);
  }
}
