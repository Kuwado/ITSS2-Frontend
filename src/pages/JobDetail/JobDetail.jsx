import React, { useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import companyLogo from "../../assets/company-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./JobDetail.css";
import Header from "../../components/Header";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/jobs/detail/${id}`
        );
        console.log("Dữ liệu trả về:", response.data);
        setJob(response.data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };
    fetchJob();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }
  return (
    <div className="home-page">
      <Header />
      <div className="page-content">
        <div className="job-container">
          <div className="newdiv">
            <h1 onClick={() => navigate(-1)} className="job-title">
              <FontAwesomeIcon icon={faChevronLeft} />
              {job.title}
            </h1>
            <div className="badges">
              <span className="badge type">{job.jobType}</span>
              <span className="badge category">{job.category}</span>
            </div>
          </div>

          <h2>Thông tin cơ bản</h2>
          <div className="basic-info">
            <div className="left-column">
              <ul>
                <li>
                  <LocationOnIcon /> {job.address}
                </li>
                <li>
                  <MonetizationOnIcon /> {job.salary}/{job.salaryUnit}
                </li>
                <li>
                  <WorkHistoryIcon />{" "}
                  {job.experienceRequired || "Không yêu cầu kinh nghiệm"}
                </li>
                <li>
                  <PeopleIcon /> {job.numberOfPeople}
                </li>
                <li>
                  <AccessTimeIcon /> {job.workingTime}
                </li>
                <li>
                  <CalendarTodayIcon /> {job.startDate} – {job.endDate}
                </li>
              </ul>
            </div>

            <div className="right-column">
              <div className="company">
                <div className="avatar">
                  <img src={job.avatar ?? companyLogo} alt="company-logo" />
                </div>
                <div className="company-info">
                  <div className="company-name">{job.company.name}</div>
                  <div className="company-location">{job.company.address}</div>
                </div>
              </div>
              <div className="info">
                <li>
                  <PeopleIcon /> {job.company.employeeCount}
                </li>
                <li>
                  <MonetizationOnIcon /> {job.company.industry}
                </li>
                <li>
                  <LocationOnIcon /> {job.company.location}
                </li>
              </div>
            </div>
          </div>

          <h2>Mô tả chi tiết công việc</h2>
          <div className="job-description">
            <ul>
              {job.description.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
