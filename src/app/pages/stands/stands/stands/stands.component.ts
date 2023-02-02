import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MatDialog, MatPaginator, MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Puesto } from 'src/app/shared/model/database-dto/puesto';
import { ProMarketService } from 'src/app/shared/services/promarket.service';
import Swal from 'sweetalert2';
import { StandsPopComponent } from '../stands-popup/stands/stands.component';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.component.html',
  styleUrls: ['./stands.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class StandsComponent implements OnInit {

  filtroGroup: FormGroup;
  puesto_filter: Puesto;
  puestos: Puesto[]
  displayedColumns: string[] = ['id', 'nro_proyecto', 'nro_local', 'nivel', 'ancho', 'largo', 'previo_venta', 'estado', 'editar'];
  dataSource = new MatTableDataSource<Puesto>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  constructor(
    private service: ProMarketService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.initForm()
    this.filtrar()
  }

  private initForm() {
    this.filtroGroup = this.formBuilder.group({
      nro_proyecto: new FormControl(1, [Validators.required]),
      nivel: new FormControl('1', [Validators.required]),
      id: new FormControl('')
    })
  }

  public filtrar() {
    this.filtroGroup.markAllAsTouched()
    if (this.filtroGroup.valid) {
      this.puesto_filter = new Puesto()
      this.puesto_filter.nro_proyecto = this.filtroGroup.controls['nro_proyecto'].value
      this.puesto_filter.nivel = this.filtroGroup.controls['nivel'].value
      this.puesto_filter.id = "%" + this.filtroGroup.controls['id'].value + "%"

      this.service.getPuestosByFilter(sessionStorage.getItem('token'), this.puesto_filter).subscribe(
        res => {
          this.puestos = res

          this.puestos.forEach(element => {
            element.previo_venta = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.previo_venta))
          });
          
          this.dataSource = new MatTableDataSource<Puesto>(this.puestos);
          this.dataSource.paginator = this.paginator;
        },
        error => {
          this.dataSource = new MatTableDataSource<Puesto>();
          Swal.fire(error.error.error)
        }
      );

    } else {
      Swal.fire("Se encontraron campos incompletos")
    }
  }

  public standPopUp(element: Puesto) {
    let dialogRef = this.dialog.open(StandsPopComponent, {
      width: "40%",
      height: "fit-content",
      minWidth: "250px",
      data: { element },
      disableClose: false
    })

    dialogRef.afterClosed().subscribe(res => {

      console.log(JSON.stringify(res))

      if (res.data !== undefined && res.data !== null) {
        this.service.updatePuesto(sessionStorage.getItem('token'), res.data)
          .subscribe(
            res => {
              console.log(res)
              this.filtrar()
            },
            error => {
              //console.log(error.error.error)
              this.alert(error.error.error)
            }
          )
      }
    })
  }

  private alert(txt: string) {
    Swal.fire({
      title: txt
    })
  }
}
