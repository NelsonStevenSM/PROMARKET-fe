import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { RqAuthentication } from "src/app/shared/model/authentication-dto/rq.authentication";
import { Usuario } from "src/app/shared/model/database-dto/usuario";
import { ProMarketService } from "src/app/shared/services/promarket.service";
import { UtilTools } from 'src/app/shared/util/util-tools';
import Swal from "sweetalert2";

export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true } }
  ]
})

export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup;
  showPassword: boolean = false;
  validaSubmit: boolean = true;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private utilTools: UtilTools,
    private service: ProMarketService
  ) { }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }

  public accesoLoginGroup() {
    this.loginFormGroup.markAllAsTouched();

    if (this.loginFormGroup.valid && this.validaSubmit) {
      this.utilTools.Timer();

      let request: RqAuthentication = new RqAuthentication()
      request.usuario = this.loginFormGroup.controls['username'].value
      request.password = this.loginFormGroup.controls['password'].value

      this.service.getToken(request).subscribe(
        res => {
          this.utilTools.CloseTimer();

          if (res.error !== null && res.error !== undefined) {
            this.alert("error", res.error);
          }

          sessionStorage.setItem("token", res.token);
          sessionStorage.setItem("username", res.user)
          sessionStorage.setItem("flagLogueo", "true");

          this.alert("success","Haz iniciado sesión con exito");
          this.router.navigate(["/home"])
        },
        error => {
          this.utilTools.CloseTimer();
          this.alert("error", error.error.error);
        }
      );
    }
  }

  public alert(tipo: any, error: string) {
    Swal.fire({
      type: tipo,
      title: "Login",
      html: error,
      confirmButtonColor: this.translate.instant("alert.alert_button_color")
    });
  }
}
