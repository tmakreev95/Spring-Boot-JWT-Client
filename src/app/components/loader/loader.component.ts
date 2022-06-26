import { Component, OnInit } from '@angular/core';

import { LoaderService } from '../../services/loader/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {
  //Loader props
  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  //Loader props

  isLoading: Subject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService){}
  
  ngOnInit() {
  }

}
