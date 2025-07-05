import BigNumber from "bignumber.js";
import { useBlockNumber, useReadContract } from "wagmi";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Address } from "viem";
import {bigIntToBigNumber} from "@accumulatedfinance/frontend-toolkit";

export const useERC20balanceOf = (chainId: BigNumber | undefined, contractAddress: Address, account: Address | undefined, forceDisabled?: boolean): BigNumber | undefined => {
	const queryClient = useQueryClient();
	const { data: blockNumber } = useBlockNumber({ cacheTime: 3, watch: true });

	const { data, queryKey } = useReadContract({
		address: contractAddress,
		abi: [
			{
				"inputs": [
					{
						"internalType": "address",
						"name": "account",
						"type": "address"
					}
				],
				"name": "balanceOf",
				"outputs": [
					{
						"internalType": "uint256",
						"name": "",
						"type": "uint256"
					}
				],
				"stateMutability": "view",
				"type": "function"
			},
		],
		args: account ? [account] : undefined,
		functionName: 'balanceOf',
		chainId: chainId?.toNumber(),
		query: {
			enabled: !forceDisabled && chainId !== undefined && account !== undefined
		}
	});

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey })
	}, [blockNumber, queryClient, queryKey]);

	return bigIntToBigNumber(data);
}