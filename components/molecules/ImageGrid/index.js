import React from 'react';
import PropTypes from 'prop-types';
import Image from '../../atoms/Image/index';
import Link from '../../atoms/Link/index';


const ImageGrid = (props) => {

    return (
        <div class="w-1/4 px-6 py-6">
            <div class="w-full  mb-1 ">
                <Image settings="w-40" imageURL="//s7img.ftdi.com/is/image/ProvideCommerce/20-J2D_LOL?$ftd-tile-wide-mv-new$" alt="test" />
            </div>
            <div class="w-full  mb-1 ">
                <div className="w-full font-bold text-sm mb-2">The Coldest Sunset</div>
                <p className="w-1/2 text-gray-700 text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
               </p>
            </div>
            <div class="w-full  mb-1 ">
                <Link URL="#" settings="text-xs underline" text="Learn More" />
            </div>
        </div>
    );

};



export default ImageGrid;
