import React, { FC } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { observer } from "mobx-react";
import BigNumber from "bignumber.js";
import { Address } from "viem";
import { IconContext } from "react-icons";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import {useTransactionEffect} from "../hooks/useTransactionEffect";
import ActionButton from "./ActionButton";
import {useBigNumberContext} from "../../contexts/BigNumberContext";

interface Props {
	chainId: BigNumber;
	bridgeContract: Address;
	balance: BigNumber | undefined;
	cap?: BigNumber;
	tokenDecimals: BigNumber;
	actionName: string;
}

const BridgeTokenButton: FC<Props> = observer(({ chainId, bridgeContract, balance, cap, tokenDecimals, actionName }) => {
	const amount = useBigNumberContext();

	//todo to change
	console.log(tokenDecimals)
	const { address } = useAccount();

	//todo change on real
	const value = BigInt(1);

	const { data, writeContract, reset, isPending, error } = useWriteContract();

	useTransactionEffect(error, data, reset);

	const handleAction = () => {

		//todo to remove
		console.log(address);
		writeContract({
			address: bridgeContract,
			abi: [
				{
					inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
					name: 'bridgeTokens',
					outputs: [],
					stateMutability: 'nonpayable',
					type: 'function',
				},
			],
			args: [value],
			functionName: 'bridgeTokens',
			__mode: 'prepared',
		});
	};

	const disabled = amount.lte(0) || balance?.lt(amount) || cap?.lt(amount) || isPending;

	return (
		<ActionButton
			actionName={!isPending ? actionName : `${actionName}ing...`}
			chainId={chainId}
			action={handleAction}
			disabled={disabled}
		>
			<IconContext.Provider value={{ className: 'react-icons' }}>
				<TbArrowBigRightLinesFilled />
			</IconContext.Provider>
		</ActionButton>
	);
});

export default BridgeTokenButton;
