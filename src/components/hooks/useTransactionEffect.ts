import { useEffect } from "react";
import { Address } from "viem";

export const useTransactionEffect = (
	error: Error | null,
	data: Address | undefined,
	reset: () => void,
	txSuccessType?: "TX_SUCCESS"
) => {
	useEffect(() => {
		if (error) {
			//todo add alertStore
			console.error(error);
			reset();
		}
	}, [error, reset]);

	useEffect(() => {
		if (data && data) {
			reset();
		}
	}, [data, reset, txSuccessType]);
};