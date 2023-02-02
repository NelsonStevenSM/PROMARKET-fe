import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Puesto } from 'src/app/shared/model/database-dto/puesto';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css']
})
export class StandsPopComponent implements OnInit {

  element: Puesto;
  puesto: Puesto
  standGroup: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StandsPopComponent>,
    @Inject(MAT_DIALOG_DATA) { element }
  ) {
    this.puesto = element
  }

  ngOnInit() {
    this.initForm()
  }

  private initForm() {
    this.standGroup = this.formBuilder.group({
      ancho: new FormControl('', [Validators.required]),
      largo: new FormControl('', [Validators.required]),
      precio_venta: new FormControl('', [Validators.required]),
    })

    if (this.puesto !== undefined) {
      this.id = this.puesto.id
      this.standGroup.patchValue({
        ancho: this.puesto.ancho,
        largo: this.puesto.largo,
        precio_venta: this.puesto.previo_venta
      })
    }
  }

  public cancelar() {
    this.dialogRef.close({ data: undefined });
  }

  public guardar() {
    this.standGroup.markAllAsTouched();

    if (!this.standGroup.valid) { 
      return; 
    }

    this.element = new Puesto()
    this.element.ancho = this.standGroup.controls.ancho.value,
    this.element.largo = this.standGroup.controls.largo.value

    let precio = this.standGroup.controls.precio_venta.value
    let precio_1 = precio.replace("S/ ", "")

    this.element.previo_venta = precio_1.replace(",", "")
    this.element.id = this.puesto.id

    this.dialogRef.close({ data: this.element });
  }

}
