import React from "react";
import galleryImages from "./galleryImage";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const MasonryImage = () => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 768: 2, 992: 4 }}
    >
        <Masonry gutter="1rem">
            {
                galleryImages.map((item,index)=>(
                    <img className="masonry__img" src={item} alt="" key={index} style={{width:'100%',display:'block',borderRadius:'10px'}}/>
                ))
            }
        </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImage;
