import { ThrowStmt } from '@angular/compiler';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Usuario } from 'src/app/shared/model/database-dto/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioPopComponent implements OnInit {

  element: Usuario;
  usuario: Usuario;
  usuarioGroup: FormGroup;
  password_gen: string = ''
  dni_o: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<UsuarioPopComponent>,
    @Inject(MAT_DIALOG_DATA) { element }
  ) {
    this.usuario = element
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.generatePassword()
    this.usuarioGroup = this.formBuilder.group({
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apaterno: new FormControl('', [Validators.required]),
      amaterno: new FormControl('', [Validators.required]),
      rol: new FormControl(-1, [Validators.required]),
      password: new FormControl(this.password_gen, [Validators.required])
    })

    if (this.usuario !== undefined) {

      this.dni_o = this.usuario.dni;

      this.usuarioGroup.patchValue({
        dni: this.usuario.dni,
        nombre: this.usuario.nombre,
        apaterno: this.usuario.apaterno,
        amaterno: this.usuario.amaterno,
        rol: this.usuario.rol,
        password: this.usuario.password
      })
    }
  }

  private generatePassword() {
    let characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( let i = 0; i < 8; i++ ) {
      this.password_gen += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  public cancelar() {
    this.dialogRef.close({ data: undefined });
  }

  public guardar() {
    this.usuarioGroup.markAllAsTouched();

    if (!this.usuarioGroup.valid) { 
      return; 
    }

    this.element = new Usuario()
    this.element.dni = this.usuarioGroup.controls.dni.value,
    this.element.nombre = this.usuarioGroup.controls.nombre.value
    this.element.apaterno = this.usuarioGroup.controls.apaterno.value
    this.element.amaterno = this.usuarioGroup.controls.amaterno.value
    this.element.rol = this.usuarioGroup.controls.rol.value
    this.element.password = this.usuarioGroup.controls.password.value

    this.element.dni_o = this.dni_o;

    this.dialogRef.close({ data: this.element });
  }
}
