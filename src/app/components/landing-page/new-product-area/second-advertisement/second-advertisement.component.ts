import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/model/advertisement';
import { AdvertisementService } from 'src/app/services/advertisement.service';
import { SlideshowModule } from 'ng-simple-slideshow';
import { IImage } from '../../../../model/iimage';

@Component({
  selector: 'app-second-advertisement',
  templateUrl: './second-advertisement.component.html',
  styleUrls: ['./second-advertisement.component.css']
})
export class SecondAdvertisementComponent implements OnInit {

  private adLoaded:Promise<Boolean>;
  private size=4;
  private imageSources:(string | IImage)[] = [];

  constructor(private adService:AdvertisementService) { }

  ngOnInit() {
    this.getAd("A250");
    this.getAd("A251");
    this.getAd("A252");
    this.getAd("A253");

    
  }

  getAd(id) {
    this.adService.findAdById(id).subscribe(data=>{
      var iimage:IImage={ url:data.imageUrl, href:'#' };
      this.imageSources.push(iimage);
      console.log(this.imageSources);
      --this.size;
      if (this.size==0) {
        this.adLoaded=Promise.resolve(true);
      }
    });
  }

}
