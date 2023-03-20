import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "../../hook/useFetch";
import { BASE_URL } from "../../ultil/config";

const FeaturedTourList = () => {
  const {data,loading,error} = useFetch(
    `${BASE_URL}/tours/search/getFeatureTour`
  );
  console.log(data);
  return (
    <>
    {loading && <h4>Loading...</h4>}
    {error && <h4>{error}</h4>}
      {!loading && data?.map((tour) => (
        <Col lg="3" md='6' sm='6' className="mb-4" key={tour._id}>

          <TourCard tour={tour} />

        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;
