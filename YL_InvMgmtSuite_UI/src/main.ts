import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
//import * as data from './assets/appConf/invmgmt.json';
//import { AppConstants } from './app/AppConstants';

if (environment.production) {
  enableProdMode();
  // const configurationData = (data as any).default;
  // AppConstants.servicesURL = configurationData.servicesURL;
  // console.log("Value Set now");
  // console.log(AppConstants.servicesURL);
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));



 