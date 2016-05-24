import { bootstrap }        from '@angular/platform-browser-dynamic';
import { enableProdMode, PLATFORM_DIRECTIVES, provide }   from '@angular/core';
import { HTTP_PROVIDERS }   from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';

import { AppComponent } from './app/app.component';
import { PageHeader }   from './app/shared/page-header/pageHeader.component';

if (process.env.ENV === 'production') {
  enableProdMode();
}

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
