import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get email(): string {
    return this.form.get('email').value;
  }

  get password(): string {
    return this.form.get('password').value;
  }

  login(): void {
    const {email, password} = this.form.getRawValue();
    this.authService.login(email, password)
      .then(response => {
        this.authService.setUser(response.user);
        this.router.navigate(['/dashboard']);
      })
      .catch(err => {
        console.log('error', err);
      });
  }

}
