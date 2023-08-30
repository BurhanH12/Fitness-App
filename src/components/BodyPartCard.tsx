import React, { useEffect, useState } from "react";
import { fetchBodyParts } from "~/utils/fetchBodyParts";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

interface BodyPartImages {
  [key: string]: string;
}

const BodyPartCard: React.FC = () => {
  const [bodyParts, setBodyParts] = useState<string[]>([]);

  // Object mapping body part names to image URLs
  const bodyPartImages: BodyPartImages = {
    back: "/BodyParts/back.jpg",
    cardio: "/BodyParts/cardio.jpg",
    chest: "/BodyParts/chest.jpg",
    lowerarm: "/BodyParts/lowerarm.jpg",
    lowerlegs: "/BodyParts/lowerlegs.jpg",
    neck: "/BodyParts/neck.jpg",
    shoulders: "/BodyParts/shoulder.jpg",
    upperarms: "/BodyParts/upperarms.jpg",
    upperlegs: "/BodyParts/upperlegs.jpg",
    waist: "/BodyParts/waist.jpg",
    // Add more mappings for other body parts
  };

  const bodyPartNameToKey: { [name: string]: any } = {
    "lower arms": "lowerarm", // Map body part names with spaces to keys
    "lower legs": "lowerlegs",
    "upper arms": "upperarms",
    "upper legs": "upperlegs",
    "back": "back",
    "cardio": "cardio",
    "chest": "chest",
    "neck": "neck",
    "shoulders": "shoulders",
    "waist": "waist",
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const getBodyParts = async () => {
    try {
      const bodyPartsData = await fetchBodyParts();
      setBodyParts(bodyPartsData);
      // console.log("Response", bodyPartsData);
      // Use the bodyPartsData as needed
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    // Get all Body Parts
    // getBodyParts();
  }, []);

  return (
    <div className="my-4 gap-2">
      <Carousel
        responsive={responsive}
        infinite={false}
        arrows={true}
        autoPlay
        draggable
        minimumTouchDrag={0}
        autoPlaySpeed={10000}
        customTransition="all 1s linear"
        transitionDuration={500}
        showDots={false}
        containerClass="carousel-container"
        itemClass="carousel-item gap-4"
      >
        {bodyParts.map((bodyPart, index) => (
          <div
            key={index}
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px",
            }}
            className="ml-2 mr-2 max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
          >
            <a href="#">
              <img
                className="mx-auto h-64 w-64 rounded-full object-cover "
                src={bodyPartImages[bodyPartNameToKey[bodyPart.toLowerCase()]]}
                alt=""
                draggable="false"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {bodyPart}
                </h5>
              </a>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BodyPartCard;
