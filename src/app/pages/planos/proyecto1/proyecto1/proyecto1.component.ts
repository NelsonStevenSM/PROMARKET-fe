import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { Cliente } from 'src/app/shared/model/database-dto/cliente';
import { Conyuge } from 'src/app/shared/model/database-dto/conyuge';
import { Financiamiento } from 'src/app/shared/model/database-dto/financiamiento';
import { Puesto } from 'src/app/shared/model/database-dto/puesto';
import { Usuario } from 'src/app/shared/model/database-dto/usuario';
import { ProMarketService } from 'src/app/shared/services/promarket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyecto1',
  templateUrl: './proyecto1.component.svg',
  styleUrls: ['./proyecto1.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})

export class Proyecto1Component implements OnInit {
  flagShowPiso1: boolean = false;
  flagShowPiso2: boolean = false;
  flagShowPiso3: boolean = false;
  flagShowSotano1: boolean = false;
  flagShowSotano2: boolean = false;

  flagFormulario: boolean = false;
  flagConyuge: boolean = false;
  flagVendedor: boolean = true;
  flagBoton: boolean = true

  filtroGroup!: FormGroup;

  idStand: string = "";
  todayDate: string = this.datepipe.transform(new Date(), 'dd-MM-yyyy');

  puestos: Puesto[];
  puesto: Puesto;
  usuarios: Usuario[];

  puesto_s: Puesto
  cliente: Cliente
  conyuge: Conyuge
  financiamiento: Financiamiento
  vendedor: Usuario

  precio_t: string = ""
  saldo_inicial_t: string = ""
  financiamiento_t: string = ""
  importe_separacion_t: string = ""

  precio_n: number
  saldo_inicial_n: number
  financiamiento_n: number
  importe_separacion_n: number

  cant_vendidos: number
  cant_separado: number
  cant_pendientes: number

  constructor(
    private formBuilder: FormBuilder,
    public datepipe: DatePipe,
    private service: ProMarketService,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit() {
    this.getUsuariosByRol()
    this.initForm()
    this.flagVendedor = (+sessionStorage.getItem('rol') === 2) ? false : true
    this.flagBoton = (+sessionStorage.getItem('rol') === 2) ? false : true
  }

  private initForm() {
    this.filtroGroup = this.formBuilder.group({
      numero: [''],
      precio: [''],
      // estado: [''],
      area: [''],
      frente: [''],
      profundidad: [''],
      dni: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apaterno: new FormControl('', [Validators.required]),
      amaterno: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required, Validators.pattern(/^[9]{1}[0-9]+$/i)]),
      correo: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]),
      estadocivil: new FormControl('0', [Validators.required]).enable,
      estadoPuesto: new FormControl('0', [Validators.required]).enable,
      direccion: new FormControl(''),
      dnicony: [''],
      nombrecony: [''],
      apaternocony: [''],
      amaternocony: [''],
      celularcony: new FormControl('', [Validators.pattern(/^[9]{1}[0-9]+$/i)]),
      correocony: new FormControl('', [Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]),
      importeSeparacion: new FormControl('', [Validators.required]),
      fechaSeparacion: [this.todayDate, [Validators.required]],
      saldoInicial: new FormControl('', [Validators.required]),
      fechaSaldoInicial: [this.todayDate, [Validators.required]],
      financia: new FormControl('', [Validators.required]),
      fechaFinancia: [this.todayDate, [Validators.required]],
      vendedor: new FormControl('-1', [Validators.required]),
      comentario: [''],
    })
  }

  private muestraData(id: string) {
    this.flagFormulario = true

    const stand = document.getElementById(id);
    let valueFill = stand.getAttribute("fill")

    if (valueFill === "gray" || valueFill === "yellow") {
      this.flagVendedor = true;
      if (sessionStorage.getItem('rol') === "1") {
        this.enableAll()
        this.flagBoton = true;
      } else {
        this.disableAll()
        this.flagBoton = false;
      }

    } else {
      this.flagConyuge = false
      this.enableByRol()
    }

    this.getPuesto(id);
  }

  public muestraDataA_101() {
    this.idStand = "P1_A_101"
    this.muestraData(this.idStand)
  }
  public muestraDataA_102() {
    this.idStand = "P1_A_102"
    this.muestraData(this.idStand)
  }
  public muestraDataA_103() {
    this.idStand = "P1_A_103"
    this.muestraData(this.idStand)
  }
  public muestraDataA_104() {
    this.idStand = "P1_A_104"
    this.muestraData(this.idStand)
  }
  public muestraDataA_105() {
    this.idStand = "P1_A_105"
    this.muestraData(this.idStand)
  }
  public muestraDataA_106() {
    this.idStand = "P1_A_106"
    this.muestraData(this.idStand)
  }
  public muestraDataA_107() {
    this.idStand = "P1_A_107"
    this.muestraData(this.idStand)
  }
  public muestraDataA_108() {
    this.idStand = "P1_A_108"
    this.muestraData(this.idStand)
  }
  public muestraDataA_109() {
    this.idStand = "P1_A_109"
    this.muestraData(this.idStand)
  }
  public muestraDataA_110() {
    this.idStand = "P1_A_110"
    this.muestraData(this.idStand)
  }
  public muestraDataA_111() {
    this.idStand = "P1_A_111"
    this.muestraData(this.idStand)
  }
  public muestraDataA_112() {
    this.idStand = "P1_A_112"
    this.muestraData(this.idStand)
  }
  public muestraDataA_113() {
    this.idStand = "P1_A_113"
    this.muestraData(this.idStand)
  }
  public muestraDataA_114() {
    this.idStand = "P1_A_114"
    this.muestraData(this.idStand)
  }
  public muestraDataA_115() {
    this.idStand = "P1_A_115"
    this.muestraData(this.idStand)
  }
  public muestraDataA_116() {
    this.idStand = "P1_A_116"
    this.muestraData(this.idStand)
  }
  public muestraDataA_117() {
    this.idStand = "P1_A_117"
    this.muestraData(this.idStand)
  }
  public muestraDataA_118() {
    this.idStand = "P1_A_118"
    this.muestraData(this.idStand)
  }
  public muestraDataA_119() {
    this.idStand = "P1_A_119"
    this.muestraData(this.idStand)
  }
  public muestraDataA_120() {
    this.idStand = "P1_A_120"
    this.muestraData(this.idStand)
  }
  public muestraDataA_121() {
    this.idStand = "P1_A_121"
    this.muestraData(this.idStand)
  }
  public muestraDataA_122() {
    this.idStand = "P1_A_122"
    this.muestraData(this.idStand)
  }
  public muestraDataA_123() {
    this.idStand = "P1_A_123"
    this.muestraData(this.idStand)
  }
  public muestraDataA_124() {
    this.idStand = "P1_A_124"
    this.muestraData(this.idStand)
  }
  public muestraDataA_125() {
    this.idStand = "P1_A_125"
    this.muestraData(this.idStand)
  }
  public muestraDataA_126() {
    this.idStand = "P1_A_126"
    this.muestraData(this.idStand)
  }
  public muestraDataA_127() {
    this.idStand = "P1_A_127"
    this.muestraData(this.idStand)
  }
  public muestraDataA_128() {
    this.idStand = "P1_A_128"
    this.muestraData(this.idStand)
  }
  public muestraDataA_129() {
    this.idStand = "P1_A_129"
    this.muestraData(this.idStand)
  }
  public muestraDataA_130() {
    this.idStand = "P1_A_130"
    this.muestraData(this.idStand)
  }
  public muestraDataA_131() {
    this.idStand = "P1_A_131"
    this.muestraData(this.idStand)
  }
  public muestraDataA_132() {
    this.idStand = "P1_A_132"
    this.muestraData(this.idStand)
  }
  public muestraDataA_133() {
    this.idStand = "P1_A_133"
    this.muestraData(this.idStand)
  }
  public muestraDataA_134() {
    this.idStand = "P1_A_134"
    this.muestraData(this.idStand)
  }
  public muestraDataA_135() {
    this.idStand = "P1_A_135"
    this.muestraData(this.idStand)
  }
  public muestraDataA_136() {
    this.idStand = "P1_A_136"
    this.muestraData(this.idStand)
  }
  public muestraDataA_137() {
    this.idStand = "P1_A_137"
    this.muestraData(this.idStand)
  }
  public muestraDataA_138() {
    this.idStand = "P1_A_138"
    this.muestraData(this.idStand)
  }
  public muestraDataA_139() {
    this.idStand = "P1_A_139"
    this.muestraData(this.idStand)
  }
  public muestraDataA_140() {
    this.idStand = "P1_A_140"
    this.muestraData(this.idStand)
  }
  public muestraDataA_141() {
    this.idStand = "P1_A_141"
    this.muestraData(this.idStand)
  }
  public muestraDataA_142() {
    this.idStand = "P1_A_142"
    this.muestraData(this.idStand)
  }
  public muestraDataA_143() {
    this.idStand = "P1_A_143"
    this.muestraData(this.idStand)
  }
  public muestraDataA_144() {
    this.idStand = "P1_A_144"
    this.muestraData(this.idStand)
  }
  public muestraDataA_145() {
    this.idStand = "P1_A_145"
    this.muestraData(this.idStand)
  }
  public muestraDataA_146() {
    this.idStand = "P1_A_146"
    this.muestraData(this.idStand)
  }
  public muestraDataA_147() {
    this.idStand = "P1_A_147"
    this.muestraData(this.idStand)
  }
  public muestraDataA_148() {
    this.idStand = "P1_A_148"
    this.muestraData(this.idStand)
  }
  public muestraDataA_149() {
    this.idStand = "P1_A_149"
    this.muestraData(this.idStand)
  }
  public muestraDataA_150() {
    this.idStand = "P1_A_150"
    this.muestraData(this.idStand)
  }
  public muestraDataA_151() {
    this.idStand = "P1_A_151"
    this.muestraData(this.idStand)
  }
  public muestraDataA_152() {
    this.idStand = "P1_A_152"
    this.muestraData(this.idStand)
  }
  public muestraDataA_153() {
    this.idStand = "P1_A_153"
    this.muestraData(this.idStand)
  }
  public muestraDataA_154() {
    this.idStand = "P1_A_154"
    this.muestraData(this.idStand)
  }
  public muestraDataA_155() {
    this.idStand = "P1_A_155"
    this.muestraData(this.idStand)
  }
  public muestraDataA_156() {
    this.idStand = "P1_A_156"
    this.muestraData(this.idStand)
  }
  public muestraDataA_157() {
    this.idStand = "P1_A_157"
    this.muestraData(this.idStand)
  }
  public muestraDataA_158() {
    this.idStand = "P1_A_158"
    this.muestraData(this.idStand)
  }
  public muestraDataA_159() {
    this.idStand = "P1_A_159"
    this.muestraData(this.idStand)
  }
  public muestraDataA_160() {
    this.idStand = "P1_A_160"
    this.muestraData(this.idStand)
  }
  public muestraDataA_161() {
    this.idStand = "P1_A_161"
    this.muestraData(this.idStand)
  }
  public muestraDataA_162() {
    this.idStand = "P1_A_162"
    this.muestraData(this.idStand)
  }
  public muestraDataA_163() {
    this.idStand = "P1_A_163"
    this.muestraData(this.idStand)
  }
  public muestraDataA_164() {
    this.idStand = "P1_A_164"
    this.muestraData(this.idStand)
  }
  public muestraDataA_165() {
    this.idStand = "P1_A_165"
    this.muestraData(this.idStand)
  }
  public muestraDataA_166() {
    this.idStand = "P1_A_166"
    this.muestraData(this.idStand)
  }
  public muestraDataA_167() {
    this.idStand = "P1_A_167"
    this.muestraData(this.idStand)
  }
  public muestraDataA_168() {
    this.idStand = "P1_A_168"
    this.muestraData(this.idStand)
  }
  public muestraDataA_169() {
    this.idStand = "P1_A_169"
    this.muestraData(this.idStand)
  }
  public muestraDataA_170() {
    this.idStand = "P1_A_170"
    this.muestraData(this.idStand)
  }
  public muestraDataA_171() {
    this.idStand = "P1_A_171"
    this.muestraData(this.idStand)
  }
  public muestraDataA_172() {
    this.idStand = "P1_A_172"
    this.muestraData(this.idStand)
  }
  public muestraDataA_173() {
    this.idStand = "P1_A_173"
    this.muestraData(this.idStand)
  }
  public muestraDataA_174() {
    this.idStand = "P1_A_174"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M1() {
    this.idStand = "P1_A_M1"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M2() {
    this.idStand = "P1_A_M2"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M3() {
    this.idStand = "P1_A_M3"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M4() {
    this.idStand = "P1_A_M4"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M5() {
    this.idStand = "P1_A_M5"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M6() {
    this.idStand = "P1_A_M6"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M7() {
    this.idStand = "P1_A_M7"
    this.muestraData(this.idStand)
  }
  public muestraDataA_M8() {
    this.idStand = "P1_A_M8"
    this.muestraData(this.idStand)
  }
  public muestraDataB_200() {
    this.idStand = "P1_B_200"
    this.muestraData(this.idStand)
  }
  public muestraDataB_201() {
    this.idStand = "P1_B_201"
    this.muestraData(this.idStand)
  }
  public muestraDataB_202() {
    this.idStand = "P1_B_202"
    this.muestraData(this.idStand)
  }
  public muestraDataB_203() {
    this.idStand = "P1_B_203"
    this.muestraData(this.idStand)
  }
  public muestraDataB_204() {
    this.idStand = "P1_B_204"
    this.muestraData(this.idStand)
  }
  public muestraDataB_205() {
    this.idStand = "P1_B_205"
    this.muestraData(this.idStand)
  }
  public muestraDataB_206() {
    this.idStand = "P1_B_206"
    this.muestraData(this.idStand)
  }
  public muestraDataB_207() {
    this.idStand = "P1_B_207"
    this.muestraData(this.idStand)
  }
  public muestraDataB_208() {
    this.idStand = "P1_B_208"
    this.muestraData(this.idStand)
  }
  public muestraDataB_209() {
    this.idStand = "P1_B_209"
    this.muestraData(this.idStand)
  }
  public muestraDataB_210() {
    this.idStand = "P1_B_210"
    this.muestraData(this.idStand)
  }
  public muestraDataB_211() {
    this.idStand = "P1_B_211"
    this.muestraData(this.idStand)
  }
  public muestraDataB_212() {
    this.idStand = "P1_B_212"
    this.muestraData(this.idStand)
  }
  public muestraDataB_213() {
    this.idStand = "P1_B_213"
    this.muestraData(this.idStand)
  }
  public muestraDataB_214() {
    this.idStand = "P1_B_214"
    this.muestraData(this.idStand)
  }
  public muestraDataB_215() {
    this.idStand = "P1_B_215"
    this.muestraData(this.idStand)
  }
  public muestraDataB_216() {
    this.idStand = "P1_B_216"
    this.muestraData(this.idStand)
  }
  public muestraDataB_217() {
    this.idStand = "P1_B_217"
    this.muestraData(this.idStand)
  }
  public muestraDataB_218() {
    this.idStand = "P1_B_218"
    this.muestraData(this.idStand)
  }
  public muestraDataB_219() {
    this.idStand = "P1_B_219"
    this.muestraData(this.idStand)
  }
  public muestraDataB_220() {
    this.idStand = "P1_B_220"
    this.muestraData(this.idStand)
  }
  public muestraDataB_221() {
    this.idStand = "P1_B_221"
    this.muestraData(this.idStand)
  }
  public muestraDataB_222() {
    this.idStand = "P1_B_222"
    this.muestraData(this.idStand)
  }
  public muestraDataB_223() {
    this.idStand = "P1_B_223"
    this.muestraData(this.idStand)
  }
  public muestraDataB_224() {
    this.idStand = "P1_B_224"
    this.muestraData(this.idStand)
  }
  public muestraDataB_225() {
    this.idStand = "P1_B_225"
    this.muestraData(this.idStand)
  }
  public muestraDataB_226() {
    this.idStand = "P1_B_226"
    this.muestraData(this.idStand)
  }
  public muestraDataB_227() {
    this.idStand = "P1_B_227"
    this.muestraData(this.idStand)
  }
  public muestraDataB_228() {
    this.idStand = "P1_B_228"
    this.muestraData(this.idStand)
  }
  public muestraDataB_229() {
    this.idStand = "P1_B_229"
    this.muestraData(this.idStand)
  }
  public muestraDataB_230() {
    this.idStand = "P1_B_230"
    this.muestraData(this.idStand)
  }
  public muestraDataB_231() {
    this.idStand = "P1_B_231"
    this.muestraData(this.idStand)
  }
  public muestraDataB_232() {
    this.idStand = "P1_B_232"
    this.muestraData(this.idStand)
  }
  public muestraDataB_233() {
    this.idStand = "P1_B_233"
    this.muestraData(this.idStand)
  }
  public muestraDataB_234() {
    this.idStand = "P1_B_234"
    this.muestraData(this.idStand)
  }
  public muestraDataB_235() {
    this.idStand = "P1_B_235"
    this.muestraData(this.idStand)
  }
  public muestraDataB_236() {
    this.idStand = "P1_B_236"
    this.muestraData(this.idStand)
  }
  public muestraDataB_237() {
    this.idStand = "P1_B_237"
    this.muestraData(this.idStand)
  }
  public muestraDataB_238() {
    this.idStand = "P1_B_238"
    this.muestraData(this.idStand)
  }
  public muestraDataB_239() {
    this.idStand = "P1_B_239"
    this.muestraData(this.idStand)
  }
  public muestraDataB_240() {
    this.idStand = "P1_B_240"
    this.muestraData(this.idStand)
  }
  public muestraDataB_241() {
    this.idStand = "P1_B_241"
    this.muestraData(this.idStand)
  }
  public muestraDataB_242() {
    this.idStand = "P1_B_242"
    this.muestraData(this.idStand)
  }
  public muestraDataB_243() {
    this.idStand = "P1_B_243"
    this.muestraData(this.idStand)
  }
  public muestraDataB_244() {
    this.idStand = "P1_B_244"
    this.muestraData(this.idStand)
  }
  public muestraDataB_245() {
    this.idStand = "P1_B_245"
    this.muestraData(this.idStand)
  }
  public muestraDataB_246() {
    this.idStand = "P1_B_246"
    this.muestraData(this.idStand)
  }
  public muestraDataB_247() {
    this.idStand = "P1_B_247"
    this.muestraData(this.idStand)
  }
  public muestraDataB_248() {
    this.idStand = "P1_B_248"
    this.muestraData(this.idStand)
  }
  public muestraDataB_249() {
    this.idStand = "P1_B_249"
    this.muestraData(this.idStand)
  }
  public muestraDataB_250() {
    this.idStand = "P1_B_250"
    this.muestraData(this.idStand)
  }
  public muestraDataB_251() {
    this.idStand = "P1_B_251"
    this.muestraData(this.idStand)
  }
  public muestraDataB_252() {
    this.idStand = "P1_B_252"
    this.muestraData(this.idStand)
  }
  public muestraDataB_253() {
    this.idStand = "P1_B_253"
    this.muestraData(this.idStand)
  }
  public muestraDataB_254() {
    this.idStand = "P1_B_254"
    this.muestraData(this.idStand)
  }
  public muestraDataB_255() {
    this.idStand = "P1_B_255"
    this.muestraData(this.idStand)
  }
  public muestraDataB_256() {
    this.idStand = "P1_B_256"
    this.muestraData(this.idStand)
  }
  public muestraDataB_257() {
    this.idStand = "P1_B_257"
    this.muestraData(this.idStand)
  }
  public muestraDataB_258() {
    this.idStand = "P1_B_258"
    this.muestraData(this.idStand)
  }
  public muestraDataB_259() {
    this.idStand = "P1_B_259"
    this.muestraData(this.idStand)
  }
  public muestraDataB_260() {
    this.idStand = "P1_B_260"
    this.muestraData(this.idStand)
  }
  public muestraDataB_261() {
    this.idStand = "P1_B_261"
    this.muestraData(this.idStand)
  }
  public muestraDataB_262() {
    this.idStand = "P1_B_262"
    this.muestraData(this.idStand)
  }
  public muestraDataB_263() {
    this.idStand = "P1_B_263"
    this.muestraData(this.idStand)
  }
  public muestraDataB_264() {
    this.idStand = "P1_B_264"
    this.muestraData(this.idStand)
  }
  public muestraDataB_265() {
    this.idStand = "P1_B_265"
    this.muestraData(this.idStand)
  }
  public muestraDataB_266() {
    this.idStand = "P1_B_266"
    this.muestraData(this.idStand)
  }
  public muestraDataB_267() {
    this.idStand = "P1_B_267"
    this.muestraData(this.idStand)
  }
  public muestraDataB_268() {
    this.idStand = "P1_B_268"
    this.muestraData(this.idStand)
  }
  public muestraDataB_269() {
    this.idStand = "P1_B_269"
    this.muestraData(this.idStand)
  }
  public muestraDataB_270() {
    this.idStand = "P1_B_270"
    this.muestraData(this.idStand)
  }
  public muestraDataB_271() {
    this.idStand = "P1_B_271"
    this.muestraData(this.idStand)
  }
  public muestraDataB_272() {
    this.idStand = "P1_B_272"
    this.muestraData(this.idStand)
  }
  public muestraDataB_273() {
    this.idStand = "P1_B_273"
    this.muestraData(this.idStand)
  }
  public muestraDataB_274() {
    this.idStand = "P1_B_274"
    this.muestraData(this.idStand)
  }
  public muestraDataB_275() {
    this.idStand = "P1_B_275"
    this.muestraData(this.idStand)
  }
  public muestraDataB_276() {
    this.idStand = "P1_B_276"
    this.muestraData(this.idStand)
  }
  public muestraDataB_277() {
    this.idStand = "P1_B_277"
    this.muestraData(this.idStand)
  }
  public muestraDataB_278() {
    this.idStand = "P1_B_278"
    this.muestraData(this.idStand)
  }
  public muestraDataB_279() {
    this.idStand = "P1_B_279"
    this.muestraData(this.idStand)
  }
  public muestraDataB_280() {
    this.idStand = "P1_B_280"
    this.muestraData(this.idStand)
  }
  public muestraDataB_281() {
    this.idStand = "P1_B_281"
    this.muestraData(this.idStand)
  }
  public muestraDataB_282() {
    this.idStand = "P1_B_282"
    this.muestraData(this.idStand)
  }
  public muestraDataB_283() {
    this.idStand = "P1_B_283"
    this.muestraData(this.idStand)
  }


  public muestraDataC_301() {
    this.idStand = "P1_C_301"
    this.muestraData(this.idStand)
  }
  public muestraDataC_302() {
    this.idStand = "P1_C_302"
    this.muestraData(this.idStand)
  }
  public muestraDataC_303() {
    this.idStand = "P1_C_303"
    this.muestraData(this.idStand)
  }
  public muestraDataC_304() {
    this.idStand = "P1_C_304"
    this.muestraData(this.idStand)
  }
  public muestraDataC_305() {
    this.idStand = "P1_C_305"
    this.muestraData(this.idStand)
  }
  public muestraDataC_306() {
    this.idStand = "P1_C_306"
    this.muestraData(this.idStand)
  }
  public muestraDataC_307() {
    this.idStand = "P1_C_307"
    this.muestraData(this.idStand)
  }
  public muestraDataC_308() {
    this.idStand = "P1_C_308"
    this.muestraData(this.idStand)
  }
  public muestraDataC_309() {
    this.idStand = "P1_C_309"
    this.muestraData(this.idStand)
  }
  public muestraDataC_310() {
    this.idStand = "P1_C_310"
    this.muestraData(this.idStand)
  }
  public muestraDataC_311() {
    this.idStand = "P1_C_311"
    this.muestraData(this.idStand)
  }
  public muestraDataC_312() {
    this.idStand = "P1_C_312"
    this.muestraData(this.idStand)
  }
  public muestraDataC_313() {
    this.idStand = "P1_C_313"
    this.muestraData(this.idStand)
  }
  public muestraDataC_314() {
    this.idStand = "P1_C_314"
    this.muestraData(this.idStand)
  }
  public muestraDataC_315() {
    this.idStand = "P1_C_315"
    this.muestraData(this.idStand)
  }
  public muestraDataC_316() {
    this.idStand = "P1_C_316"
    this.muestraData(this.idStand)
  }
  public muestraDataC_317() {
    this.idStand = "P1_C_317"
    this.muestraData(this.idStand)
  }
  public muestraDataC_318() {
    this.idStand = "P1_C_318"
    this.muestraData(this.idStand)
  }
  public muestraDataC_319() {
    this.idStand = "P1_C_319"
    this.muestraData(this.idStand)
  }
  public muestraDataC_320() {
    this.idStand = "P1_C_320"
    this.muestraData(this.idStand)
  }
  public muestraDataC_321() {
    this.idStand = "P1_C_321"
    this.muestraData(this.idStand)
  }
  public muestraDataC_322() {
    this.idStand = "P1_C_322"
    this.muestraData(this.idStand)
  }
  public muestraDataC_323() {
    this.idStand = "P1_C_323"
    this.muestraData(this.idStand)
  }
  public muestraDataC_324() {
    this.idStand = "P1_C_324"
    this.muestraData(this.idStand)
  }
  public muestraDataC_325() {
    this.idStand = "P1_C_325"
    this.muestraData(this.idStand)
  }
  public muestraDataC_326() {
    this.idStand = "P1_C_326"
    this.muestraData(this.idStand)
  }
  public muestraDataC_327() {
    this.idStand = "P1_C_327"
    this.muestraData(this.idStand)
  }
  public muestraDataC_328() {
    this.idStand = "P1_C_328"
    this.muestraData(this.idStand)
  }
  public muestraDataC_329() {
    this.idStand = "P1_C_329"
    this.muestraData(this.idStand)
  }
  public muestraDataC_330() {
    this.idStand = "P1_C_330"
    this.muestraData(this.idStand)
  }
  public muestraDataC_331() {
    this.idStand = "P1_C_331"
    this.muestraData(this.idStand)
  }
  public muestraDataC_332() {
    this.idStand = "P1_C_332"
    this.muestraData(this.idStand)
  }
  public muestraDataC_333() {
    this.idStand = "P1_C_333"
    this.muestraData(this.idStand)
  }
  public muestraDataC_334() {
    this.idStand = "P1_C_334"
    this.muestraData(this.idStand)
  }
  public muestraDataC_335() {
    this.idStand = "P1_C_335"
    this.muestraData(this.idStand)
  }
  public muestraDataC_336() {
    this.idStand = "P1_C_336"
    this.muestraData(this.idStand)
  }
  public muestraDataC_337() {
    this.idStand = "P1_C_337"
    this.muestraData(this.idStand)
  }
  public muestraDataC_338() {
    this.idStand = "P1_C_338"
    this.muestraData(this.idStand)
  }
  public muestraDataC_339() {
    this.idStand = "P1_C_339"
    this.muestraData(this.idStand)
  }
  public muestraDataC_340() {
    this.idStand = "P1_C_340"
    this.muestraData(this.idStand)
  }
  public muestraDataC_341() {
    this.idStand = "P1_C_341"
    this.muestraData(this.idStand)
  }
  public muestraDataC_342() {
    this.idStand = "P1_C_342"
    this.muestraData(this.idStand)
  }
  public muestraDataC_343() {
    this.idStand = "P1_C_343"
    this.muestraData(this.idStand)
  }
  public muestraDataC_344() {
    this.idStand = "P1_C_344"
    this.muestraData(this.idStand)
  }
  public muestraDataC_345() {
    this.idStand = "P1_C_345"
    this.muestraData(this.idStand)
  }
  public muestraDataC_346() {
    this.idStand = "P1_C_346"
    this.muestraData(this.idStand)
  }
  public muestraDataC_347() {
    this.idStand = "P1_C_347"
    this.muestraData(this.idStand)
  }
  public muestraDataC_348() {
    this.idStand = "P1_C_348"
    this.muestraData(this.idStand)
  }
  public muestraDataC_349() {
    this.idStand = "P1_C_349"
    this.muestraData(this.idStand)
  }
  public muestraDataC_350() {
    this.idStand = "P1_C_350"
    this.muestraData(this.idStand)
  }
  public muestraDataC_351() {
    this.idStand = "P1_C_351"
    this.muestraData(this.idStand)
  }
  public muestraDataC_352() {
    this.idStand = "P1_C_352"
    this.muestraData(this.idStand)
  }
  public muestraDataC_353() {
    this.idStand = "P1_C_353"
    this.muestraData(this.idStand)
  }
  public muestraDataC_354() {
    this.idStand = "P1_C_354"
    this.muestraData(this.idStand)
  }
  public muestraDataC_355() {
    this.idStand = "P1_C_355"
    this.muestraData(this.idStand)
  }
  public muestraDataC_356() {
    this.idStand = "P1_C_356"
    this.muestraData(this.idStand)
  }
  public muestraDataC_357() {
    this.idStand = "P1_C_357"
    this.muestraData(this.idStand)
  }
  public muestraDataC_358() {
    this.idStand = "P1_C_358"
    this.muestraData(this.idStand)
  }
  public muestraDataC_359() {
    this.idStand = "P1_C_359"
    this.muestraData(this.idStand)
  }
  public muestraDataC_360() {
    this.idStand = "P1_C_360"
    this.muestraData(this.idStand)
  }
  public muestraDataC_361() {
    this.idStand = "P1_C_361"
    this.muestraData(this.idStand)
  }
  public muestraDataC_362() {
    this.idStand = "P1_C_362"
    this.muestraData(this.idStand)
  }
  public muestraDataC_363() {
    this.idStand = "P1_C_363"
    this.muestraData(this.idStand)
  }
  public muestraDataC_364() {
    this.idStand = "P1_C_364"
    this.muestraData(this.idStand)
  }
  public muestraDataC_365() {
    this.idStand = "P1_C_365"
    this.muestraData(this.idStand)
  }
  public muestraDataC_366() {
    this.idStand = "P1_C_366"
    this.muestraData(this.idStand)
  }
  public muestraDataC_367() {
    this.idStand = "P1_C_367"
    this.muestraData(this.idStand)
  }
  public muestraDataC_368() {
    this.idStand = "P1_C_368"
    this.muestraData(this.idStand)
  }
  public muestraDataC_369() {
    this.idStand = "P1_C_369"
    this.muestraData(this.idStand)
  }
  public muestraDataC_370() {
    this.idStand = "P1_C_370"
    this.muestraData(this.idStand)
  }
  public muestraDataC_371() {
    this.idStand = "P1_C_371"
    this.muestraData(this.idStand)
  }
  public muestraDataC_372() {
    this.idStand = "P1_C_372"
    this.muestraData(this.idStand)
  }
  public muestraDataC_373() {
    this.idStand = "P1_C_373"
    this.muestraData(this.idStand)
  }
  public muestraDataC_374() {
    this.idStand = "P1_C_374"
    this.muestraData(this.idStand)
  }
  public muestraDataC_375() {
    this.idStand = "P1_C_375"
    this.muestraData(this.idStand)
  }
  public muestraDataC_376() {
    this.idStand = "P1_C_376"
    this.muestraData(this.idStand)
  }
  public muestraDataC_377() {
    this.idStand = "P1_C_377"
    this.muestraData(this.idStand)
  }
  public muestraDataC_378() {
    this.idStand = "P1_C_378"
    this.muestraData(this.idStand)
  }
  public muestraDataC_379() {
    this.idStand = "P1_C_379"
    this.muestraData(this.idStand)
  }
  public muestraDataC_380() {
    this.idStand = "P1_C_380"
    this.muestraData(this.idStand)
  }
  public muestraDataC_381() {
    this.idStand = "P1_C_381"
    this.muestraData(this.idStand)
  }


  public muestraDataS1_DEP_1() {
    this.idStand = "P1_S1_1"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_2() {
    this.idStand = "P1_S1_2"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_3() {
    this.idStand = "P1_S1_3"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_4() {
    this.idStand = "P1_S1_4"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_5() {
    this.idStand = "P1_S1_5"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_6() {
    this.idStand = "P1_S1_6"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_7() {
    this.idStand = "P1_S1_7"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_8() {
    this.idStand = "P1_S1_8"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_9() {
    this.idStand = "P1_S1_9"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_10() {
    this.idStand = "P1_S1_10"
    this.muestraData(this.idStand)
  }

  public muestraDataS1_DEP_11() {
    this.idStand = "P1_S1_11"
    this.muestraData(this.idStand)
  }
  public muestraDataS1_DEP_12() {
    this.idStand = "P1_S1_12"
    this.muestraData(this.idStand)
  }
  public muestraDataS1_DEP_13() {
    this.idStand = "P1_S1_13"
    this.muestraData(this.idStand)
  }
  public muestraDataS1_DEP_14() {
    this.idStand = "P1_S1_14"
    this.muestraData(this.idStand)
  }
  public muestraDataS1_DEP_15() {
    this.idStand = "P1_S1_15"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_1() {
    this.idStand = "P1_S2_1"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_2() {
    this.idStand = "P1_S2_2"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_3() {
    this.idStand = "P1_S2_3"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_4() {
    this.idStand = "P1_S2_4"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_5() {
    this.idStand = "P1_S2_5"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_6() {
    this.idStand = "P1_S2_6"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_7() {
    this.idStand = "P1_S2_7"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_8() {
    this.idStand = "P1_S2_8"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_9() {
    this.idStand = "P1_S2_9"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_10() {
    this.idStand = "P1_S2_10"
    this.muestraData(this.idStand)
  }

  public muestraDataS2_DEP_11() {
    this.idStand = "P1_S2_11"
    this.muestraData(this.idStand)
  }
  public muestraDataS2_DEP_12() {
    this.idStand = "P1_S2_12"
    this.muestraData(this.idStand)
  }
  public muestraDataS2_DEP_13() {
    this.idStand = "P1_S2_13"
    this.muestraData(this.idStand)
  }
  public muestraDataS2_DEP_14() {
    this.idStand = "P1_S2_14"
    this.muestraData(this.idStand)
  }

  private showData(puesto: Puesto) {

    this.filtroGroup.markAsUntouched();
    this.filtroGroup.controls['numero'].setValue(puesto.nro_local);

    this.precio_n = Number(puesto.previo_venta)
    this.precio_t = this.currencyPipe.transform(puesto.previo_venta, "S/ ")

    this.filtroGroup.controls['precio'].setValue(this.precio_t);
    this.filtroGroup.controls['estadoPuesto'].setValue(puesto.estado);
    
    let area = puesto.ancho * puesto.largo
    this.filtroGroup.controls['area'].setValue(area.toFixed(2));
    this.filtroGroup.controls['frente'].setValue(puesto.ancho);
    this.filtroGroup.controls['profundidad'].setValue(puesto.largo);

    if (puesto.cliente !== null && puesto.cliente !== undefined) {
      this.filtroGroup.controls['dni'].setValue(puesto.cliente.dni);
      this.filtroGroup.controls['nombre'].setValue(puesto.cliente.nombre);
      this.filtroGroup.controls['apaterno'].setValue(puesto.cliente.apaterno);
      this.filtroGroup.controls['amaterno'].setValue(puesto.cliente.amaterno);
      this.filtroGroup.controls['celular'].setValue(puesto.cliente.celular);
      this.filtroGroup.controls['correo'].setValue(puesto.cliente.correo);
      this.filtroGroup.controls['estadocivil'].setValue(puesto.cliente.estado_civil);
      this.filtroGroup.controls['direccion'].setValue(puesto.cliente.direccion);

      if (puesto.cliente.conyuge !== null && puesto.cliente.conyuge !== undefined) {
        this.flagConyuge = true
        this.filtroGroup.controls['dnicony'].setValue(puesto.cliente.conyuge.dni);
        this.filtroGroup.controls['nombrecony'].setValue(puesto.cliente.conyuge.nombre);
        this.filtroGroup.controls['apaternocony'].setValue(puesto.cliente.conyuge.apaterno);
        this.filtroGroup.controls['amaternocony'].setValue(puesto.cliente.conyuge.amaterno);
        this.filtroGroup.controls['celularcony'].setValue(puesto.cliente.conyuge.celular);
        this.filtroGroup.controls['correocony'].setValue(puesto.cliente.conyuge.correo);
      } else {
        this.flagConyuge = false;
      }

      if (puesto.cliente.vendedor !== null && puesto.cliente.vendedor !== undefined) {
        this.filtroGroup.controls['vendedor'].setValue(puesto.cliente.vendedor.dni);
        this.filtroGroup.controls['comentario'].setValue(puesto.comentario);
      }
    }

    if (puesto.financiamiento !== null && puesto.financiamiento !== undefined) {
      this.importe_separacion_n = Number(puesto.financiamiento.imp_separacion)
      this.importe_separacion_t = this.currencyPipe.transform(puesto.financiamiento.imp_separacion, "S/ ")
      
      this.saldo_inicial_n = Number(puesto.financiamiento.saldo_inicial)
      this.saldo_inicial_t = this.currencyPipe.transform(puesto.financiamiento.saldo_inicial, "S/ ")

      this.financiamiento_n = Number(puesto.financiamiento.financiamiento)
      this.financiamiento_t = this.currencyPipe.transform(puesto.financiamiento.financiamiento, "S/ ")

      this.filtroGroup.controls['importeSeparacion'].setValue(this.importe_separacion_t);
      this.filtroGroup.controls['saldoInicial'].setValue(this.saldo_inicial_t);
      this.filtroGroup.controls['financia'].setValue(this.financiamiento_t);

      let fs = puesto.financiamiento.fecha_separacion
      let fi = puesto.financiamiento.fecha_saldo_inicial
      let ff = puesto.financiamiento.fecha_financiamiento

      this.filtroGroup.controls['fechaSeparacion'].setValue(fs.substring(0, fs.indexOf('T')).replace(/(\d{4})(-)(\d{2})(-)(\d{2})/, "$5$2$3$4$1"));
      this.filtroGroup.controls['fechaSaldoInicial'].setValue(fi.substring(0, fs.indexOf('T')).replace(/(\d{4})(-)(\d{2})(-)(\d{2})/, "$5$2$3$4$1"));
      this.filtroGroup.controls['fechaFinancia'].setValue(ff.substring(0, fs.indexOf('T')).replace(/(\d{4})(-)(\d{2})(-)(\d{2})/, "$5$2$3$4$1"));
    }
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.filtroGroup.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  public guardarDatos() {

    let estadoFill;

    // console.log(this.findInvalidControls())
    // console.log(this.filtroGroup.valid)
    // console.log(this.filtroGroup.controls.estadoPuesto.value)
    // console.log(this.filtroGroup.controls.estadocivil.value)

    this.filtroGroup.markAllAsTouched()
    if (this.filtroGroup.valid) {
      this.puesto_s = new Puesto()
      this.cliente = new Cliente()
      this.financiamiento = new Financiamiento()
      this.vendedor = new Usuario()

      //estadoFill = this.filtroGroup.controls['estado'].value

      this.puesto_s.nro_local = this.filtroGroup.controls['numero'].value
      this.puesto_s.ancho = this.filtroGroup.controls['frente'].value
      this.puesto_s.estado = this.filtroGroup.controls['estadoPuesto'].value
      this.puesto_s.largo = this.filtroGroup.controls['profundidad'].value
      this.puesto_s.previo_venta = /*this.filtroGroup.controls['precio'].value*/ String(this.precio_n);
      this.puesto_s.comentario = this.filtroGroup.controls['comentario'].value
      this.puesto_s.id = this.idStand

      this.financiamiento.imp_separacion = /*this.filtroGroup.controls['importeSeparacion'].value*/ String(this.importe_separacion_n)
      this.financiamiento.saldo_inicial = /*this.filtroGroup.controls['saldoInicial'].value*/ String(this.saldo_inicial_n)
      this.financiamiento.financiamiento = /*this.filtroGroup.controls['financia'].value*/ String(this.financiamiento_n)
      this.financiamiento.fecha_separacion = this.filtroGroup.controls['fechaSeparacion'].value
      this.financiamiento.fecha_saldo_inicial = this.filtroGroup.controls['fechaSaldoInicial'].value
      this.financiamiento.fecha_financiamiento = this.filtroGroup.controls['fechaFinancia'].value

      this.puesto_s.financiamiento = this.financiamiento

      this.cliente.dni = this.filtroGroup.controls['dni'].value
      this.cliente.nombre = this.filtroGroup.controls['nombre'].value
      this.cliente.apaterno = this.filtroGroup.controls['apaterno'].value
      this.cliente.amaterno = this.filtroGroup.controls['amaterno'].value
      this.cliente.celular = this.filtroGroup.controls['celular'].value
      this.cliente.correo = this.filtroGroup.controls['correo'].value
      this.cliente.estado_civil = this.filtroGroup.controls['estadocivil'].value
      this.cliente.direccion = this.filtroGroup.controls['direccion'].value

      // console.log("CRASHED ---- ", this.filtroGroup.controls['estadocivil'].value)
      if (this.filtroGroup.controls['estadocivil'].value === 1) {
        this.conyuge = new Conyuge()
        this.conyuge.dni = this.filtroGroup.controls['dnicony'].value
        this.conyuge.nombre = this.filtroGroup.controls['nombrecony'].value
        this.conyuge.apaterno = this.filtroGroup.controls['apaternocony'].value
        this.conyuge.amaterno = this.filtroGroup.controls['amaternocony'].value
        this.conyuge.celular = this.filtroGroup.controls['celularcony'].value
        this.conyuge.correo = this.filtroGroup.controls['correocony'].value

        this.cliente.conyuge = this.conyuge
      }

      this.vendedor.dni = this.filtroGroup.controls['vendedor'].value
      this.cliente.vendedor = this.vendedor
      this.puesto_s.cliente = this.cliente

      // console.log("Obketo RQ ->>>>", this.puesto_s)
      // console.log(JSON.stringify(this.puesto_s))
      this.service.savePuesto(sessionStorage.getItem('token'), this.puesto_s).subscribe(
        res => {
          // console.log("RQ CRASHED ----", res)
          const stand = document.getElementById(this.idStand);
          
          if (estadoFill === 0) {
            stand.setAttribute("fill", "gray")
          } else if (estadoFill === 2) {
            stand.setAttribute("fill", "yellow")
          } else {
            stand.setAttribute("fill", "white")
          }

          this.flagFormulario = false;
        },
        error => {
          console.log(error)
        }
      );

    } else {
      Swal.fire("Se encontraron campos incompletos")
    }
  }

  public estadoCivilChange() {
    // console.log(this.filtroGroup.controls['estadocivil'].value)
    // console.log("---------", this.filtroGroup.controls['estado'].value)
    if (this.filtroGroup.controls['estadocivil'].value === 1) {
      this.flagConyuge = true;
      this.filtroGroup.controls['dnicony'].setValidators([Validators.required, Validators.minLength(8)]);
      this.filtroGroup.controls['nombrecony'].setValidators(Validators.required);
      this.filtroGroup.controls['apaternocony'].setValidators(Validators.required);
      this.filtroGroup.controls['amaternocony'].setValidators(Validators.required);
      this.filtroGroup.controls['celularcony'].setValidators([Validators.required, Validators.pattern(/^[9]{1}[0-9]+$/i)]);
      this.filtroGroup.controls['correocony'].setValidators([Validators.required, Validators.pattern(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)]);
      // 
      //
      //maxlength=8 minlength=8
    } else {
      this.flagConyuge = false;
      //aca quitas las validaciones del conyuge
      this.filtroGroup.controls['dnicony'].clearValidators();
      this.filtroGroup.controls['dnicony'].updateValueAndValidity();

      this.filtroGroup.controls['nombrecony'].clearValidators();
      this.filtroGroup.controls['nombrecony'].updateValueAndValidity();

      this.filtroGroup.controls['apaternocony'].clearValidators();
      this.filtroGroup.controls['apaternocony'].updateValueAndValidity();

      this.filtroGroup.controls['amaternocony'].clearValidators();
      this.filtroGroup.controls['amaternocony'].updateValueAndValidity();

      this.filtroGroup.controls['celularcony'].clearValidators();
      this.filtroGroup.controls['celularcony'].updateValueAndValidity();

      this.filtroGroup.controls['correocony'].clearValidators();
      this.filtroGroup.controls['correocony'].updateValueAndValidity();
    }
  }

  //FLAGS DE VISIBILIDAD
  public showPiso1() {
    this.getPuestos("1")
    this.flagShowPiso1 = true;
    this.flagShowPiso2 = false;
    this.flagShowPiso3 = false;
    this.flagShowSotano1 = false;
    this.flagShowSotano2 = false;
    this.flagFormulario = false;
  }

  public showPiso2() {
    this.getPuestos("2")
    this.flagShowPiso1 = false;
    this.flagShowPiso2 = true;
    this.flagShowPiso3 = false;
    this.flagShowSotano1 = false;
    this.flagShowSotano2 = false;
    this.flagFormulario = false;
  }

  public showPiso3() {
    this.getPuestos("3")
    this.flagShowPiso1 = false;
    this.flagShowPiso2 = false;
    this.flagShowPiso3 = true;
    this.flagShowSotano1 = false;
    this.flagShowSotano2 = false;
    this.flagFormulario = false;
  }

  public showSotano1() {
    this.getPuestos("S1")
    this.flagShowPiso1 = false;
    this.flagShowPiso2 = false;
    this.flagShowPiso3 = false;
    this.flagShowSotano1 = true;
    this.flagShowSotano2 = false;
    this.flagFormulario = false;
  }

  public showSotano2() {
    this.getPuestos("S2")
    this.flagShowPiso1 = false;
    this.flagShowPiso2 = false;
    this.flagShowPiso3 = false;
    this.flagShowSotano1 = false;
    this.flagShowSotano2 = true;
    this.flagFormulario = false;
  }

  getPuesto(id: string) {
    this.service.getPuesto(sessionStorage.getItem('token'), id).subscribe(
      res => {
        this.showData(res);
      },
      error => {
        console.log(error)
      }
    );
  }

  //MEJORAR AL BUSCAR POR PISO
  getPuestos(id: string) {
    this.service.getPuestos(sessionStorage.getItem('token'), id).subscribe(
      res => {
        this.updateFill(res)
      },
      error => {
        console.log(error)
      }
    );
  }

  updateFill(tiendas: Puesto[]) {
    this.cant_separado = 0
    this.cant_vendidos = 0
    this.cant_pendientes = 0

    tiendas.forEach(x => {
      const stand = document.getElementById(x.id)
      // console.log("ID Buscado: {}", x.id)
      // console.log(stand)
      if (x.estado === 0) {
        stand.setAttribute("fill", "gray")
        this.cant_vendidos++
      } else if (x.estado === 2) {
        stand.setAttribute("fill", "yellow")
        this.cant_separado++
      } else {
        stand.setAttribute("fill", "white")
        this.cant_pendientes++
      }
    });

    console.log("SEPARADOS: {}, VENDIDOS: {}, PENDIENTES: {}", this.cant_separado, this.cant_vendidos, this.cant_pendientes)
  }

  public mathFinanciamiento() {

    // console.log(("math"))

    if (this.filtroGroup.controls.precio.value !== null && this.filtroGroup.controls.precio.value !== undefined) {
      
      this.precio_t = this.filtroGroup.controls.precio.value;

      if (this.precio_t.includes("S/ ")) {
        this.precio_t = this.precio_t.replace("S/ ", "").replace(",", "")
        // console.log("Precio String:", this.precio_t)
        this.precio_n = Number(this.precio_t);
        // console.log("Precio Number:", this.precio_n)
        this.filtroGroup.controls.precio.setValue(this.currencyPipe.transform(this.precio_n, "S/ "))
      } else {
        this.precio_n = Number(this.precio_t)
        this.filtroGroup.controls.precio.setValue(this.currencyPipe.transform(this.precio_t, "S/ "))
      }
    }

    if (this.filtroGroup.controls.saldoInicial.value !== null && this.filtroGroup.controls.saldoInicial.value !== undefined) {
      
      this.saldo_inicial_t = this.filtroGroup.controls.saldoInicial.value;

      if (this.saldo_inicial_t.includes("S/ ")) {
        this.saldo_inicial_t = this.saldo_inicial_t.replace("S/ ", "").replace(",", "")
        this.saldo_inicial_n = Number(this.saldo_inicial_t);
        // console.log("Saldo Inicial Number:", this.saldo_inicial_n)
        this.filtroGroup.controls.saldoInicial.setValue(this.currencyPipe.transform(this.saldo_inicial_n, "S/ "))
      } else {
        this.saldo_inicial_n = Number(this.saldo_inicial_t)
        this.filtroGroup.controls.saldoInicial.setValue(this.currencyPipe.transform(this.saldo_inicial_t, "S/ "))
      }
    }

    if (this.filtroGroup.controls.importeSeparacion.value !== null && this.filtroGroup.controls.importeSeparacion.value !== undefined) {
      
      this.importe_separacion_t = this.filtroGroup.controls.importeSeparacion.value;

      if (this.importe_separacion_t.includes("S/ ")) {
        this.importe_separacion_t = this.importe_separacion_t.replace("S/ ", "").replace(",", "")
        this.importe_separacion_n = Number(this.importe_separacion_t);
        // console.log("Importe Separacion Number:", this.importe_separacion_n)
        this.filtroGroup.controls.importeSeparacion.setValue(this.currencyPipe.transform(this.importe_separacion_n, "S/ "))
      } else {
        this.importe_separacion_n = Number(this.importe_separacion_t)
        this.filtroGroup.controls.importeSeparacion.setValue(this.currencyPipe.transform(this.importe_separacion_t, "S/ "))
      }
    }

    if (this.precio_n !== null && this.saldo_inicial_n !== null && this.importe_separacion_n !== null) {
      this.financiamiento_n = this.precio_n - this.saldo_inicial_n - this.importe_separacion_n
      this.financiamiento_t = this.currencyPipe.transform(this.financiamiento_n, "S/ ")
      this.filtroGroup.controls.financia.setValue(this.financiamiento_t)
    }
  }

  //DISABLE FORMS
  private enableByRol() {
    this.filtroGroup.reset()

    this.filtroGroup.controls['fechaSeparacion'].setValue(this.todayDate);
    this.filtroGroup.controls['fechaSaldoInicial'].setValue(this.todayDate);
    this.filtroGroup.controls['fechaFinancia'].setValue(this.todayDate);
    this.filtroGroup.controls['vendedor'].setValue(sessionStorage.getItem('username'));

    let rol = sessionStorage.getItem('rol')
    switch (+rol) {
      case 1:
        this.flagBoton = true
        this.enableAll()
        break;
      case 2:
        this.flagBoton = false
        this.flagVendedor = false;
        this.disableAll()
        break;
      case 3:
        this.flagBoton = true
        this.enableAll()
        this.disableDataStand()
        this.filtroGroup.controls.fechaSeparacion.disable();
        this.filtroGroup.controls.fechaSaldoInicial.disable();
        this.filtroGroup.controls.fechaFinancia.disable();
        this.filtroGroup.controls.vendedor.disable();
        break;
    }
  }
  private enableAll() {
    this.enableDataStand()
    this.enableDataClient()
    this.enableDataSpouse()
    this.enableDataFinancing()
    this.enableDataSeller()
  }

  private disableAll() {
    this.disableDataStand()
    this.disableDataClient()
    this.disableDataSpouse()
    this.disableDataFinancing()
    this.disableDataSeller()
  }

  private disableDataStand() {
    this.filtroGroup.controls.numero.disable();
    this.filtroGroup.controls.precio.disable();
    this.filtroGroup.controls.area.disable();
    this.filtroGroup.controls.frente.disable();
    this.filtroGroup.controls.profundidad.disable();
  }

  private enableDataStand() {
    this.filtroGroup.controls.numero.enable();
    this.filtroGroup.controls.precio.enable();
    this.filtroGroup.controls.area.enable();
    this.filtroGroup.controls.frente.enable();
    this.filtroGroup.controls.profundidad.enable();
  }

  private disableDataClient() {
    this.filtroGroup.controls.dni.disable();
    this.filtroGroup.controls.nombre.disable();
    this.filtroGroup.controls.apaterno.disable();
    this.filtroGroup.controls.amaterno.disable();
    this.filtroGroup.controls.celular.disable();
    this.filtroGroup.controls.correo.disable();
    this.filtroGroup.controls.estadocivil.disable();
    this.filtroGroup.controls.direccion.disable();
  }

  private enableDataClient() {
    this.filtroGroup.controls.dni.enable();
    this.filtroGroup.controls.nombre.enable();
    this.filtroGroup.controls.apaterno.enable();
    this.filtroGroup.controls.amaterno.enable();
    this.filtroGroup.controls.celular.enable();
    this.filtroGroup.controls.correo.enable();
    this.filtroGroup.controls.estadocivil.enable();
    this.filtroGroup.controls.direccion.enable();
  }

  private disableDataFinancing() {
    this.filtroGroup.controls.importeSeparacion.disable();
    this.filtroGroup.controls.saldoInicial.disable();
    this.filtroGroup.controls.financia.disable();
    this.filtroGroup.controls.estadoPuesto.disable();
    this.filtroGroup.controls.fechaSeparacion.disable();
    this.filtroGroup.controls.fechaSaldoInicial.disable();
    this.filtroGroup.controls.fechaFinancia.disable();
  }

  private enableDataFinancing() {
    this.filtroGroup.controls.importeSeparacion.enable();
    this.filtroGroup.controls.saldoInicial.enable();
    this.filtroGroup.controls.financia.disable();
    this.filtroGroup.controls.estadoPuesto.enable();
    this.filtroGroup.controls.fechaSeparacion.enable();
    this.filtroGroup.controls.fechaSaldoInicial.enable();
    this.filtroGroup.controls.fechaFinancia.enable();
  }

  private disableDataSpouse() {
    this.filtroGroup.controls.dnicony.disable();
    this.filtroGroup.controls.nombrecony.disable();
    this.filtroGroup.controls.apaternocony.disable();
    this.filtroGroup.controls.amaternocony.disable();
    this.filtroGroup.controls.celularcony.disable();
    this.filtroGroup.controls.correocony.disable();
  }

  private enableDataSpouse() {
    this.filtroGroup.controls.dnicony.enable();
    this.filtroGroup.controls.nombrecony.enable();
    this.filtroGroup.controls.apaternocony.enable();
    this.filtroGroup.controls.amaternocony.enable();
    this.filtroGroup.controls.celularcony.enable();
    this.filtroGroup.controls.correocony.enable();
  }

  private disableDataSeller() {
    this.filtroGroup.controls.vendedor.disable();
    this.filtroGroup.controls.comentario.disable();
  }

  private enableDataSeller() {
    this.filtroGroup.controls.vendedor.disable();
    this.filtroGroup.controls.comentario.enable();
  }

  private getUsuariosByRol() {
    this.service.getUsuariosByRol(sessionStorage.getItem('token'))
      .subscribe(
        res => {
          this.usuarios = res;
        }
      )
  }
}
