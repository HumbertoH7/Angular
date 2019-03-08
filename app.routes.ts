import { Routes } from '@angular/router';
import { SobreComponent } from './sobre/sobre.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { JsonGenerateComponent } from './json-generate/json-generate.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CatalogoItemDescritivoComponent } from './catalogo/catalogo-item-descritivo/catalogo-item-descritivo.component';
import { BoaspraticasComponent } from './boaspraticas/boaspraticas.component';
import { DockercommacComponent } from './boaspraticas/artigos/dockerartigos/dockercommac/dockercommac.component';

export const ROUTES: Routes = [
    {path: '', component: CatalogoComponent},
    {path: 'sobre', component: SobreComponent},
    {path: 'catalog', component: CatalogoComponent},
    {path: 'generate', component: JsonGenerateComponent},
    {path: 'login', component: LoginComponent},
    {path: 'calendar', component: CalendarComponent},
    {path: 'description', component: CatalogoItemDescritivoComponent},
    {path: 'boaspraticas', component: BoaspraticasComponent},
    {path: 'dockercommac', component: DockercommacComponent},
];
