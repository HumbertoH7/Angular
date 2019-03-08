import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { ScrollEventModule } from 'ngx-scroll-event';

import { AppComponent } from './app.component';
import { SobreComponent } from './sobre/sobre.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { SobreCarouselComponent } from './sobre/sobre-carousel/sobre-carousel.component';
import { SobreHeadComponent } from './sobre/sobre-head/sobre-head.component';
import { JsonGenerateComponent } from './json-generate/json-generate.component';
import { GenerateFormComponent } from './json-generate/generate-form/generate-form.component';
import { FooterComponent } from './footer/footer.component';
import { ParallaxScrollModule } from 'ng2-parallaxscroll';
import { CatalogoItemComponent } from './catalogo/catalogo-item/catalogo-item.component';
import { CatalogoCategoriaMenuComponent } from './catalogo/catalogo-categoria-menu/catalogo-categoria-menu.component';

import { CatalogoService } from './catalogo/catalogo.service';
import { CatalogoHeaderComponent } from './catalogo/catalogo-header/catalogo-header.component';
import { HttpClientModule } from '@angular/common/http';
import { ManifestComponent } from './manifest/manifest.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { LoginComponent } from './login/login.component';
import { NgsRevealModule } from 'ng-scrollreveal';
import { LoginService } from './login/login.service';
import { DataService } from './data.service';
import { Http, HttpModule } from '@angular/http';

import { CalendarComponent } from './calendar/calendar.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CatalogoItemDescritivoComponent } from './catalogo/catalogo-item-descritivo/catalogo-item-descritivo.component';
import { BoaspraticasComponent } from './boaspraticas/boaspraticas.component';
import { MarkdownModule} from 'ngx-markdown';
import { CalendarService } from './calendar/calendar.service';
import { DockercommacComponent } from './boaspraticas/artigos/dockerartigos/dockercommac/dockercommac.component';
import { BarRatingModule } from "ngx-bar-rating";

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CatalogoComponent,
    SobreCarouselComponent,
    SobreHeadComponent,
    JsonGenerateComponent,
    GenerateFormComponent,
    FooterComponent,
    CatalogoItemComponent,
    CatalogoCategoriaMenuComponent,
    CatalogoHeaderComponent,
    ManifestComponent,
    SearchPipe,
    LoginComponent,
    CalendarComponent,
    CatalogoItemDescritivoComponent,
    BoaspraticasComponent,
    DockercommacComponent,    
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    ParallaxScrollModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ScrollEventModule,
    ReactiveFormsModule,    
    FlatpickrModule.forRoot(),
    NgsRevealModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    MarkdownModule.forRoot(),
    CommonModule,
    FormsModule,
    NgbModalModule,
    BarRatingModule
  ],
  providers: [CatalogoService, CalendarService, CatalogoHeaderComponent, FormBuilder, LoginService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
