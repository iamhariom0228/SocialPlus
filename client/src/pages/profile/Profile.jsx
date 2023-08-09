import React, { useContext } from "react";
import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const {currentUser} = useContext(AuthContext);
  return (
    <div className="profile">
      <div className="images">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src={currentUser.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon className="social-icon" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon className="social-icon" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon className="social-icon" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon className="social-icon" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon className="social-icon" />
            </a>
          </div>
          <div className="center">
            <span>{currentUser.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>janeDoe</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon className="social-icon" />
            <MoreVertIcon className="social-icon" />
          </div>
        </div>
        <Posts />
      </div>
    </div>
  );
};

export default Profile;