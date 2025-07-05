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
import {useStore} from "../../StoreProvider";

interface Props {
	chainId: BigNumber;
	bridgeContract: Address;
	availableBalance: BigNumber | undefined;
}

const BridgeTokenButton: FC<Props> = observer(({ chainId, bridgeContract, availableBalance  }) => {

	const {alertStore} = useStore();
	const amount = useBigNumberContext();

	const { address } = useAccount();

	const { data, writeContract, reset, isPending, error } = useWriteContract();

	useTransactionEffect(alertStore, error, data, reset);

	const handleAction = () => {

		writeContract({
			address: bridgeContract,
			abi: [
				{
					"inputs": [
						{
							"internalType": "address",
							"name": "receiver",
							"type": "address"
						}
					],
					"name": "deposit",
					"outputs": [],
					"stateMutability": "payable",
					"type": "function"
				},
			],
			args: [address as Address],
			value: BigInt(amount.toFixed()),
			functionName: 'deposit',
			__mode: 'prepared',
		});
	};

	const disabled = amount.lte(0) || availableBalance?.lt(amount)  || isPending;

	return (
		<ActionButton
			actionName={!isPending ? "Bridge" :"Bridging..."}
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
