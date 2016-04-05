
module.exports = {

    HTTPStatusCode: function(status) {
        var msg = 'INTERNAL_ERROR';
        var code = '500';
        if(status == 'XX') {
            msg = 'INTERNAL_ERROR';
            code='403'
        }
        else if(status == '57') {
            msg = 'SERVER_ERROR';
            code = '503';
        }
        else if(status == '28') {
            msg = 'AUTHORIZATION_ERROR';
            code= '401';
        }
        else{
            msg = 'NETWORK_ERROR';
            code = '500'
        }
        var errorStatus = {
            msg: msg,
            code: code
        }
        return errorStatus;

    }

}
