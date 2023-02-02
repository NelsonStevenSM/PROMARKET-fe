import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandsRoutingModule } from './stands-routing.module';
import { FlexModule } from '@angular/flex-layout';
import { ValidationsModule } from '../../../directive/validations/validations.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StandsRoutingModule,
    FlexModule,
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
export class StandsModule { }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}