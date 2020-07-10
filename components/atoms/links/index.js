

export const Links = ( { list = [] } ) => {
    return list.map( linkObj => <a href={ linkObj.link } className='no-underline hover:underline ml-8'>{ linkObj.text }</a>)
}

export default Links;