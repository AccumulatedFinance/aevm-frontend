import React from 'react';
import { Sheet, RadioGroup, Radio, Typography, Avatar, Box } from '@mui/joy';
import bridgeConfig from '../../../bridge.config';
import BigNumber from 'bignumber.js';
import { logoUtils } from '../../initLib';

interface Props {
	selectedChainId: BigNumber;
	selectedTokenIndex: number;
	onSelect: (chainId: BigNumber, tokenIndex: number) => void;
}

const BridgeChainSelector: React.FC<Props> = ({
																								selectedChainId,
																								selectedTokenIndex,
																								onSelect
																							}) => {
	const options = Object.entries(bridgeConfig).flatMap(([chainIdStr, cfg]) => {
		const chainId = new BigNumber(chainIdStr);
		return cfg.tokens.filter(token =>!token.hidden).map((token, index) => ({
			chainId,
			tokenIndex: index,
			token,
			chainName: cfg.name
		}));
	});

	const selectedValue = `${selectedChainId.toFixed()}-${selectedTokenIndex}`;

	return (
		<RadioGroup
			orientation="horizontal"
			value={selectedValue}
			onChange={(e) => {
				const [chainIdStr, tokenIdxStr] = e.target.value.split('-');
				onSelect(new BigNumber(chainIdStr), Number(tokenIdxStr));
			}}
			sx={{ mb: 3, flexWrap: 'nowrap', gap: 1 , overflow: 'auto', whiteSpace: 'nowrap' }}
		>
			{options.map(({ chainId, tokenIndex, token }) => (
				<Sheet
					key={`${chainId.toFixed()}-${tokenIndex}`}
					sx={{
						p: 1,
						borderRadius: 'md',
						boxShadow: 'sm',
						mr: 1,
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						cursor: 'pointer',
					}}
				>
					<Radio
						value={`${chainId.toFixed()}-${tokenIndex}`}
						label={
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
								<Avatar
									size="sm"
									src={logoUtils.getTokenLogo(chainId, token.address)}
								>
									{token.symbol}
								</Avatar>
								<Box>
									<Typography level="body-sm">{token.symbol}</Typography>
								</Box>
							</Box>
						}
					/>
				</Sheet>
			))}
		</RadioGroup>
	);
};

export default BridgeChainSelector;
