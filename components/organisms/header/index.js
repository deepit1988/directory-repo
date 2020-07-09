
import Link from 'next/link';
import Logo from '../../atoms/logo';
import Links from '../../atoms/links';

const list = [ 
    { text: 'Locaitons', link: '/locaitons' }, 
    { text: 'About', link: '/about' },
    { text: 'Contact', link: '/contact' }];

export function Header() {   

    return (
        <div class = 'h-30 flex px-10 py-4'>
            <Logo className={ 'site-logo' } />
            <p className = {'px-10 justify-center'}> Wedding Florist Directory </p>
            <div className ='flex'><Links list = { list }/></div>
        </div>
    )
  }

export default Header;