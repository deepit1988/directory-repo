//import utils from 'js/modules/utils';
//import get from 'lodash.get';

//const cookies = require( 'js-cookie' );

class Services {

    constructor() {

        if ( !Services.instance ) {

            Services.instance = this;

        }

        return Services.instance;

    }       

    getService( name ) {        

        const baseDomain = 'https://api-gateway.ftd.com';    
        const brand = 'ftd';

        const service = {            

            'fb-login': `${ baseDomain }/accounts/${ brand }/api/facebooklogin`,

            'google-login': `${ baseDomain }/accounts/${ brand }/api/googlelogin`,

            zip: {
                method: 'get',
                params: {}, // do not include any default params
                baseURL: `${ baseDomain }/addressverification/${ brand }/api/verifyZipCode?zipCode=02889`,                
            }

            
        };

        return service[ name ];

    }   

}

export default new Services();