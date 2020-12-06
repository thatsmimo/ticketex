import React from "react";
import Lottie from "react-lottie";
import { Assets } from "../../Common";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: Assets.others.anim_loading,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const FullPageLoader = () => {
  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  );
};
export default FullPageLoader;
