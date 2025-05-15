import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import companyLogo from "../../assets/company-logo.png";

import "./JobDetail.css";
import Header from "../../components/Header";

const fakeJob = {
  id:1,
  title: "Gia sư Toán lớp 10",
  type: "Part-time",
  category: "Gia sư",
  address: "Ngõ 265, Lương Thế Vinh, Nam Từ Liêm, Trung Văn, Hà Nội",
  salary: "200.000đ/giờ",
  experienceRequired: "1 năm",
  company: {
    avatar: null,
    name: "G8 - Onschool",
    location: "Hà Nội",
    people: 100,
    addresses: "74 ngõ Xã Đàn 2, Nam Đồng, Đống Đa, Hà Nội",
    Job: "Giảng dạy",
  },
  quantity: 2,
  schedule: "Thứ 2, 4, 6 (18:00 - 20:00)",
  startDate: "2025-06-01",
  endDate: "2025-08-31",
  description: [
    "Dạy kèm Toán cho học sinh lớp 10.",
    "Ôn tập kiến thức căn bản và nâng cao.",
    "Báo cáo kết quả học tập mỗi tháng.",
  ],
};


const JobDetailPage = () => {
  const { id } = useParams();
  console.log("id from useParams:", id);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/v1/jobs/detail/${id}`
        );
        console.log(response.data);
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job:", err);
        setError("Không thể tải dữ liệu công việc");
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);



  return (
    <div className="home-page">
      <Header />
      <div className="page-content">
        <div className="job-container">
          <div className="newdiv">
            <h1 className="job-title">{job.title}</h1>
            <div className="badges">
              <span className="badge type">{job.type}</span>
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
                  <MonetizationOnIcon /> {job.salary}
                </li>
                <li>
                  <WorkHistoryIcon />{" "}
                  {job.experienceRequired || "Không yêu cầu kinh nghiệm"}
                </li>
                <li>
                  <PeopleIcon /> {job.quantity} người
                </li>
                <li>
                  <AccessTimeIcon /> {job.schedule}
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
                  <div className="company-location">{job.company.location}</div>
                </div>
              </div>
              <div className="info">
                <li>
                  <PeopleIcon /> {job.company.people} người
                </li>
                <li>
                  <MonetizationOnIcon /> {job.company.Job}
                </li>
                <li>
                  <LocationOnIcon /> {job.company.addresses}
                </li>
              </div>
            </div>
          </div>

          <h2>Mô tả chi tiết công việc</h2>
          <div className="job-description">
            <ul>
              {job.description?.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
