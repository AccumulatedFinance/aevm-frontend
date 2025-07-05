export const aevmConfig = {
	HBAR: {
		name: 'HBAR',
		address: '0x8725beb8155504b7510BD46d7499e7B5EE2B7c1c',
		decimals: 8
	},
	FLOW: {
		name: 'FLOW',
		address: '0x66faF4a7E51D93283c25B4A54844e183670a8dE1',
		decimals: 18
	},
	FLR: {
		name: 'FLR',
		address: '0x8d2393fCfAFD6E7B930F1de3A1CbE26b7c69094A',
		decimals: 18
	}
} as const;

export type AevmTokenSymbol = keyof typeof aevmConfig;
export type AevmTokenConfig = (typeof aevmConfig)[AevmTokenSymbol];
