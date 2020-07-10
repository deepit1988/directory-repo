import Link from 'next/link';

export const Links = ( { list = [] } ) => {
    return list.map( linkObj => <Link href={ linkObj.link } ><a className=''>{ linkObj.text }</a></Link>)
}

export default Links;