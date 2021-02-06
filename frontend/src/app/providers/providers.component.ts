import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styles: [
  ]
})
export class ProvidersComponent implements OnInit {

  public providers!: any;
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.providerService.getProviders()
      .subscribe(
        data => {
          this.providers = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
