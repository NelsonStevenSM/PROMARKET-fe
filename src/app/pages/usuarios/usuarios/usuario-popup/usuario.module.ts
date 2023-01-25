import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRoutingModule } from '../usuario-routing.module';

@NgModule({
  declarations: [],
  imports: [
    UsuarioRoutingModule
  ]
})

export class UsuarioPopModule {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("es");
    this.translateService.use("es");
  }
}
