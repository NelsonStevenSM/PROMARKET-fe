import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StandsRoutingModule } from '../stands-routing.module';



@NgModule({
  declarations: [],
  imports: [
    StandsRoutingModule
  ]
})
export class StandsPopModule {
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang("es");
    this.translateService.use("es");
  }
}
