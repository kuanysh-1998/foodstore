import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean;
  constructor(private loadingService: LoadingService) {
    loadingService.isLoading.subscribe((isLoding) => {
      this.isLoading = isLoding;
    });
  }
  ngOnInit(): void {}
}
