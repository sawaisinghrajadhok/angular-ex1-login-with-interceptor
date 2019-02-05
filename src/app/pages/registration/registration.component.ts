import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { RegistrationFormUserType } from '../../_enum/registration-form-user-type';
import { FormBuilder, Validators } from '@angular/forms';
import { RegistrationService } from '../../providers/registration.service';
import { ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  @ViewChild('myModal') modalTemplate: TemplateRef<any>;

  constructor(
    private fb : FormBuilder,
    private registrationService: RegistrationService,
  ) { }
  
  registration_form_type = RegistrationFormUserType.CUSTOMER;  

  openModal(){
    $('#myModal').modal('show');
  }

  ngOnInit() {
    console.log(this.registration_form_type)
  }

  registrationForm = this.fb.group({
    name: ['', [Validators.required]],
    username: ['', [Validators.required]],
    mobileNumber: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  showRegistrationForm(registrationFormType) {  
    if (registrationFormType == RegistrationFormUserType.CUSTOMER) {
      this.registration_form_type = RegistrationFormUserType.CUSTOMER;
    } else {
      this.registration_form_type = RegistrationFormUserType.SHOPKEEPER;
    }
  }

  register(userType) {
    var requestJson = 
    {
      'name': this.registrationForm.value.name,
      'username': this.registrationForm.value.username,
      'mobileNumber': this.registrationForm.value.mobileNumber,
      'email': this.registrationForm.value.email,
      'password': this.registrationForm.value.password 
    }
    
    console.log('---------' + userType);
    console.log('---------' + RegistrationFormUserType.SHOPKEEPER);
    
    if (userType == RegistrationFormUserType.CUSTOMER) {
      this.registrationService.registerCustomer(requestJson)      
    } else if (userType == RegistrationFormUserType.SHOPKEEPER){
      this.registrationService.registerShopkeeper(requestJson)
      .subscribe(result=> {
        console.log('Registered sucessfully !!!');
        this.openModal();       
      },
      error=> {
        console.log('registration error ' + error);
      })
    }
  }
}
