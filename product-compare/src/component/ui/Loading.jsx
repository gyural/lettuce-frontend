import React from "react";
import {DotLoader} from "react-spinners";

const Loading = ({ loading }) => {
  return (
    <div>
      <DotLoader
        color="#58B37C"
        loading={loading}
        size={150}
      />
      <p
        style={{
        color : "#000",

        }}
      >로딩중 입니다...</p>
    </div>
  );
};
export default Loading;