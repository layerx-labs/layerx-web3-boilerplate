import Head from "next/head";
import { Button, Icon, TextField } from "@taikai/rocket-kit";
import { Web3Connection, Web3Contract } from "@taikai/dappkit";
import { useWeb3 } from "../hooks/useWeb3";
import { Container, Main, NavBar, BrandName, Menu, Footer, Title, SubTitle, Content } from "../styles/home";
import ConnectModal from "../components/connect-wallet-modal";
import React, { useState, useEffect } from 'react';
import ClickableEthAddress from "../components/clickable-eth-address";
import NftSlider from "@/components/nft-slider";
import Popup from "@/components/popup";
import LogoBranca from "../imgs/GenIALogoBranca.png"
import LogoPreta from "../imgs/GenIALogoPreta.png"
import genia1 from "../imgs/genIA1.webp"
import genia2 from "../imgs/genIA2.webp"
import genia3 from "../imgs/genIA3.png"
import { AbiItem } from "web3-utils";

import nftconfig from "../../contracts/abi/nft.json"
import tokenconfig from "../../contracts/abi/token.json"
import marketplaceconfig from "../../contracts/abi/marketplace.json"

export default function Home() {

  const { connected, connect, disconnect, error, chainId, address } = useWeb3();
  const [isConnectModal, setConnectModal] = useState(false);
  const [isMyCollection, setMyCollection] = useState(false)
  const [collection, setCollection] = useState<string[]>([])
  const [newImage, setNewImage] = useState("")
  const [prompt, setPrompt] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const GeNFTAdress = process.env.NFT_ADDRESS
  const GeTokenAddress = process.env.TOKEN_ADDRESS
  const MarketplaceAddress = process.env.MARKETPLACE_ADDRESS

  async function handleMarketPlace():Promise<void> {
    const connection = new Web3Connection({ web3Host: process.env.WEB3_HOST_PROVIDER })
    await connection.start()
    await connection.connect()

    let myAccount = await connection.getAddress()
    myAccount = myAccount.toUpperCase()

    const GeNFT = new connection.Web3.eth.Contract(
      nftconfig as AbiItem[],
      GeNFTAdress
    )

    const qtyTokens = await GeNFT.methods.getTotalTokens().call()

    let allTokens = []
    for (let i = 1; i <= qtyTokens; i++) {
      allTokens.push(i)
    }

    let img_array = await Promise.all(allTokens.map(async t => {
      let uri = await GeNFT.methods.tokenURI(t).call()
      return uri
    }))

    setCollection(img_array)
  }

  useEffect(() =>{ 
    handleMarketPlace()
  }, [])

  async function handleSendPrompt(): Promise<void> {

    const connection = new Web3Connection({ web3Host: process.env.WEB3_HOST_PROVIDER })
    await connection.start()
    await connection.connect()

    const myAccount = await connection.getAddress()

    const GeNFT = new connection.Web3.eth.Contract(
      nftconfig as AbiItem[],
      GeNFTAdress
    )

    const GeToken = new connection.Web3.eth.Contract(
      tokenconfig as AbiItem[],
      GeTokenAddress
    )

    const Marketplace = new connection.Web3.eth.Contract(
      marketplaceconfig as AbiItem[],
      MarketplaceAddress
    )

    await Marketplace.methods.SendPrompt(prompt).send({from: myAccount})
    let lastToken = await GeNFT.methods.getTotalTokens().call()
    let lastTokenURI = await GeNFT.methods.tokenURI(lastToken).call()

    const min = 10000;
    const max = 999999;
    const regex = /v(\d+)\//;
    lastTokenURI = lastTokenURI.replace(regex, `v${Math.floor(Math.random() * (max - min + 1)) + min}/`)

    fetch(lastTokenURI).then((r) => {}).catch(() => {})

    // const regex2 = /\/(\d+)\.png$/;
    // const match = lastTokenURI.match(regex2)
    // lastTokenURI = lastTokenURI.replace(regex2, `/${parseInt(match[1])+1}.png`)
    console.log(lastTokenURI);

    console.log("ok")
    console.log(showPopup)

    setTimeout(() => {
      setNewImage(lastTokenURI)
      setShowPopup(true)
    }, 10000)

    setPrompt("")
    return
  }
  
  async function handleMyCollection(): Promise<void> {

    if(isMyCollection) {
      setMyCollection(!isMyCollection)
      return
    }

    const connection = new Web3Connection({ web3Host: process.env.WEB3_HOST_PROVIDER })
    await connection.start()
    await connection.connect()

    let myAccount = await connection.getAddress()
    myAccount = myAccount.toUpperCase()

    const GeNFT = new connection.Web3.eth.Contract(
      nftconfig as AbiItem[],
      GeNFTAdress
    )

    const GeToken = new connection.Web3.eth.Contract(
      tokenconfig as AbiItem[],
      GeTokenAddress
    )

    const qtyTokens = await GeNFT.methods.getTotalTokens().call()

    let allTokens: { [key: number]: string }[] = []
    for (let i = 1; i <= qtyTokens; i++) {
      let obj: { [key: number]: string } = {}
      let owner = await GeNFT.methods.ownerOf(i).call()
      owner = owner.toUpperCase()
      obj[i] = owner
      allTokens.push(obj)
    }

    let myTokens = allTokens.filter(t => Object.values(t).includes(myAccount)).map(t => parseInt(Object.keys(t)[0]))

    let img_array = await Promise.all(myTokens.map(async t => {
      let uri = await GeNFT.methods.tokenURI(t).call()
      return uri
    }))

    setMyCollection(!isMyCollection)
    setCollection(img_array)

    return
  }


  return (
    <Container>
      <Head>
        <title>AI NFT Marketplace</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar
        style={{
          color: "#FFF",
          display: "flex",
          background: "white"
        }}>
        {/* <BrandName>AI NFT Marketplace</BrandName> */}
        {connected &&
          <Button
            ariaLabel="mycollection"
            className="button"
            color={isMyCollection ? "grey150" : "white"}
            txtColor="black"
            value="My Collection"
            variant="solid"
            action={handleMyCollection}
            style={{
              margin: "2px"
            }}
          />
        }
        {connected && <Button
          ariaLabel="BuyTokens"
          className="button"
          value="Buy GenIA"
          color="white"
          txtColor="black"
          variant="solid"
          action={() => setConnectModal(true)}
          style={{
            margin: "2px"
          }}
        />}
        <Menu>
          {!connected && (
            <Button
              ariaLabel="Connect"
              className="button"
              color="white"
              txtColor="black"
              value="Connect your wallet"
              variant="solid"
              action={() => setConnectModal(true)}
              style={{
                margin: "2px"
              }}
            />
          )}
          {connected && <ClickableEthAddress onClick={() => setConnectModal(true)} />}
        </Menu>
      </NavBar>
      {isConnectModal && <ConnectModal onClose={() => setConnectModal(false)} />}
      <Main>
        {!isMyCollection && <Container
          style={{
            display: "flex",
            alignItems: "flex-start",
            height: "100px",
            marginBottom: "40px"
          }}
        >
          <img src={LogoBranca.src} alt="logo" style={{ height: "100px" }} />
        </Container>}
        {!connected && <Container
          style={{
            height: "800px",
            width: "95%",
            margin: "0 auto",
            display: "flex",
            flexDirection: "row"
          }}
        >
          <Container
            style={{ width: "40%", textAlign: "left" }}
          >
            <Title style={{ fontWeight: "500", fontSize: "2.5rem", marginBottom: "50px" }}>
              Mint your own NFT using AI to fuel your imagination.
              You can purchase our tokens tax-free and earn more by selling your art.
            </Title>
            <Title style={{ fontWeight: "500", fontSize: "2.5rem" }}>
              Each GenIA token can generate an image, which can be minted as
              NFT and sold at our Marketplace. Let your imagination run wild!
            </Title>
            <Container
              style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                ariaLabel="Connect"
                className="button"
                color="red400"
                rounded
                txtColor="oracle100"
                value="Try GenIA"
                variant="solid"
                action={() => setConnectModal(true)}
                style={{
                  marginTop: "20px",
                  height: "70px",
                  width: "140px",
                  fontSize: "10rem"
                }}
              />
              <Container style={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                fontSize: "2.5rem",
                height: "70px",
                alignItems: "center",
                lineHeight: "70px"
              }}>
                Follow us
                <Icon style={{ height: "50px", marginLeft: "20px" }} icon="instagram-n" fill="#fff" />
                <Icon style={{ height: "50px" }} icon="twitter-n" fill="#fff" />
              </Container>
            </Container>
          </Container>
          <Container
            style={{
              width: "50%",
              marginLeft: "10%",
              height: "600px",
              justifyContent: "space-between",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <Container
              style={{
                height: "33%",
                width: "50%",
                position: "relative"
              }}
            >
              <img src={genia1.src} alt="genia1" style={{ height: "400px", width: "400px", position: "absolute", bottom: "-130px" }}></img>
            </Container>
            <Container
              style={{
                height: "33%",
                width: "100%",
                alignItems: "flex-end"
              }}
            >
              <img src={genia2.src} alt="genia2" style={{ height: "350px", width: "350px" }}></img>
            </Container>
            <Container
              style={{
                height: "33%",
                width: "100%",
                position: "relative"
              }}
            >
              <img src={genia3.src} alt="genia3" style={{ height: "350px", width: "350px", position: "absolute", bottom: "0" }}></img>
            </Container>
          </Container>
        </Container>}
        {connected && !isMyCollection && <Content
          style={{
            height: "800px",
            justifyContent: "flex-start",
            paddingTop: "100px"
          }}
        >
          <Title
            style={{ fontWeight: "600" }}
          >Give wings to your horses!</Title>
          <Title
            style={{ marginBottom: "20px", fontWeight: "600" }}
          >Be bold. Be wild. Be GenIA.</Title>
          <TextField
            name="generate-prompt"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Generate Image w/ Prompt"
            type="text"
            style={{
              background: "white",
              width: "800px",
              height: "50px",
              color: "#41424c",
              textAlign: "center",
              borderRadius: "20px",
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "sans-serif"
            }}
            max={10}
          />
          <Button
            ariaLabel="generate"
            className="button"
            value="Generate"
            color="red400"
            txtColor="oracle100"
            rounded
            variant="solid"
            action={handleSendPrompt}
            style={{
              marginTop: "20px",
              height: "70px",
              width: "140px",
              fontSize: "10rem"
            }}
          />
        </Content>}
        {showPopup && <Popup />}
        {!isMyCollection && <NftSlider title="NFT Marketplace" collection={collection}/>}
        {isMyCollection && <NftSlider title="My Collection" collection={collection}/>}
      </Main>
    </Container>
  );
}
