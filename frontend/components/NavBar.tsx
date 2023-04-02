import { HorizontalNav } from "@taikai/rocket-kit"
import Link from "next/link"
import ConnectWalletButton from "./ConnectWalletButton"

export default function NavBar() {
  return (
    // <HorizontalNav
    //   items={[
    //     <ul key="nav-list">
    //       <li key="0">
    //         <Link href="/">Apply For Protection</Link>
    //       </li>
    //       <li key="1">
    //         <Link href="/my-coverage">My Coverage</Link>
    //       </li>
    //       <li key="2">
    //         <ConnectWalletButton />
    //       </li>
    //     </ul>
    //   ]}
    // />

    <HorizontalNav
      items={[
        <li key="0"><Link key="0" href="/">Apply For Protection</Link></li>,
        <li key="1"><Link key="1" href="/my-coverage">My Policies</Link></li>,
        <li key="2"><ConnectWalletButton /></li>,
      ]}
    />
  );
}
