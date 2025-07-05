import { ColorPaletteProp, Snackbar, SnackbarOrigin, Button } from "@mui/joy";
import { FC, ReactNode, useState } from "react";
import { RiCloseCircleFill } from "react-icons/ri";

interface IProps {
  type?: Type,
  msg?: string;
  isOpen?: boolean;
  color?: ColorPaletteProp
  children?: ReactNode,
}

type Type = 'popup' | 'inline';

interface IState extends SnackbarOrigin {
  _open: boolean;
}

const BaseSnackbar: FC<IProps> = ({msg, isOpen, color, children }) => {
  const [state, setState] = useState<IState>({
    _open: isOpen ? isOpen : false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, _open } = state;

  const handleClose = () => {
    setState({ ...state, _open: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={_open}
      sx={{ wordBreak: "break-all" }}
      color={color ? color : "primary"}
      variant="soft"
      endDecorator={
        <Button
          onClick={handleClose}
          size="sm"
          variant="soft"
          color={color ? color : "primary"}
        >
          <RiCloseCircleFill />
        </Button>
      }
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
      }}
      key={vertical + horizontal}
      className="web3-alert"
    >
      <div>
        {children}
        {msg}
      </div>
    </Snackbar>
  );
}
export default BaseSnackbar;