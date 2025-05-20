import React, { useState } from "react";
import "./Profile.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import viettel from "../../assets/viettel.png";
import { Button, TextField } from "@mui/material";

const Profile = () => {
  // Dữ liệu giả cho profile
  const [profile, setProfile] = useState({
    avatar: viettel, // Dùng ảnh mặc định
    fullName: "Alexa Rawles",
    email: "alexarawles@gmail.com",
    address: "",
    major: "",
    school: "",
    jobTypeDesired: "",
    jobPositionDesired: "",
    availability: {
      "Thứ hai": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Thứ ba": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Thứ tư": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Thứ năm": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Thứ sáu": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Thứ bảy": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
      "Chủ nhật": { "Ca sáng": false, "Ca chiều": false, "Ca tối": false },
    }
  });

  // State cho dropdown
  const [dropdowns, setDropdowns] = useState({
    major: false,
    school: false,
    jobType: false,
    jobPosition: false
  });

  // Danh sách lựa chọn cho các dropdown
  const options = {
    major: ["Công nghệ thông tin", "Kinh tế", "Ngoại ngữ", "Sư phạm", "Y khoa"],
    school: ["Đại học Bách Khoa", "Đại học Kinh tế", "Đại học Ngoại thương", "Đại học Quốc gia"],
    jobType: ["Part-time", "Full-time", "Freelancer", "Internship"],
    jobPosition: ["Gia sư", "Nhân viên bán hàng", "Design", "Sales", "IT"]
  };

  // Xử lý khi thay đổi giá trị input
  const handleInputChange = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
  };

  // Xử lý khi chọn một option từ dropdown
  const handleSelectOption = (field, value) => {
    setProfile({
      ...profile,
      [field]: value
    });
    
    // Đóng dropdown sau khi chọn
    setDropdowns({
      ...dropdowns,
      [field === "jobTypeDesired" ? "jobType" : field === "jobPositionDesired" ? "jobPosition" : field]: false
    });
  };

  // Xử lý toggle dropdown
  const toggleDropdown = (dropdown) => {
    setDropdowns({
      ...dropdowns,
      [dropdown]: !dropdowns[dropdown]
    });
  };

  // Xử lý thay đổi lịch trình làm việc
  const handleAvailabilityChange = (day, period) => {
    const updatedAvailability = { ...profile.availability };
    updatedAvailability[day][period] = !updatedAvailability[day][period];
    
    setProfile({
      ...profile,
      availability: updatedAvailability
    });
  };

  // Xử lý cập nhật profile
  const handleUpdateProfile = () => {
    // Giả lập gửi dữ liệu lên server
    console.log("Cập nhật profile:", profile);
    alert("Cập nhật thông tin thành công!");
  };

  return (
    <div className="profile-page">
      <Header />
      
      <div className="profile-gradient-banner"></div>
      
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar-section">
              <img 
                src={profile.avatar} 
                alt="Avatar" 
                className="profile-avatar" 
              />
              <div className="profile-info">
                <h2 className="profile-name">{profile.fullName}</h2>
                <p className="profile-email">{profile.email}</p>
              </div>
            </div>
            
            <Button 
              variant="contained"
              className="update-btn"
              onClick={handleUpdateProfile}
            >
              Cập nhật
            </Button>
          </div>
          
          <div className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Họ và tên</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={profile.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="profile-input"
                />
              </div>
              
              <div className="form-group">
                <label>Địa chỉ</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={profile.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="profile-input"
                  placeholder="Nhập địa chỉ của bạn"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Khoa/Ngành học</label>
                <div className="custom-dropdown">
                  <div 
                    className="dropdown-selection"
                    onClick={() => toggleDropdown("major")}
                  >
                    {profile.major || "Chọn khoa/ngành học"}
                    <KeyboardArrowDownIcon className={`dropdown-icon ${dropdowns.major ? "rotated" : ""}`} />
                  </div>
                  
                  {dropdowns.major && (
                    <div className="dropdown-options">
                      {options.major.map((option, index) => (
                        <div 
                          key={index} 
                          className="dropdown-option"
                          onClick={() => handleSelectOption("major", option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Trường học</label>
                <div className="custom-dropdown">
                  <div 
                    className="dropdown-selection"
                    onClick={() => toggleDropdown("school")}
                  >
                    {profile.school || "Chọn trường học"}
                    <KeyboardArrowDownIcon className={`dropdown-icon ${dropdowns.school ? "rotated" : ""}`} />
                  </div>
                  
                  {dropdowns.school && (
                    <div className="dropdown-options">
                      {options.school.map((option, index) => (
                        <div 
                          key={index} 
                          className="dropdown-option"
                          onClick={() => handleSelectOption("school", option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Loại công việc mong muốn</label>
                <div className="custom-dropdown">
                  <div 
                    className="dropdown-selection"
                    onClick={() => toggleDropdown("jobType")}
                  >
                    {profile.jobTypeDesired || "Chọn loại công việc"}
                    <KeyboardArrowDownIcon className={`dropdown-icon ${dropdowns.jobType ? "rotated" : ""}`} />
                  </div>
                  
                  {dropdowns.jobType && (
                    <div className="dropdown-options">
                      {options.jobType.map((option, index) => (
                        <div 
                          key={index} 
                          className="dropdown-option"
                          onClick={() => handleSelectOption("jobTypeDesired", option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Vị trí làm việc mong muốn</label>
                <div className="custom-dropdown">
                  <div 
                    className="dropdown-selection"
                    onClick={() => toggleDropdown("jobPosition")}
                  >
                    {profile.jobPositionDesired || "Chọn vị trí làm việc"}
                    <KeyboardArrowDownIcon className={`dropdown-icon ${dropdowns.jobPosition ? "rotated" : ""}`} />
                  </div>
                  
                  {dropdowns.jobPosition && (
                    <div className="dropdown-options">
                      {options.jobPosition.map((option, index) => (
                        <div 
                          key={index} 
                          className="dropdown-option"
                          onClick={() => handleSelectOption("jobPositionDesired", option)}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="schedule-section">
              <h3 className="schedule-title">Thời gian làm việc</h3>
              
              <div className="schedule-table">
                <div className="schedule-header">
                  <div className="schedule-day"></div>
                  <div className="schedule-period">Ca sáng</div>
                  <div className="schedule-period">Ca chiều</div>
                  <div className="schedule-period">Ca tối</div>
                </div>
                
                {Object.entries(profile.availability).map(([day, periods]) => (
                  <div className="schedule-row" key={day}>
                    <div className="schedule-day">{day}</div>
                    {Object.entries(periods).map(([period, isAvailable]) => (
                      <div className="schedule-period-cell" key={period}>
                        <input 
                          type="checkbox"
                          checked={isAvailable}
                          onChange={() => handleAvailabilityChange(day, period)}
                          className="schedule-checkbox"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;