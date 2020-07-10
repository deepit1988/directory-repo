import React from 'react';
import PropTypes from 'prop-types';

const styles = {

    backgroundImage: "url('static/images/banner2.png')",
    backgroundColor: '#ffd5d4',
    backgroundRepeat: "no-repeat",
};

const Banner2 = (props) => {

    const {
      
        content,
        heading
    } = props;

    return (
        <div className="flex items-center justify-center h-40" style={styles}>
            <div className="w-full text-center" >
                <div className="font-bold  text-sm mb-2">{heading}</div>
                <p className="text-xs px-40">
                    {content}
                </p>
            </div>
        </div>
    );

};

Banner2.propTypes = {
   
    content: PropTypes.string,
    heading: PropTypes.string
};



export default Banner2;
