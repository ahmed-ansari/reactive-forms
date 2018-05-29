"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
// import { NgForm } from '@angular/forms';
var forms_1 = require('@angular/forms');
var customer_1 = require('./customer');
// function ratingRange  (c: AbstractControl): {[key: string]: boolean} | null  {
//         if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
//             return { 'range': true };
//         };
//         return null;
//     };
function ratingRange(min, max) {
    return function (c) {
        if (c.value !== undefined && (isNaN(c.value) || c.value < min || c.value > max)) {
            return { 'range': true };
        }
        ;
        return null;
    };
}
function emailMatcher(c) {
    var emailControl = c.get('email');
    var confirmControl = c.get('confirmEmail');
    if (emailControl.pristine || confirmControl.pristine) {
        return null;
    }
    if (emailControl.value === confirmControl.value) {
        return null;
    }
    return { 'match': true };
}
var CustomerComponent = (function () {
    function CustomerComponent(fb) {
        this.fb = fb;
        this.customer = new customer_1.Customer();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.customerForm = this.fb.group({
            firstName: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            lastName: ['', [forms_1.Validators.maxLength(30)]],
            sendCatalog: true,
            phone: [''],
            notification: ['email'],
            rating: ['', [ratingRange(1, 5)]],
            emailGroup: this.fb.group({
                email: ['', [forms_1.Validators.required, forms_1.Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
                confirmEmail: ['', forms_1.Validators.required]
            }, { validator: emailMatcher })
        });
        // this.customerForm =  new FormGroup({
        //     firstName: new FormControl(),
        //     lastName: new FormControl(),
        //     email: new FormControl(),
        //     sendCatalog: new FormControl(true),
        // })
    };
    // save(customerForm: NgForm) {
    CustomerComponent.prototype.save = function () {
        console.log(this.customer);
        console.log(this.customerForm);
        console.log('Saved: ' + JSON.stringify(this.customerForm.value));
    };
    CustomerComponent.prototype.testData = function () {
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
        });
    };
    CustomerComponent.prototype.setNotification = function (type) {
        var phoneControl = this.customerForm.get('phone');
        if (type == "text") {
            phoneControl.setValidators(forms_1.Validators.required);
        }
        else {
            phoneControl.clearValidators();
        }
        phoneControl.updateValueAndValidity();
    };
    CustomerComponent = __decorate([
        core_1.Component({
            selector: 'my-signup',
            templateUrl: './app/customers/customer.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder])
    ], CustomerComponent);
    return CustomerComponent;
}());
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map