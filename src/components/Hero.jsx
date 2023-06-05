import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Example data
const carouselData = [
  {
    id: 1,
    image:
      "https://img.freepik.com/free-vector/time-travel-vector-flyer-with-white-copy-space-sky-with-airplane_134830-1061.jpg?w=1060&t=st=1685752511~exp=1685753111~hmac=2ba3daac953436c87ffe9184bec95247dd42c9a60742adec36064c5346fb37ae",
    caption: "Image 1",
  },
  {
    id: 2,
    image:
      "https://img.freepik.com/free-vector/time-travel-vector-flyer-with-white-copy-space-sky-with-airplane_134830-1061.jpg?w=1060&t=st=1685752511~exp=1685753111~hmac=2ba3daac953436c87ffe9184bec95247dd42c9a60742adec36064c5346fb37ae",
    caption: "Image 2",
  },
  {
    id: 3,
    image:
      "https://img.freepik.com/free-vector/time-travel-vector-flyer-with-white-copy-space-sky-with-airplane_134830-1061.jpg?w=1060&t=st=1685752511~exp=1685753111~hmac=2ba3daac953436c87ffe9184bec95247dd42c9a60742adec36064c5346fb37ae",
    caption: "Image 3",
  },
  // ... more data
];

// Carousel component
function Hero() {
  return (
    <div style={{ maxHeight: "10vh !important" }}>
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        width="100%"
      >
        {carouselData.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.caption} />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Hero;
