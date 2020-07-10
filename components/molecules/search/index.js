import React from 'react';
import PropTypes from 'prop-types';


const styles = {

    backgroundImage: "url('static/images/banner3.png')",
    backgroundSize: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: "no-repeat",
};


const Search = (props) => {

    const {
        // content,
        heading
    } = props;

    return (
        <div className="flex items-center justify-center h-40" style={styles}>
            <div className="w-full text-center" >
                <div className="font-bold text-xl mb-2"><h3>{heading}</h3></div>
                <input type="text" class="w-1/4 h-8" placeholder="Enter City or Zip Code" />
                <button class="bg-red-600 mx-4 px-2 py-1">Search Florists</button>
            </div>
           
        </div>
    );

};


Search.propTypes = {

    heading: PropTypes.string
};



export default Search;
