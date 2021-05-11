import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoginError: boolean = false;
  loginErrorMessage: string = '';
  isLoading: boolean = false;

  formLogin = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
  });

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.cookieService.get('idUser')) {
      this.router.navigate(['main', 'home']);
    }
  }

  onSubmit() {
    this.showLoginError = false;

    if(this.formLogin.valid) {
      this.isLoading = true;

      this.authService.login(this.formLogin.value)
                      .then( (resp) => {

                        this.cookieService.set('idUser', resp.user.uid);
                        this.router.navigate(['main', 'home']);

                      }).catch( (error) => {
                        console.log('error code');
                        console.log(error.code);

                        if(error.code === 'auth/invalid-email') {
                          this.loginErrorMessage = 'El correo no es válido';
                          this.showLoginError = true;
                        } else if(error.code === 'auth/user-not-found') {
                          this.loginErrorMessage = 'Usuario no encontrado';
                          this.showLoginError = true;
                        } else if(error.code === 'auth/wrong-password') {
                          this.loginErrorMessage = 'Contraseña incorrecta';
                          this.showLoginError = true;
                        } else {
                          this.loginErrorMessage = 'Correo o contraseña inválidos';
                          this.showLoginError = true;
                        }

                        this.isLoading = false;
                        
                      });

    } else {
      this.loginErrorMessage = 'Por favor verifica o llena los campos solicitados';
      this.showLoginError = true;
    }
  }

}
