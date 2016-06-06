interface ConfirmOptions {
  title?:string,
  icon?:any,
  content?:any,
  animation?:any,
  animationSpeed?:any,
  confirmButtonClass?:any,
  cancelButtonClass?:any,
  confirmButton?:any,
}

interface JQuery {
  confirm():JQuery;
  confirm(options:ConfirmOptions):JQuery;
}

interface JQueryStatic {
  confirm: any;
}