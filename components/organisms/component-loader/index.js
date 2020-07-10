import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import dynamic from 'next/dynamic';

// // CMS Components

const BannerPicker = dynamic( ()=>import( 'components/organisms/banner' ) );
const ArticlesList = dynamic( ()=>import( 'components/molecules/articles-list' ) );
const FloristFinder = dynamic( ()=>import( 'components/molecules/florist-finder' ) );

import styles from './index.pcss';

const components = {
    
    'florist-finder': FloristFinder,    
    'banner': BannerPicker,
    'articles-list': ArticlesList

};

class ComponentLoader extends Component {

    static propTypes = {
        attributes: PropTypes.object,
        component: PropTypes.string.isRequired,
        page: PropTypes.string,
    };

    render() {

        const {
            attributes,
            component: componentName,
            error,
        } = this.props;

        const Comp = components[ componentName ];

        if ( !Comp || !attributes ) return null;

        

        const classesCmsComponent = classNames(
            'cms-component',
            styles.cmsComponent,
            [ `${ componentName }-comp` ],
            {
                noBottomMargin: hasNoBottomMargin,
                [styles.noBottomMargin]: hasNoBottomMargin,
            } );

        //if ( attributes && attributes.theme ) attributes.componentTheme = attributes.theme;

        return (
            <div className={ classesCmsComponent }>
                <ErrorBoundary>
                    { error &&
                        { /*<ErrorLog error={ error } component={ componentName } /> */ }
                    }
                    { !error &&
                        <Comp
                            //componentName={ componentName }
                            bannerId = { this.props.componentUniqueId }
                            { ...attributes }
                            { ...this.props }
                        />
                    }
                </ErrorBoundary>
            </div>
        );

    }

}

export default ComponentLoader;