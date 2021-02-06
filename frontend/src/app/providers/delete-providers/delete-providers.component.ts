import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-delete-providers',
  templateUrl: './delete-providers.component.html',
  styles: [
  ]
})
export class DeleteProvidersComponent implements OnInit {

  id: any;
  company!: string ;
  isDeleted: boolean = false;
  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe( params => this.id = params.get('id') );
    this.deleteRecord();
  }

  deleteRecord(){
    this.providerService.deleteProvider(this.id)
      .subscribe(
        data => {
          console.log(data);
          this.company = data.company.company_name;
          this.isDeleted = true;
        },
        error =>{
          console.log(error);
        }
      )
  };

}
