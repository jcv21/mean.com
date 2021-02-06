import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-details-providers',
  templateUrl: './details-providers.component.html',
  styles: [
  ]
})
export class DetailsProvidersComponent implements OnInit {

  public providers: any;
  id!: any; // Service Provider's id from URL

  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => this.id = params.get('id') );

    this.providerService.getProvider(this.id)
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
