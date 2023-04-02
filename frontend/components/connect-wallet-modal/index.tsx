import React, { useState } from "react";
import { useWeb3 } from "../../hooks/useWeb3";
import Image from "next/image";
import { Modal, ModalFooter, Button } from "@taikai/rocket-kit";
import { ConnectorList,Warning, Connector, Alert,  Agreement, AddressStyle}  from "./styles"
import useAddress from "../../hooks/useAddress";
import useMetaMaskOnboarding from "@/hooks/useMetaMaskOnboarding";

type OnCloseFunctionType = () => void;

interface Props {
  onClose: OnCloseFunctionType;
}

const ShowEthAddress = ()=> {
  const { address = "" } = useAddress();
  return (
    <AddressStyle>
      {address}
  </AddressStyle>
  );
}

const ConnectWalletModal: React.FC<Props> = (props: Props) => {
  const { connected, connect, disconnect, error } = useWeb3();
  const { isMetaMaskInstalled , startOnboarding } = useMetaMaskOnboarding();
  const { onClose } = props;
  return (
    <Modal
      zIndex={1001}
      isShowing={true}
      hide={() => {
        onClose();
      }}
      title="Connect Your Wallet"
      footer={false}
    >
      {!connected && isMetaMaskInstalled && (
        <>
          <Warning>
            You don&apos;t have a wallet connect, please choose of the following
            options:
          </Warning>
          <ConnectorList>
            <Connector onClick={() => connect()}>
              <Image
                width={30}
                height={30}
                alt="Metamask"
                src="/metamask.png"
              />
              <span>Connect with Metamask</span>
            </Connector>
          </ConnectorList>
          <Agreement>
            By connecting a wallet, you agree to the &quot;LayerX Web Boilerplate&quot; Terms of Service and
            consent to its Privacy Policy.
          </Agreement>
        </>
      )}
       {!connected && !isMetaMaskInstalled && (
        <>         
          <ConnectorList>
            <Connector onClick={() => startOnboarding()}>
              <Image
                width={30}
                height={30}
                alt="Metamask"
                src="/metamask.png"
              />
              <span>Install Metamask</span>
            </Connector>
          </ConnectorList>       
          <Alert>
           🚨 You don&apos;t have the metamask extension installed on your browser.
          </Alert>  
        </>
      )}
      {connected && isMetaMaskInstalled  && (
        <>
          <Warning>You are connected with Wallet address:</Warning>
          <ShowEthAddress />
        </>
      )}
      <ModalFooter
        closeValue={"Close"}
        closeAction={() => onClose()}
      >
        {connected && (
          <Button
            color={"red500"}
            disabled={!connected}
            value="Disconnect"
            action={() => disconnect()}
          />
        )}
      </ModalFooter>
    </Modal>
  );
};

export default ConnectWalletModal;
