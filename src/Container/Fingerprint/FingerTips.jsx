import React from "react";
import { getMarginLeft } from "./helper";
import { Tooltip } from "antd";
import { ImCheckmark, ImCross } from "react-icons/im";

const FingerTips = ({ name, onClickFingerprint, onClickCross, isUploaded }) => (
  <div className="finger">
    <p className="text-center">
      <Tooltip title={name}>
        {isUploaded ? (
          <ImCheckmark
            size={12}
            onClick={onClickFingerprint}
            color="green"
            style={{ cursor: "pointer", marginLeft: "7px" }}
          />
        ) : (
          <img
            src="/fingerprint.png"
            height={"20px"}
            width={"25px"}
            onClick={onClickFingerprint}
            style={{ cursor: "pointer" }}
          />
        )}
      </Tooltip>
    </p>
    {/* {!isUploaded && (
      <p className="">
        <Tooltip title={`Add exception remarks for ${name}`}>
          <ImCross
            size={12}
            color="red"
            onClick={onClickCross}
            style={{
              cursor: "pointer",
              marginLeft: getMarginLeft(name),
            }}
          />
        </Tooltip>
      </p>
    )} */}
  </div>
);
export default FingerTips;
