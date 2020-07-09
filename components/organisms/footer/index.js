
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
        <div class = 'flex px-10 py-4'>            
            { footerLinksByCat.map( catLinks => 
                <div className='flex flex-col'>
                    { catLinks.heading }
                    <Links list = { catLinks.links }/>
                </div> 
            ) }
        </div>
    )
  }

export default Footer;