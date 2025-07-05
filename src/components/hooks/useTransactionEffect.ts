import AlertStore from "../../stores/alertStore";
import {Address} from "viem";
import {useEffect} from "react";

export const useTransactionEffect = (
	alertStore: AlertStore,
	error: Error | null,
	data: Address | undefined,
	reset: () => void,
	txSuccessType?: "TX_SUCCESS" | "TX_SUCCESS_APPROVE"
) => {
	useEffect(() => {
		if (error) {
			alertStore.sendAlert(error, 'ERROR');
			reset();
		}
	}, [error, alertStore, reset]);

	useEffect(() => {
		if (data && data) {
			alertStore.sendAlert(data, 'TX_SUCCESS');
			reset();
		}
	}, [data, alertStore, reset, txSuccessType]);
};