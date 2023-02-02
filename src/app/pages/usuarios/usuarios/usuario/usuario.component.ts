import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MatDialog, MatPaginator, MatTableDataSource, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Usuario } from 'src/app/shared/model/database-dto/usuario';
import { ProMarketService } from 'src/app/shared/services/promarket.service';
import Swal from 'sweetalert2';
import { UsuarioPopComponent } from '../usuario-popup/usuario/usuario.component';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class UsuarioComponent implements OnInit {

  usuarios: Usuario[]
  displayedColumns: string[] = ['dni', 'nombre', 'apaterno', 'amaterno', 'rol', 'contra', 'fecha_crea', 'fecha_act', 'fecha_desac', 'estado', 'estado_change', 'editar'];
  dataSource = new MatTableDataSource<Usuario>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private service: ProMarketService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getUsuarios();
  }

  private getUsuarios() {
    this.service.getUsuarios(sessionStorage.getItem('token'))
      .subscribe(
        res => {
          this.usuarios = res;
          // console.log(this.usuarios)
          this.dataSource = new MatTableDataSource<Usuario>(this.usuarios);
          this.dataSource.paginator = this.paginator;
        }
      )
  }

  public changeStatus(dni: string, estado: number) {

    Swal.fire({
      title: 'Cambio de Estado',
      text: "El usuario se encuentra " +
        (estado === 0 ? "desactivado" : "activado")
        + " ¿Deseas " +
        (estado === 0 ? "activarlo?" : "desactivarlo?"),
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result) {
        
        let usuario: Usuario = new Usuario()
        usuario.dni = dni
        usuario.estado = estado

        this.service.changeStatus(sessionStorage.getItem('token'), usuario)
          .subscribe(
            res => {
              this.getUsuarios()
            }
          )
      }
    })
  }

  public verContra(pass: string) {
    this.alert(pass)
  }

  private alert(txt: string) {
    Swal.fire({
      title: txt
    })
  }

  public nuevoUsuario() {
    this.usuarioPopUp(undefined, 1)
  }

  public usuarioPopUp(element: Usuario, option: number) {
    let dialogRef = this.dialog.open(UsuarioPopComponent, {
      width: "40%",
      height: "fit-content",
      minWidth: "250px",
      data: { element },
      disableClose: false
    })

    dialogRef.afterClosed().subscribe(res => {
      if (res.data !== undefined && res.data !== null) {
        if (option == 1) {
          this.service.createUsuario(sessionStorage.getItem('token'), res.data)
            .subscribe(
              res => {
                this.getUsuarios()
              }
            )
        }
        if (option == 2) {
          this.service.updateUsuario(sessionStorage.getItem('token'), res.data)
            .subscribe(
              res => {
                console.log(res)
                this.getUsuarios()
              },
              error => {
                //console.log(error.error.error)
                this.alert(error.error.error)
              }
            )
        }
      }
    })
  }

}
