import React, { useState } from 'react';
import { Card, Typography } from '@mui/joy';
import { useAccount } from 'wagmi';
import BigNumber from 'bignumber.js';

import bridgeConfig from '../../../bridge.config';
import BridgeChainSelector from './BridgeChainSelector';
import BridgeFormControl from './BridgeFormControl';
import BridgeTokenButton from '../button/BridgeTokenButton';

const BridgeForm: React.FC = () => {
	const { isConnected } = useAccount();

	const [selectedChainId, setSelectedChainId] = useState<BigNumber>(new BigNumber(296));
	const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0);

	const chainIdNum = selectedChainId.toNumber();
	const config = bridgeConfig[chainIdNum as keyof typeof bridgeConfig];
	const selectedToken = config?.tokens[selectedTokenIndex];

	if (!isConnected) {
		return (
			<Card variant="outlined" sx={{ mt: 4, maxWidth: 420, mx: 'auto', p: 3 }}>
				<Typography level="h4">Подключите кошелёк</Typography>
			</Card>
		);
	}

	if (!config || !selectedToken) {

		return (
			<Card variant="outlined" sx={{ mt: 4, maxWidth: 420, mx: 'auto', p: 3 }}>
				<Typography level="body-md">Chain or token is not supported</Typography>
			</Card>
		);
	}

	return (
		<Card variant="outlined" sx={{ mt: 4, maxWidth: 420, mx: 'auto', p: 3 }}>
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
				tokenSymbol1={selectedToken.symbol}
				tokenAddress1={selectedToken.address}
				tokenDecimals1={new BigNumber(selectedToken.decimals)}
				availableBalance={new BigNumber(111)} // TODO: заменить на useBalance()
				inputLabel1={`Transfer your ${selectedToken.symbol} to AEVM token`}
			>
				<BridgeTokenButton
					chainId={selectedChainId}
					bridgeContract={config.bridgeContract}
					balance={new BigNumber(0)} // TODO: заменить на useBalance()
					tokenDecimals={new BigNumber(selectedToken.decimals)}
					actionName={`Bridge ${selectedToken.symbol}`}
				/>
			</BridgeFormControl>
		</Card>
	);
};

export default BridgeForm;
