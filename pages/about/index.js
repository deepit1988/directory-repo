import Link from 'next/link';
import React, { useEffect } from 'react';
import request from '../../library/js/modules/request';

export function About() {

    useEffect( () => {

        debugger;

        request.get( 'zip', {
            params: {}
        } ).then( ( res )=>{
    
            console.log('sample get call');
            //return '';
    
        } )
        .catch( ( err ) => {
            debugger;
    
            console.log('Exception on get call');
            //return '';
    
        } );

    }, [] );

    return ( 
        <div>
            <h1>This is About page</h1>
            Go to <Link href="/home"><a> Home!</a></Link>
        </div>
    )
}

export default About;