import React from 'react';
import PropTypes from 'prop-types';
import Image from '../Image/index';

const Banner = (props) => {

    const {
        alt,
        imageURL,
        settings,
        content,
        heading
    } = props;

    return (
        <div className="flex items-center">
            <div className="relative">
                <Image settings="w-auto" imageURL={imageURL} alt={alt} />
                <div className={settings} >
                    <div className="font-bold text-sm mb-2">{heading}</div>
                    <p className="text-xs">
                       {content}
                    </p>
                </div>
            </div>
        </div>
    );

};

Banner.propTypes = {
    alt: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    settings: PropTypes.string,
    content: PropTypes.string,
    heading: PropTypes.string
};



export default Banner;
