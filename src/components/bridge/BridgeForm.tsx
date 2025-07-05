import React, {useState} from 'react';
import {Card, Typography, Alert, Divider} from '@mui/joy';
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
				<Typography component={'span'} sx={{display: "inline-block", mt: 2, mr: 1, mb: 0.5}}>
					<ContractChip chainId={new BigNumber(selectedChainId)} address={lstToken.address} label={lstToken.symbol}
												decimals={new BigNumber(lstToken.decimals)}/>
				</Typography>
				<Alert variant="soft" color="primary" sx={{ mt: 2, width: "500px", mx: "auto" }}>
					<span>
						<strong>{lstToken.symbol}</strong> is {selectedToken.symbol} LST deployed on the <strong>{config.name}</strong>:
						{" "}
						<a href={config.url} target='_blank' rel="noreferrer">{config.url}</a>
						<Divider sx={{ my: 1 }} />
						<Typography level="body-md">Bridging {selectedToken.symbol} from {config.name} to AEVM works like this:</Typography><br />
						<Divider sx={{ my: 0.5, opacity: 0 }} />
						1. <strong>{selectedToken.symbol}</strong> ({config.name}) → <strong>{lstToken.symbol}</strong> ({config.name})<br />
						2. <strong>{lstToken.symbol}</strong> is locked in the bridge, generating staking rewards from LST yield<br />
						3. A <strong>Rebase {selectedToken.symbol}</strong> token is minted to the user’s account on <strong>AEVM</strong><br />
						4. As rewards accumulate on {config.name} (via {lstToken.symbol} LST), they’re distributed to all <strong>Rebase {selectedToken.symbol}</strong> holders on the AEVM through rebasing
					</span>
				</Alert>
			</Typography>
		</>
	)
};

export default BridgeForm;
