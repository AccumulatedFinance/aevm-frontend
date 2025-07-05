import { Chip, Avatar, Tooltip, Typography, Skeleton } from "@mui/joy";
import React, { FC } from "react";

import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { RiAddCircleLine, RiExternalLinkLine, RiFileCopyLine } from "react-icons/ri";
import BigNumber from "bignumber.js";
import { Address } from "viem";
import { observer } from "mobx-react";
import {chainProvider, logoUtils, tokenUtils} from "../../initLib";
import {useCopyToClipboard} from "@accumulatedfinance/frontend-toolkit";
import {useStore} from "../../StoreProvider";

interface IProps {
	address: Address;
	label: string;
	chainId: BigNumber;
	decimals?: BigNumber
}

const ContractChip: FC<IProps> = observer(({ address, label, decimals, chainId }) => {

	const store = useStore();
	const { appStore } = store;

	const {isCopied, handleCopyLink} = useCopyToClipboard();

	const getTokenDynamicTooltip = () => {
		if (appStore.chainId && !chainId.eq(appStore.chainId)) {
			return `Switch to ${chainProvider.findChainById(chainId)?.name} to add to MetaMask`;
		}
		return "Add to MetaMask";
	}

	const addToMetamask = async () => {
		if (window.ethereum && appStore.chainId && chainId.eq(appStore.chainId) && decimals) {
			try {
				await window.ethereum.request({
					"method": "wallet_watchAsset",
					"params": {
						"type": "ERC20",
						"options": {
							"address": address,
							"symbol": label,
							"decimals": decimals.toNumber(),
							"image": logoUtils.getTokenLogo(chainId, address)
						}
					}
				});
			} catch (error) {
				console.error('Failed to add token ${}: ', error);
			}
		}
	}

	return (
		<Chip className="token-chip" variant="plain" startDecorator={decimals !== undefined && (
			chainId && address && label ?
				<Avatar src={logoUtils.getTokenLogo(chainId, address)} variant="solid" sx={{ ml: "-3px", mr: "1px" }}>{label}</Avatar>
				: (
					<Skeleton variant="circular" width={20} height={20} sx={{ ml: "-3px", mr: "1px" }} />
				)
		)}>
			<Typography component={'span'} level="body-sm" sx={{ display: "inline-block", mr: 0.5 }}>
				{label ?
					<span>{label}</span>
					: (
						<Skeleton>TOKEN</Skeleton>
					)}
			</Typography>
			<Chip className="code" variant="soft" color="primary" size="sm" sx={{ marginTop: "-2px", marginLeft: 0.75, marginRight: 0.75, minWidth: 77 }}>
				{address && tokenUtils.shortAddress(address)}
			</Chip>
			<Typography component={'span'} className="action-icons" level="body-sm" sx={{ display: "inline-block" }}>
				{decimals !== undefined && appStore.chainId &&
            <Tooltip arrow title={getTokenDynamicTooltip()} color="primary" size="sm" placement="top">
                <Link to={"#"} onClick={addToMetamask} style={{
									opacity: appStore.chainId && chainId.eq(appStore.chainId) ? 1 : 0.5,
									cursor: appStore.chainId && chainId.eq(appStore.chainId) ? 'pointer' : 'default',
								}}>
                    <IconContext.Provider value={{ className: 'react-icons' }}>
                        <RiAddCircleLine />
                    </IconContext.Provider>
                </Link>
            </Tooltip>
				}
				<Tooltip arrow title={isCopied ? "Copied!" : "Copy address"} color="primary" size="sm" placement="top">
					<Link to={"#"} onClick={() => handleCopyLink(address)}>
						<IconContext.Provider value={{ className: 'react-icons' }}>
							<RiFileCopyLine />
						</IconContext.Provider>
					</Link>
				</Tooltip>
				<Tooltip arrow title="Open in explorer" color="primary" size="sm" placement="top">
					<Link to={decimals !== undefined ? tokenUtils.getExplorerTokenPageUrl(chainId, address) : tokenUtils.getExplorerAddressPageUrl(chainId, address)} target="_blank">
						<IconContext.Provider value={{ className: 'react-icons' }}>
							<RiExternalLinkLine />
						</IconContext.Provider>
					</Link>
				</Tooltip>
			</Typography>
		</Chip>
	)
});

export default ContractChip;