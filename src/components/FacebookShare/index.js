import React from "react";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";

const FacebookShare = ({ data }) => {
  return (
    <FacebookShareButton
      url={window.location.href}
      quote={data && data.title}
      imageURL={data && data.image}
      hashtag={"#SIC"}
      descriotion={data && data.description}
      style={{
        width: "100%",
      }}
      //   className="w-full"
    >
      <div
        style={{
          backgroundColor: "#3b5998",
          fontWeight: 700,
          fontSize: "14px",
          height: "32px",
          display: "flex",
          color: "#fff",
          justifyContent: "center",
          alignItems: "center",
          padding: "6% 8%",
        }}
      >
        <FacebookIcon size={32} />
        Share on Facebook
      </div>
    </FacebookShareButton>
  );
};

export default FacebookShare;
