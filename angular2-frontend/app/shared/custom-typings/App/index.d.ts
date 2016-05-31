interface AppDisplayMethod {

  //only one argument
  (mode: string): JQuery;

  //two arguments
  (mode: string, extra: string): JQuery;
}

interface AppInterface {

  //sidebar method
    sidebar:AppDisplayMethod

  }

declare var App: AppInterface;
declare module "App" {
    export = App;
}