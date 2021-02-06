import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { error } from 'protractor';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-edit-providers',
  templateUrl: './edit-providers.component.html',
  styles: [
  ]
})
export class EditProvidersComponent implements OnInit {

  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid Email. Try again or contact us";
  public providers: any;
  provider = new ProviderClass();
  providersForm! : FormGroup;

  id!: any; // Service Provider's id from URL
  email!: string; // Service provider's default email
  ready = false; // Load form only when data are present
  
  constructor(private providerService: ProviderService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();
    
    this.route.paramMap
      .subscribe( params => this.id = params.get('id') );

    this.providerService.getProvider(this.id)
      .subscribe(
        data => {
          this.provider = data[0];
          console.log(data);

          // flatten object
          const temp: any = {};
          for(const [k1,v1] of Object.entries(this.provider)){
            switch(k1){
              case '_id' || 'id': break;
              case 'company': 
                for(const [k2,v2] of Object.entries(this.provider[k1])){
                  if(k2 != "_id"){
                    temp[k2] = v2;
                  }
                }
                break;
                default:
                  temp[k1] = v1;
            }
          }
          console.log(temp);
          setTimeout(() => {
            this.providersForm.patchValue(temp); 
            this.ready = true;
          }, 2000);
          
        },
        error => {
          console.log(error);
        }
      );
  }

  // Method to easy access form controls
  get f(){
    return this.providersForm.controls;
  }

  // Handles form create operation
  handleSubmit(){
    console.log(this.providersForm.value);
    this.buildProvider();
    if(!this.isInvalidEmail()){
      this.providerService.updateProvider(this.id, this.provider)
        .subscribe(
          data => {
            this.submitted = true;
            this.emailError = false;
          },
          error => {
            console.log(error);
          }
        )
    }
  }

  // Get all records from database
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

  // Check for duplicate emails
  isInvalidEmail(){
    let email = this.providersForm.controls.email.value;
    if(this.email != email && this.providers.filter((el: { company: { email: any; }; })=>el.company.email == email).length > 0){
      this.emailError = true;
      return true;
    }
    return false;
  }

  // Generate new ID
  getNewID(){
    let newId:number;
    while(true){
      //generate id
      newId = Math.floor(Math.random() * 10000) + 99999;
      if(this.providers.findIndex((el: { id: number; }) => el.id == newId) == -1){
        return newId;
      }
    }
  }

  // Build new provider object
  buildProvider(){
    let p = this.providersForm.value;
    this.provider.id = this.getNewID();
    this.provider.firstname = p.firstname;
    this.provider.lastname = p.lastname;
    this.provider.position = p.position;
    this.provider.company = {
      company_name: p.company_name,
      address: p.address,
      address2: p.address2,
      city: p.city,
      state: p.state,
      postal_code: p.postal_code,
      phone: p.phone,
      email: p.email,
      description: p.description,
      tagline: p.tagline
    };
  }

  // Build Form controls
  buildFormControls(){
    this.providersForm = new FormGroup({
      firstname : new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname : new FormControl('', [Validators.required, Validators.minLength(2)]),
      position : new FormControl('', [Validators.required]),
      email : new FormControl('', [Validators.required, Validators.email]),
      phone : new FormControl('', [Validators.required]),
      company_name : new FormControl('', [Validators.required]),
      address : new FormControl('', [Validators.required]),
      address2 : new FormControl(),
      city : new FormControl('', [Validators.required]),
      state : new FormControl('', [Validators.required]),
      postal_code : new FormControl('', [Validators.required]),
      description : new FormControl('', [Validators.required]),
      tagline : new FormControl('', [Validators.required]),
    });
  } 

}
