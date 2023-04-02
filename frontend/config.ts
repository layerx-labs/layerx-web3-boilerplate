export interface DappConfiguration {
    chainId: number;    
    autonnect: boolean;
    switchNetwork: boolean;
    addNewortk: boolean;
    disconnectOnSwitchAccount: boolean;
    disconnectOnChangeNetwork: boolean;
}

export const dappConfig: DappConfiguration = {
    chainId: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID as string || "1313161555" ),
    autonnect: false,
    switchNetwork: true,
    addNewortk: true,
    disconnectOnSwitchAccount: true,
    disconnectOnChangeNetwork: true,
};