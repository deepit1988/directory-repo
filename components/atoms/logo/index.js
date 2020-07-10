
import Link from 'next/link';
import SvgFtd from './logo-ftd';

const WrappedLogo = ( { className, defaultStyles, label, url } ) => {

    const props = {
        className,
        style: {
            ...defaultStyles,            
        },
    };

    const wrapperProps = { url, anchorProps: props, context: { pageType: 'HOME' } };
    
    return (
        <div className = { 'h-12 w-12'}>
            <Link href= { url }>
                <SvgFtd aria-label={ label } />
            </Link>
        </div>
    );

};


export function HeaderLogo() {
    
    const className = '';
    const style = {};
    const brandLogoLabel = '';
    const homePageUrl = '';

    return (
        <div>
            <WrappedLogo                
                className={ 'h-16 w-16' }
                defaultStyles={ style }                
                label={ brandLogoLabel }                
                url={ homePageUrl || '/' }
            />
        </div>
    )
  }

export default HeaderLogo;