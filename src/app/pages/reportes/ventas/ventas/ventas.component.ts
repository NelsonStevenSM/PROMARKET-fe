import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Ventas } from 'src/app/shared/model/consultas-dto/ventas';
import { ProMarketService } from 'src/app/shared/services/promarket.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: Ventas[]
  displayedColumns: string[] = ['id', 'nro_local', 'dni', 'cliente', 'celular', 'correo', 'precio_venta', 'imp_separacion', 'saldo_inicial', 'financiamiento', 'saldo_pendiente', 'vendedor', 'comentario'];
  dataSource = new MatTableDataSource<Ventas>();
  flagBotonExportar : boolean = false;

  constructor(
    private service: ProMarketService
  ) { }

  ngOnInit() {
    this.getVentas();
  }

  private getVentas() {
    this.service.getVentas(sessionStorage.getItem('token'))
      .subscribe(
        res => {
          if (res.length !== 0) {
            this.ventas = res;
            
            this.ventas.forEach(element => {
              element.PRECIO_VENTA = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.PRECIO_VENTA))
              element.IMP_SEPARACION = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.IMP_SEPARACION))
              element.SALDO_INICIAL = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.SALDO_INICIAL))
              element.FINANCIAMIENTO = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.FINANCIAMIENTO))
              element.SALDO_PENDIENTE = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(Number(element.SALDO_PENDIENTE))
            });

            this.dataSource = new MatTableDataSource<Ventas>(this.ventas);
            this.flagBotonExportar = false
          } else {
            this.flagBotonExportar = true
            Swal.fire({
              title: "No se encontraron datos"
            })
          }
        },
        error => {
          Swal.fire({
            title: "Ocurrio un error al buscar datos"
          })
        }
      )
  }

  public exportarDatos() {
    this.generateExcel()
  }

  generateExcel() {
    var options = {
      filename: './streamed-workbook.xlsx',
      useStyles: true,
      useSharedStrings: true,
    };
    let workbook = new Excel.Workbook(options);
    var worksheet = workbook.addWorksheet('Ventas');

    worksheet.columns = [
      { header: 'ID', key: 'ID', width: 10 },
      { header: 'N° Local', key: 'NRO_LOCAL', width: 10 },
      { header: 'DNI', key: 'DNI', width: 10 },
      { header: 'Cliente', key: 'CLIENTE', width: 10 },
      { header: 'Celular', key: 'CELULAR', width: 10 },
      { header: 'Correo', key: 'CORREO', width: 10 },
      { header: 'Precio de Venta (S/)', key: 'PRECIO_VENTA', width: 10 },
      { header: 'Imp. Separación (S/)', key: 'IMP_SEPARACION', width: 10 },
      { header: 'Saldo Inicial (S/)', key: 'SALDO_INICIAL', width: 10 },
      { header: 'Financiamiento (S/)', key: 'FINANCIAMIENTO', width: 10 },
      { header: 'Saldo Pendiente (S/)', key: 'SALDO_PENDIENTE', width: 10 },
      { header: 'Vendedor', key: 'VENDEDOR', width: 10 },
      { header: 'Comentario', key: 'COMENTARIO', width: 10 }
    ];

    this.ventas.forEach(element => {
      worksheet.addRow(element)
    });
    

    let fileName = 'reporte-ventas.xlsx';
    const excelBuffer: any = workbook.xlsx.writeBuffer();
    workbook.xlsx.writeBuffer().then(function (buffer) {
      // done buffering
      const data: Blob = new Blob([buffer], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      FileSaver.saveAs(data, fileName);
    });
  }
}
