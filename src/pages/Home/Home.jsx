import Header from "../../components/Header";
import "./Home.css";
import banner from "../../assets/banner.png";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState } from "react";
import Card from "../../components/Card/Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useLocation, useNavigate } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 3,
  },
  laptop: {
    breakpoint: { max: 1280, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  minitablet: {
    breakpoint: { max: 768, min: 480 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 2,
  },
};

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [newestJobs, setNewestJobs] = useState([1, 2, 3, 4]);
  const [forYoujobs, setForYouJobs] = useState([1, 2, 3, 4]);

  const handleViewNewestJobs = () => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", "newest");
    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className="home-page">
      <Header />

      <div className="banner">
        <img src={banner} alt="" />
        <div className="banner-text">
          <div className="banner-text-1">
            Đưa ra những gì bạn thích, chúng tôi sẽ đưa ra những gì bạn muốn.
          </div>
          <div className="banner-text-2">
            Có rất nhiều nhà tuyển dụng đang chờ đón bạn.
          </div>
          <SearchBar />
          <div className="banner-text-3">
            Gợi ý: Gia sư, phục vụ, cộng tác viên lập trình, pháp sư ...
          </div>
        </div>
      </div>

      <div className="page-content">
        <div className="job-list-container">
          <div className="job-list-title-container">
            <div className="job-list-title">Công việc mới nhất</div>
            <div className="job-list-des">
              Lựa chọn những doanh nghiệp uy tín hàng đầu
            </div>
          </div>

          <div className="job-list">
            <Carousel
              className="hover"
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={["minitablet", "mobile"]}
            >
              {newestJobs.length > 0 &&
                newestJobs.map((job, index) => (
                  <Card key={`newest-job-${index}`} />
                ))}
            </Carousel>
          </div>

          <div className="view-all-btn" onClick={handleViewNewestJobs}>
            Xem tất cả
          </div>
        </div>

        <div className="job-list-container">
          <div className="job-list-title-container">
            <div className="job-list-title">Công việc phù hợp với bạn</div>
            <div className="job-list-des">
              Lựa chọn những doanh nghiệp uy tín hàng đầu
            </div>
          </div>

          <div className="job-list">
            <Carousel
              className="hover"
              responsive={responsive}
              infinite={true}
              removeArrowOnDeviceType={["minitablet", "mobile"]}
            >
              {forYoujobs.length > 0 &&
                forYoujobs.map((job, index) => (
                  <Card key={`for-u-job-${index}`} />
                ))}
            </Carousel>
          </div>

          <div className="view-all-btn" onClick={handleViewNewestJobs}>
            Xem tất cả
          </div>
        </div>

        <div className="favorite-companies">
          <div className="favorite-title-container">
            <div className="favorite-title">Top các công ty nổi tiếng</div>
            <div className="line"></div>
          </div>
          <div className="company-list"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
