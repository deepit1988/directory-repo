import React from 'react';
import PropTypes from 'prop-types';


const Image = (props) => {

    const {
        alt,
        imageURL,
        usePlaceholder,
        settings,
    } = props;


    return (
        <React.Fragment>
            <picture alt={alt}>
                <source media="(min-width:650px)" srcset={imageURL} />
                <source media="(min-width:465px)" srcset={imageURL} />
                <img src={imageURL} alt={alt} class={settings}   />
            </picture>
        </React.Fragment>
    );

};

Image.propTypes = {
    alt: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    usePlaceholder: PropTypes.bool,
    settings: PropTypes.string,
};

export default Image;
