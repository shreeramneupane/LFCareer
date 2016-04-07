module.exports = {

  validationError: function (err) {
    var error = Object.keys(err.errors)[0];
    var error = {
      root: err,
      message: err.errors[error].message,
      code: 500,
      type: 'INTERNAL_SERVER_ERROR'
    };
    return error;
  },
  renderError: function (err) {
    var code = 1;
    if (err.code) {
      code = err.code.substring(0, 2);
    }
    var status = this.HTTPStatusCode(code);
    var error = {
      root: err,
      message: err.routine || 'CONN_ERROR',
      type: status.msg || 'INTERNAL_SERVER_ERROR',
      code: status.code || 500
    };
    return error;
  },

  HTTPStatusCode: function (status) {
    var msg = 'INTERNAL_SERVER_ERROR';
    var code = '500';
    if (status == 'XX') {
      msg = 'FORBIDDEN';
      code = '403'
    }
    else if (status == '57') {
      msg = 'SERVICE_UNAVAILABLE';
      code = '503';
    }
    else if (status == '53') {
      msg = 'INSUFFICIENT_STORAGE';
      code = '507';
    }
    else if (status == '28') {
      msg = 'UNAUTHORIZED';
      code = '401';
    }
    var errorStatus = {
      msg: msg,
      code: code
    }
    return errorStatus;

  }
};
