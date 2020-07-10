import React from 'react';
import PropTypes from 'prop-types';


const Link = (props) => {

    const {
      URL ,
      text,
      settings
    } = props;


    return (
        <React.Fragment>
            <a class={settings} href={URL} >{text}</a>
        </React.Fragment>
    );

};

Link.propTypes = {
   
    URL: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    settings: PropTypes.string
};

export default Link;
