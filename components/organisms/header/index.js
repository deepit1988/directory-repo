
import Logo from '../../atoms/logo';
import Links from '../../atoms/links';

const list = [ 
    { text: 'Locaitons', link: '/locaitons' }, 
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' }];

export function Header() {   

    return (
        <header class = 'h-30 flex px-10 py-4'>
            <Logo className={ 'site-logo' } />
            <div className = {'px-10 text-2xl justify-center italic font-medium'}> Wedding Florist Directory </div>
            <div className ='flex ml-auto'><Links list = { list }/></div>
        </header>
    )
  }

export default Header;