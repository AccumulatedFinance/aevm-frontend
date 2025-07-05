import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
import {AvatarComponentProps} from "@rainbow-me/rainbowkit/dist/components/RainbowKitProvider/AvatarContext";
import {FC} from "react";

const CustomAvatar: FC<AvatarComponentProps> = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img src={ensImage} width={size} alt={"customAvatar"} height={size} style={{ borderRadius: size }} />
  ) : (
    <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
  );
};

export default CustomAvatar;