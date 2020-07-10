import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.pcss';

const Button = ( props ) => {

    const {
        context,
        label,
        target,
        showLoaderIcon,
        ...attributes
    } = props;


    return (
        <button { ...attributes }>
            { !showLoaderIcon && label }
            { props.children }
            { showLoaderIcon &&
            
                <div className={ styles.ctaLoader }>
                    <div className={ classNames( styles.loadingSvg, 'loadingSvg' ) }>
                        <p className={ classNames( styles.dot, styles.one ) }>.</p>
                        <p className={ classNames( styles.dot, styles.two ) }>.</p>
                        <p className={ classNames( styles.dot, styles.three ) }>.</p>
                    </div>
                </div>
            }            
        </button>
    );

};

Button.propTypes = {
    label: PropTypes.string,
};

export default Button;
