import React, { useContext, useState } from "react";
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png"
import { AuthContext } from "../../context/authContext";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
            />
          </div>
          <div className="right">
            {file && (
              <img
                className="file"
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
            <div className="left">
                <input type="file" id="file" style={{display:"none"}}/>
                <label htmlFor="file">
                    <div className="item">
                        <img src={Image} alt="" />
                        <span>Photo or Video</span>
                    </div>
                </label>
                <div className="item">
                    <img src={Map} alt="" />
                    <span>Add Place</span>
                </div>
                <div className="item">
                    <img src={Friend} alt="" />
                    <span>Tag Friends</span>
                </div>
            </div>
            <div className="right">
                <button>Share</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
