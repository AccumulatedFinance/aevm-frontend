import React, {useState} from 'react';
import {Card, Typography} from '@mui/joy';
import {useAccount} from 'wagmi';
import BigNumber from 'bignumber.js';

import bridgeConfig from '../../../bridge.config';
import BridgeChainSelector from './BridgeChainSelector';
import BridgeFormControl from './BridgeFormControl';
import BridgeTokenButton from '../button/BridgeTokenButton';
import {useNativeBalance} from "../../contracts/hooks/useNativeBalance";
import {EthUtils} from "@accumulatedfinance/frontend-toolkit";
import ContractChip from "../ui/ContractChip";

const BridgeForm: React.FC = () => {
	const {isConnected, address} = useAccount();

	const [selectedChainId, setSelectedChainId] = useState<BigNumber>(new BigNumber(114));
	const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

	const chainIdNum = selectedChainId.toNumber();
	const config = bridgeConfig[chainIdNum as keyof typeof bridgeConfig];
	const selectedToken = config?.tokens[selectedTokenIndex];

	const lstToken = config?.tokens[selectedTokenIndex + 1];

	const availableBalance = useNativeBalance(selectedChainId, address);


	if (!isConnected) {
		return (
			<Card variant="outlined" sx={{mt: 4, maxWidth: 420, mx: 'auto', p: 3}}>
				<Typography level="h4">Connect to wallet</Typography>
			</Card>
		);
	}

	if (!config || !selectedToken) {

		return (
			<Card variant="outlined" sx={{mt: 4, maxWidth: 520, mx: 'auto', p: 3}}>
				<Typography level="body-md">Chain or token is not supported</Typography>
			</Card>
		);
	}
	return (
		<>
			<Card variant="outlined" sx={{mt: 4, maxWidth: 460, mx: 'auto', p: 3}}>
				<Typography level="h4" mb={2}>Bridge</Typography>

				<BridgeChainSelector
					selectedChainId={selectedChainId}
					selectedTokenIndex={selectedTokenIndex}
					onSelect={(chainId, tokenIndex) => {
						setSelectedChainId(chainId);
						setSelectedTokenIndex(tokenIndex);
					}}
				/>
				<BridgeFormControl
					chainId={selectedChainId}
					tokenSymbol={selectedToken.symbol}
					tokenAddress={selectedToken.address}
					tokenDecimals={new BigNumber(selectedToken.decimals)}
					availableBalance={EthUtils.toHumanReadable(availableBalance, new BigNumber(selectedToken.decimals))}
					inputLabel={`Transfer your ${selectedToken.symbol}`}
				>
					<BridgeTokenButton
						chainId={selectedChainId}
						bridgeContract={config.bridgeContract}
						availableBalance={availableBalance}
					/>
				</BridgeFormControl>
			</Card>

			<Typography component={'span'} sx={{textAlign: "left"}} pt={2}>
				<Typography component={'span'} sx={{display: "inline-block", mr: 1, mb: 0.5}}>
					<ContractChip chainId={new BigNumber(selectedChainId)} address={lstToken.address} label={lstToken.symbol}
												decimals={new BigNumber(lstToken.decimals)}/>
				</Typography>
			</Typography>
		</>
	)
};

export default BridgeForm;
