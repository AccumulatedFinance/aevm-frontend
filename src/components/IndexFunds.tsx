import React from "react";
import {Avatar, Box, Card, Divider, Skeleton, Typography} from "@mui/joy";
import {useERC20balanceOf} from "../contracts/hooks/useERC20balanceOf";
import {AEVM_CHAIN_ID} from "../constants";
import {logoUtils} from "../initLib";
import {useAccount} from "wagmi";
import { aevmConfig } from '../../aevm.config';
import {EthUtils, FormattingUtils} from "@accumulatedfinance/frontend-toolkit";
import BigNumber from "bignumber.js";

const IndexFunds: React.FC = () => {

	const {address} = useAccount()

	return (
		<Card variant="outlined" sx={{ mt: 4, maxWidth: 480, mx: 'auto', p: 3 }}>
			<Typography level="h4" mb={2}>AEVM Balances</Typography>

			<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
				{Object.entries(aevmConfig).map(([symbol, token]) => {
					const balance = useERC20balanceOf(
						AEVM_CHAIN_ID,
						token.address,
						address
					);

					return (
						<Box
							key={symbol}
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 2,
								p: 1.5,
								border: '1px solid',
								borderColor: 'divider',
								borderRadius: 'md',
							}}
						>
							<Avatar
								src={logoUtils.getTokenLogo(AEVM_CHAIN_ID, token.address.toLowerCase())}
								sx={{ "--Avatar-size": "36px" }}
							>
								{symbol}
							</Avatar>

							<Box sx={{ flexGrow: 1 }}>
								<Typography level="title-sm" fontWeight="md">
									{symbol}
								</Typography>
							</Box>

							<Divider orientation="vertical" />

							<Typography level="body-sm" fontWeight="lg" sx={{ minWidth: 100, textAlign: 'right' }}>
								{balance !== undefined ? FormattingUtils.formatForDisplay(EthUtils.toHumanReadable(balance, new BigNumber(token.decimals)), 'numberLong'): <Skeleton width={60} />}
							</Typography>
						</Box>
					);
				})}
			</Box>
		</Card>
	)
}
export default IndexFunds;






