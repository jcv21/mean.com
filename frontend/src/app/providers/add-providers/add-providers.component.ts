import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProviderClass } from 'src/app/models/providers.class';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-add-providers',
  templateUrl: './add-providers.component.html',
  styles: [
  ]
})

export class AddProvidersComponent implements OnInit {

  submitted = false;
  emailError = false;
  emailErrorMsg = "Invalid Email. Try again or contact us";
  public providers: any;
  provider = new ProviderClass();
  providersForm! : FormGroup;

  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.buildFormControls();
    this.loadData();
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
      this.providerService.addProvider(this.provider)
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
    if(this.providers.filter((el: { company: { email: any; }; })=>el.company.email == email).length > 0){
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
      phone : new FormControl('', [Validators.required, Validators.pattern('^[2-9]{3}-[0-9]{3}-[0-9]$')]),
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
