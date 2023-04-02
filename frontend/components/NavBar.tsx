import { HorizontalNav } from "@taikai/rocket-kit"
import Link from "next/link"
import ConnectWalletButton from "./ConnectWalletButton"
import Image from 'next/image';
import logo from "../public/logo.png"

export default function NavBar() {
  return (
    <>
      <HorizontalNav
      items={[
        <li key="0"> 
          <div style={{ width: '50px', height: '50px' }}>
            <Image src={logo} alt="Logo" layout="fill" objectFit="contain" />
          </div>
        </li>,
        <li key="1" style={{marginTop: "2%"}}><Link key="0" href="/">Apply For Protection</Link></li>,
        <li key="2" style={{marginTop: "2%"}}><Link key="1" href="/my-coverage">My Policies</Link></li>,
        <li key="3" style={{marginTop: "2%"}}>
          <div style={{display: "flex", width: "100%", justifyContent: "flex-end"}}>
            <ConnectWalletButton />
          </div>
        </li>,
      ]}
    />
    {console.log("logo: ", logo)}
    </>
    
  );
}
