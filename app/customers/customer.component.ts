import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Customer } from './customer';

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
}
