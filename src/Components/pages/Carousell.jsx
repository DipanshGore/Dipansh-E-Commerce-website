import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";

import Design1Video from "../../assets/Design1.mp4";
import TomVideo from "../../assets/Tom.mp4";
import RolexVideo from "../../assets/Rolex.mp4";
import WatchVideo from "../../assets/Watch.mp4";

const Carousell = () => {
  return (
    <div>
      <Carousel 
        showIndicators={false} 
        showArrows={false} 
        showThumbs={false} 
        autoPlay={true} 
        infiniteLoop={true} 
        interval={10000} 
        stopOnHover={false}
      >
        {/* Video Slides */}
        <div>
          <video className="h-[800px] w-full object-cover" autoPlay loop muted>
            <source src={Design1Video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <video className="h-[680px] w-full object-cover" autoPlay loop muted>
            <source src={TomVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <video className="h-[800px] w-full object-cover" autoPlay loop muted>
            <source src={RolexVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <video className="h-[800px] w-full object-cover" autoPlay loop muted>
            <source src={WatchVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </Carousel>
    </div>
  );
};

export default Carousell;
