import { Button } from "@mui/material";
import "./Card.css";
import { useNavigate } from "react-router-dom";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PinDropIcon from "@mui/icons-material/PinDrop";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import companyLogo from "../../assets/company-logo.png";

const JOB = {
  id: 1,
  name: "Dạy thêm tiếng Anh lớp 8 ",
  jobType: "Part-time",
  category: "Gia sư",
  company: {
    avatar: null,
    name: "G8 - Onschool",
    location: "Hà Nội",
  },
  address: "Ngõ 265, Lương Thế Vinh, Nam Từ Liêm, Trung Văn, Hà Nội",
  salary: 250000,
  deadline: 18,
};

const formatPrice = (amount) => {
  if (isNaN(amount)) return "0 đ/buổi";
  return `${Number(amount).toLocaleString("vi-VN")} đ/buổi`;
};

const Card = ({ job = JOB }) => {
  const navigate = useNavigate();

  const handleViewDetail = () => {
    navigate(`/jobs/${job.id}`);
  };

  return (
    <div className="card">
      <div className="card-name">
        <span>{job.name}</span>
        <BookmarkBorderIcon />
      </div>

      <div className="card-tags">
        <div className="card-tag type">{job.jobType}</div>
        <div className="card-tag category">{job.category}</div>
      </div>

      <div className="company">
        <div className="avatar">
          <img src={job.avatar ?? companyLogo} alt="company-logo" />
        </div>
        <div className="company-info">
          <div className="company-name">{job.company.name}</div>
          <div className="company-location">{job.company.location}</div>
        </div>
      </div>

      <div className="card-item">
        <div className="item-icon">
          <PinDropIcon />
        </div>
        <div
          className="job-address"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {job.address}
        </div>
      </div>

      <div className="card-item salary">
        <div className="item-icon">
          <MonetizationOnIcon />
        </div>
        <div className="job-salary">
          <div className="salary-vnd">{formatPrice(job.salary)}</div>
          <div className="deadline">Còn {job.deadline} ngày</div>
        </div>
      </div>

      <div className="btn-conatainer">
        <Button
          className="view-detail-btn"
          variant="outlined"
          onClick={() => handleViewDetail()}
        >
          Xem chi tiết
        </Button>
      </div>
    </div>
  );
};

export default Card;
