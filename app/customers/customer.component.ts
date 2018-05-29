import { Component, OnInit } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Customer } from './customer';

@Component({
    selector: 'my-signup',
    templateUrl: './app/customers/customer.component.html'
})
export class CustomerComponent implements OnInit {
    customer: Customer= new Customer();
    customerForm: FormGroup;

    ngOnInit(): void {
        this.customerForm =  new FormGroup({
            firstName: new FormControl(),
            lastName: new FormControl(),
            email: new FormControl(),
            sendCatalog: new FormControl(true),
        })
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
            firstName:"Ansari",
            // lastName:"Ahmed",
            sendCatalog:true,
            email:"ansari@gmail.com"
        })
    }
 }
