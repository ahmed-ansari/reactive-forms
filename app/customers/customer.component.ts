import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Customer } from './customer';
import 'rxjs/add/operator/debounceTime';
// function ratingRange  (c: AbstractControl): {[key: string]: boolean} | null  {
//         if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//             return { 'range': true };
//         };
//         return null;
//     };

function ratingRange(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        };
        return null;
    };
}

function emailMatcher(c: AbstractControl): {[key: string]: boolean} | null {
    let emailControl = c.get('email');
    let confirmControl = c.get('confirmEmail');

    if (emailControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
 }




@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customer: Customer = new Customer();
    customerForm: FormGroup;
    private validationMessages = {
        required: 'Please enter your email address.',
        pattern: 'Please enter a valid email address.'
    };
    emailMessage: string;

    constructor(private fb: FormBuilder) {

    }
    ngOnInit(): void {
        this.customerForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.minLength(3)]],
            lastName: ['', [Validators.maxLength(30)]],
            sendCatalog: true,
            phone: [''],
            notification: ['email'],
            rating: ['', [ratingRange(1, 5)]],
            emailGroup: this.fb.group({
                email: ['', [Validators.required,Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail:['',Validators.required]
            },{validator: emailMatcher})
        });


        // this.customerForm =  new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalog: new FormControl(true),
        // })

        this.customerForm.get('notification').valueChanges
        .subscribe( value => {console.log(value);this.setNotification(value)});

 
        const emailControl = this.customerForm.get('emailGroup.email');
        emailControl.valueChanges.debounceTime(1000).subscribe(value => {
            console.log('value change',value);
            this.setMessage(emailControl)
        }
          );

    }
    // save(customerForm: NgForm) {
    save() {
        console.log(this.customer);
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    }
    testData() {
        // this.customerForm.setValue({
        //     firstName:"Ansari",
        //     lastName:"Ahmed",
        //     sendCatalog:true,
        //     email:"ansari@gmail.com"
        // })

        this.customerForm.patchValue({
            firstName: "Ansari",
            // lastName:"Ahmed",
            sendCatalog: true,
            email: "ansari@gmail.com"
        })
    }
    setNotification(type: string): void {
        const phoneControl = this.customerForm.get('phone');
        if (type == "text") {
            phoneControl.setValidators(Validators.required);
        } else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    }

    setMessage(c: AbstractControl): void {
        this.emailMessage = '';
        if ((c.touched || c.dirty) && c.errors) {
            console.log('errors',c.errors)
            this.emailMessage = Object.keys(c.errors).map(key =>
               { console.log('errors',c.errors)
                console.log('msg',this.validationMessages[key])
                return this.validationMessages[key]}).join(' ')
                console.log('out msg',this.emailMessage)    
        }
       
    }
}
