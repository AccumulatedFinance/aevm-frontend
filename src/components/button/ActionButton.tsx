import { Button, ColorPaletteProp } from "@mui/joy";
import React, { FC, ReactNode } from "react";
import { useSwitchChain } from "wagmi";

import { IconContext } from "react-icons";
import { TbSwitchHorizontal } from "react-icons/tb";
import BigNumber from "bignumber.js";
import { observer } from "mobx-react";
import {useStore} from "../../StoreProvider";
import {chainProvider} from "../../initLib";

type ColorProps = "md" | "lg" | "sm"

type Action = () => void

interface IProps {
	actionName?: string;
	chainId: BigNumber;
	action?: Action;
	color?: ColorPaletteProp;
	size?: ColorProps;
	disabled?: boolean;
	children?: ReactNode;
}

const ActionButton: FC<IProps> = observer(({ actionName, chainId, action, color, size, disabled, children }) => {
	const { switchChain } = useSwitchChain();

	const { appStore } = useStore();

	let doAction: () => void;
	if (appStore.chainId?.eq(chainId) && action !== undefined) {
		doAction = action;
	} else {
		doAction = () => {
			if (switchChain) {
				switchChain({ chainId: chainId.toNumber() });
			}
		}
	}

	return (
		<Button
			color={color || "primary"}
			variant={appStore.chainId === undefined || appStore.chainId.eq(chainId) ? "solid" : "outlined"}
			size={size || "lg"}
			disabled={appStore.chainId === undefined || (disabled && appStore.chainId.eq(chainId))}
			onClick={() => { doAction() }}
			sx={{ pl: 2.25, pr: 2.5 }}
		>
			{appStore.chainId === undefined || appStore.chainId.eq(chainId) ? (
					<>
						{children}
						{actionName}
					</>
				) :
				<>
					<IconContext.Provider value={{ className: 'react-icons' }}>
						<TbSwitchHorizontal />
					</IconContext.Provider>
					Switch to {chainProvider.findChainById(chainId)?.name}
				</>
			}
		</Button>
	)
});
export default ActionButton;