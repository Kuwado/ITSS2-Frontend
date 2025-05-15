import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./SearchBar.css";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ gray = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const handleChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = () => {
    const searchParams = new URLSearchParams(location.search);
    if (name) {
      searchParams.set("name", name);
    }
    if (address) {
      searchParams.set("address", address);
    }
    navigate(`/jobs?${searchParams.toString()}`);
  };

  return (
    <div className={gray ? "search-bar gray" : "search-bar"}>
      <div className="search-name">
        <TextField
          label={
            <div className="search-item-label">
              <SearchIcon sx={{ color: "#6300b3" }} />
              <span>Tên công việc</span>
            </div>
          }
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
      </div>

      <div className="search-address">
        <FormControl fullWidth>
          <InputLabel id="address-label">
            <div className="search-item-label">
              <LocationOnIcon sx={{ color: "#6300b3" }} />
              <span>Địa điểm</span>
            </div>
          </InputLabel>
          <Select
            labelId="address-label"
            id="address-select"
            value={address}
            onChange={handleChange}
            label="Chọn tùy chọn"
          >
            <MenuItem value={10}>Tùy chọn 1</MenuItem>
            <MenuItem value={20}>Tùy chọn 2</MenuItem>
            <MenuItem value={30}>Tùy chọn 3</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="search-btn-container">
        <Button
          className="search-btn"
          variant="contained"
          color="primary"
          onClick={handleSearch}
        >
          Tìm kiếm
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
