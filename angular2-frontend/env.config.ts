export class ENVR {

    public static get(value) {
        const environment = window.location.hostname;
        var data = {};
        switch (environment) {
            case'localhost':
                data = {
                    endPoint: 'http://localhost:5000/'
                };
                break;
            case 'staging.career.lftechnology.com':
                data = {
                    endPoint: 'http://staging.career.lftechnology.com/'
                };
                break;
            default:
                data = {
                    endPoint: 'http://career.lftechnology.com/'
                };
        }
        return data[value];
    }
}
