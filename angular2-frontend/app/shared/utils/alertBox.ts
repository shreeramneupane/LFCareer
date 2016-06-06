export class AlertBox {
  confirm(message, callBack) {
    $.confirm({
      title             : 'Confirm!',
      icon              : 'fa fa-warning',
      content           : message,
      animation         : 'zoom',
      animationSpeed    : 200,
      confirmButtonClass: 'btn-success',
      cancelButtonClass : 'btn-danger',
      confirmButton     : 'Yes',

      confirm: function () {
        callBack();
      }
    });
  }
}