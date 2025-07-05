import {
	Avatar,
	Divider,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Skeleton,
	Typography
} from "@mui/joy";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import BigNumber from "bignumber.js";
import { observer } from "mobx-react";
import { EthUtils } from "@accumulatedfinance/frontend-toolkit";
import {logoUtils} from "../../initLib";
import {useStore} from "../../StoreProvider";
import {BigNumberContext} from "../../contexts/BigNumberContext";
import {Address} from "viem";

interface IProps {
	children: ReactNode;
	chainId: BigNumber;

	tokenSymbol: string;
	tokenAddress: Address;
	tokenDecimals1: BigNumber;

	availableBalance: BigNumber;

	inputLabel: string;

}

const BridgeFormControl: FC<IProps> = observer((x) => {
	const { appStore } = useStore();

	const [inputAmount, setInputAmount] = useState<string>('');

	const inputAmountBN = EthUtils.toETH(inputAmount, x.tokenDecimals1);

	useEffect(() => {
		setInputAmount('');
	}, [x.chainId]);

	const onAvailableBalanceClick = (value: BigNumber) => {
		setInputAmount(value.toFixed());
	};

	return (
		<>
			<FormControl>
				<FormLabel>
					<Typography component="span" level="title-sm" fontWeight="bold">
						{x.inputLabel}
					</Typography>
				</FormLabel>

				<Input
					size="lg"
					placeholder="0"
					endDecorator={
						<>
							<Divider orientation="vertical" />
							{x.chainId && x.tokenAddress && x.tokenSymbol ? (
								<Avatar
									src={logoUtils.getTokenLogo(x.chainId, x.tokenAddress)}
									variant="solid"
									sx={{ "--Avatar-size": "22px", mr: 0.75, ml: 1.25 }}
								>
									{x.tokenSymbol}
								</Avatar>
							) : (
								<Skeleton variant="circular" width={22} height={22} sx={{ mr: 0.75, ml: 1.25 }} />
							)}
							<Typography component="span" fontWeight="bold">
								{x.tokenSymbol || <Skeleton>TOKEN</Skeleton>}
							</Typography>
						</>
					}
					value={inputAmount}
					onChange={(e) => setInputAmount(e.target.value)}
				/>

				<FormHelperText>
					Available:&nbsp;
					{appStore.chainId?.eq(x.chainId) ? (
						<Link to="#" onClick={() => onAvailableBalanceClick(x.availableBalance)}>
							{x.availableBalance.toFixed()}
						</Link>
					) : (
						<>...</>
					)}
				</FormHelperText>
			</FormControl>

			<BigNumberContext.Provider value={inputAmountBN}>
				{x.children}
			</BigNumberContext.Provider>
		</>
	);
});

export default BridgeFormControl;
