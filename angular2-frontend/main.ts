import { bootstrap }        from '@angular/platform-browser-dynamic';
import { enableProdMode }   from '@angular/core';
import { HTTP_PROVIDERS }   from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { RoutesComponent } from './app/routes.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(RoutesComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
