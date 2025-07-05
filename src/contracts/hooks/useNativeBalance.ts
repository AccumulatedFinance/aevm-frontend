import BigNumber from "bignumber.js";
import { useBalance, useBlockNumber } from "wagmi";
import { Address } from "viem";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {bigIntToBigNumber} from "@accumulatedfinance/frontend-toolkit";

export const useNativeBalance = (chainId: BigNumber | undefined, account: Address | undefined, forceDisabled?: boolean): BigNumber | undefined => {
	const queryClient = useQueryClient();
	const { data: blockNumber } = useBlockNumber({ cacheTime: 3, watch: true });
	const { data, queryKey } = useBalance(
		{
			chainId: chainId?.toNumber(),
			address: account,
			query: {
				enabled: !forceDisabled && chainId !== undefined && account !== undefined,
			}
		});

	useEffect(() => {
		queryClient.invalidateQueries({ queryKey })
	}, [blockNumber, queryClient, queryKey]);

	return bigIntToBigNumber(data?.value);
}