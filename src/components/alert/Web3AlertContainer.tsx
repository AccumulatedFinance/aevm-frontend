import { Stack } from "@mui/joy";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode,
}

const Web3AlertContainer: FC<IProps> = ({ children }) => {
  return (
    <Stack className="web3-alert-container" spacing={2} sx={{
      position: 'absolute',
      top: 0,
      textAlign: 'left'
    }}>
      {children}
    </Stack>
  )
}
export default Web3AlertContainer;