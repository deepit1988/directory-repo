/* global workbox messenger createBusiness */
/* eslint-disable no-console */

self.importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js'
);

/* Injected scripts - these scripts are injected at build time.  See next.config.js for details */
$BUSINESS$ // eslint-disable-line
$MESSENGER$ // eslint-disable-line


// most resources are build-specific, as defined by this buildId
const buildId = 'NEXT_BUILD_ID';
const business = createBusiness( buildId );
const isDev = business.isDev();
const cacheNames = {
    api: 'api-cache',
    asset: 'asset-cache',
};

const cacheAges = {
    api: 1 * 24 * 60 * 60, // cache api results for one day
    asset: 0.5 * 60 * 60, // cache assets for 30 minutes
};

/**
 * echo - an example message handler
 * Logs the message sent from the page
 * @param {string} event message event
 * @returns {string}
 */
function echo( event ) {

    const origin = event.origin;
    const payload = event.data.payload;

    const echoed = `(${ origin }) echo : ${ payload }`;

    console.log( echoed );

    return echoed;

}
/**
 * clearCaches - handles messages that request that the cache be cleared
 * @param {string} event message event
 * @returns {Promise} a promise to clear the caches (except for precaches)
 */
function clearCaches( event ) {

    const origin = event.origin;

    const namesToDelete = Object.values( cacheNames );

    const deleteRequests = namesToDelete.map( ( name ) => caches.delete( name ) );

    return Promise.all( deleteRequests ).then( () => {

        const clearedCaches = `(${ origin }) clearCaches : [${ namesToDelete.join( ',' ) }]`;

        console.log( clearedCaches );

        return clearedCaches;

    } );

}


/**
 * Handler registration
 * Sets up message handlers by message type
 */
messenger.handle( 'echo', echo );
messenger.handle( 'clearCaches', clearCaches );

workbox.setConfig( {
    debug: isDev,
} );

// let's get this started immediately
workbox.skipWaiting();
workbox.clientsClaim();

/**
 * Logging
 */
workbox.core.setLogLevel( workbox.core.LOG_LEVELS.debug ); // Show warnings and errors.


/**
 * Lifecycle events
 */
self.addEventListener( 'install', function ( event ) {

    console.log( 'Service Worker installing.' );

} );

self.addEventListener( 'activate', function ( event ) {

    console.log( 'Service Worker activating.' );

} );


const message = self.workbox ? `Yay! Workbox is loaded 🎉` : `Boo! Workbox didn't load 😬`;

console.log( message );


/**
 * PRECACHING
 */


console.log( `caching assets for build: ${ buildId }` );

const precacheList = business.getPrecaches().map( ( url ) => ( { url, revision: buildId } ) );

workbox.precaching.precache( precacheList );
workbox.precaching.addRoute();

/**
 * ROUTING
 */
const dynamicParameters = [ 'availability', 'pricing' ];
const isDynamic = new RegExp( `\\?.*(?:${ dynamicParameters.join( '|' ) })` );


/**
 * Determines if the event depends on live data
 * @param {string} event.url url of the request
 * @returns {bool} true if live data is needed
 */
const usesLiveData = ( { url: { href } } ) => href.match( isDynamic ) || href.includes( '/availableDeliveryDates' );
const usesApi = ( { url: { href } } ) => href.includes( '/api/' );
const usesCart = ( { url: { href } } ) => href.includes( '/api\/carts/' );


/**
 * Serve stale content, but then freshen the cache in the background
 * Good for things that change, but don't need to be real-time
 */
workbox.routing.registerRoute(
    // Load cached api data, but update in background
    ( event ) => usesApi( event ) && !usesLiveData( event ) && !usesCart( event ),
    workbox.strategies.staleWhileRevalidate( {
        fetchOptions: {
            credentials: 'include',
        },
        cacheName: cacheNames.api,
        plugins: [
            new workbox.expiration.Plugin( {
                maxAgeSeconds: cacheAges.api,
            } ),
        ],
    } )
);


/**
 * Serve cached content, fetching content only if the cache misses
 */
workbox.routing.registerRoute(
    // Load cached api data, but update in background
    /\/image\//,
    // Use cache but update in the background ASAP
    workbox.strategies.cacheFirst( {
        fetchOptions: {
            credentials: 'include',
        },
        // Use a custom cache name
        cacheName: cacheNames.asset,
        plugins: [
            new workbox.expiration.Plugin( {
                maxAgeSeconds: cacheAges.asset,
            } ),
        ],
    } )
);


const staticExtensions = [
    'js',
    'css',
    'jpe?g',
    'gif',
];
const hasStaticExtension = new RegExp( `\\.(${ staticExtensions.join( '|' ) })$` );

/**
 * Serve cached content, fetching content only if the cache misses
 */
workbox.routing.registerRoute(
    // Load cached api data, but update in background
    hasStaticExtension,
    // Use cache but update in the background ASAP
    workbox.strategies.cacheFirst( {
        fetchOptions: {
            credentials: 'include',
        },
        // Use a custom cache name
        cacheName: cacheNames.asset,
        plugins: [
            new workbox.expiration.Plugin( {
                maxAgeSeconds: cacheAges.asset,
            } ),
        ],
    } )
);