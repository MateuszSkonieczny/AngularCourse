import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


function mustContainQuestionMark(control: AbstractControl){
  if (control.value.includes("?")) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

function emailIsUnique(control:AbstractControl) {
  if (control.value !== "test@example.com") {
    return of(null);
  }

  return of({ notUnique: true });
}

let initialEmailValue = "";
const localStorageItemName = "saved-login-form";
const savedForm = window.localStorage.getItem(localStorageItemName);

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  loginForm = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [ Validators.email, Validators.required ],
      asyncValidators: [ emailIsUnique ]
    }),
    password: new FormControl("", {
      validators: [ 
        Validators.required, 
        Validators.minLength(6), 
        mustContainQuestionMark 
      ]
    })
  });

  get emailIsInvalid(){
    return this.loginForm.controls.email.touched 
    && this.loginForm.controls.email.dirty
    && this.loginForm.controls.email.invalid
  }

  get passwordIsInvalid(){
    return this.loginForm.controls.password.touched 
    && this.loginForm.controls.password.dirty
    && this.loginForm.controls.password.invalid
  }

  ngOnInit() {
    const localStorageItemName = "saved-login-form";

    /* const savedForm = window.localStorage.getItem(localStorageItemName);

    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      this.loginForm.patchValue({
        email: loadedForm.email
      });
    }
 */
    const subscription = this.loginForm.valueChanges
    .pipe(debounceTime(500))
    .subscribe({
      next: value => {
        window.localStorage.setItem(localStorageItemName, JSON.stringify({ email: value.email }))
      }
    });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit(){
    console.log(this.loginForm);
    
  }
}