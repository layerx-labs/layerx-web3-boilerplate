import { useState, useEffect } from "react";
import ConnectWalletModal from '@/components/connect-wallet-modal';
import { useWeb3 } from "@/hooks/useWeb3";
import { Button } from "@taikai/rocket-kit";

// if wallet is connected connect wallet button should change to disconnect
export default function ConnectWalletButton() {
    const { connected } = useWeb3(); 
    const [metaMaskModal, setMetaMaskModal] = useState(false);

    const openMetaMaskModal = () => {
        setMetaMaskModal(true)
    }

    const closeMetaMaskModal = () => {
        setMetaMaskModal(false)
    }

    return(
        <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
            <Button action={openMetaMaskModal} type="submit" value={!connected ? "Connect Wallet" : "Disconnect"}/>
            <ConnectWalletModal
                onClose={closeMetaMaskModal}
                open={metaMaskModal}
            />
      </div>
    )
}