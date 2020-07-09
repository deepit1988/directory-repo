import axios from 'axios';
import services from './services';
import { HttpsAgent as KeepAgent } from 'agentkeepalive';

const httpsAgent = new KeepAgent( {
    freeSocketTimeout: 2 * 60000,
    rejectUnauthorized: false,
} );

const instance = ( serviceName, configuration = {}, invocations = 1 ) => {

    // If we are running in the browser and attempting to make an AJAX request before the DOM has
    // loaded then bump the timeout
    const defaultTimeout = 10000; //process.browser && window.document.readyState !== 'complete' ? 60000 : 10000;

    const serviceConfig = services.getService( serviceName ); 

    const config = Object.assign(
        {
            timeout: defaultTimeout,
            httpsAgent,
        },
        serviceConfig,
        configuration
    );

    const serviceInstance = axios.create( config );

    return serviceInstance;

};

const get = async ( serviceName, configuration = {} ) => {
        
    const serviceInstance = instance( serviceName, configuration );

    const response = await serviceInstance
    .request()
    .then( ( res ) => {

        if ( res && res.errorHandled ) {                

            return res.data;

        }

        if ( res === undefined ) {

            console.log('no response');

        }
        else if ( res.data && res.data.errors ) {

            //logServiceError( logger, serviceName, 'GET received errors', { config: configuration, response: res }, !shouldRetry() );
            console.log('Serice responded with errors');

        }
        else {                

            if ( res.data.redirect ) {

                return res.data.redirect.redirectUrl;

            }

            return res && res.data;

        }

    } )
    .catch( ( error ) => {

        const errorList = [ 301, 302, 303, 304, 305, 306, 307 ];

        if ( error && error.response ) {

            if ( error.response.status === 401 ) {

                return error.response;

            }

            if ( error.response.status === 404 ) {

                didFail = false;

            }

            if ( errorList.includes( error.response.status ) && typeof error === 'object' ) {

                didFail = false;

                return error.response.headers.location;

            }

        }

        //logServiceError( logger, serviceName, 'GET Failed', error, !shouldRetry() );

        console.log('Exception on service call')

    } );  
    
    return response;

};

const post = async ( serviceName, configuration = {} ) => {

    const config = Object.assign(
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
        },
        configuration
    );

    const serviceInstance = instance( serviceName, config );

    return await serviceInstance
    .request()
    .then( ( res ) => {

        if ( res === undefined ) {

            console.log('response undefined');

        }
        else if ( res && res.errorHandled && res.retryOnError ) {

            configuration.retryOnError = false;

            return post( serviceName, configuration );

        }
        else if ( res.data && res.data.errors ) {

            console.log('service responded with errors')

        }

        return res && res.data;

    } )
    .catch( ( error ) => {

        //logServiceError( logger, serviceName, 'POST failed', error );
        console.log('Exception at post call');

    } );

};

export default {
    get,
    post    
};