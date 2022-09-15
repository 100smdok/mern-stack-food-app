import { useState, useEffect } from "react";

const Home = (props) => {
  return (
    <div className="home">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://4.imimg.com/data4/MX/SH/ANDROID-45759449/product-500x500.jpeg"
              alt=""
            />
          </div>
          <div className="col-lg-5">
            <h1 className="font-weight-light">Food Ordering Portal</h1>
            <p>
            A cafeteria, sometimes called a canteen, is a type of food service location in which there is little or no waiting staff table service, whether a restaurant or within an institution such as a large office building or school; a school dining location is also referred to as a dining hall or lunchroom.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
