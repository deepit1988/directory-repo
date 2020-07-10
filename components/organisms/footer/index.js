
import Links from '../../atoms/links';
import footerLinks from '../../../static/data/footer-links.json';

const normalizeData = ( key, data ) => {

    if ( Array.isArray ( data ) ) {

        return {

            heading: key,
            links: data,

        };

    }

    return data;

};

export function Footer() {      
    
    const footerLinksByCat = Object.keys( footerLinks ).map( key => normalizeData( key, footerLinks[key]) );    

    return (
        <footer className = 'flex py-4 bg-pink-200'>            
            { footerLinksByCat.map( catLinks => 
                <div className='flex flex-col mx-10'>
                    <b className='uppercase'>{ catLinks.heading }</b>
                    <Links list = { catLinks.links }/>
                </div> 
            ) }
        </footer>
    )
  }

export default Footer;