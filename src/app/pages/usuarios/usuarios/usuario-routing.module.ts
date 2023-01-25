import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule, MatSortModule, MatTableModule, MatTabsModule } from '@angular/material';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ValidationsModule } from 'src/app/directive/validations/validations.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UsuarioPopComponent } from './usuario-popup/usuario/usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    data: {
      title: 'Usuario',
      description: 'V.1.0.0',
      urls: [
        { title: 'Usuario', url: '/usuario', icon: 'home' },
        { title: 'usuario' }
      ]
    }
  }
];

@NgModule({
  entryComponents: [UsuarioPopComponent],
  declarations: [UsuarioComponent, UsuarioPopComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MaterialFileInputModule,
    MatCardModule,
    MatDividerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatButtonModule,
    ValidationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatSortModule,
    MatSelectModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ]
})
export class UsuarioRoutingModule { }

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}