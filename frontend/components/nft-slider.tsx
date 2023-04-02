import { AvatarImage } from "@taikai/rocket-kit"
import { Container, Title } from "@/styles/home"
import NftCard from "./nft-card"

let array_imgs: { [key: string]: string }[] = [
    { "url": "a" }, { "url": "b" }, { "url": "c" },
    { "url": "d" }, { "url": "e" }, { "url": "f" },
]

export default function NftSlider(props: any) {

    let mode = props.title == "My Collection" ? 1 : 2
    
    let array_imgs = props.collection

    return (
        <Container
            style={mode == 1 ?
                {
                    background: "black",
                    color: "#41424c",
                    textAlign: "center",
                    height: "70%"
                }
                : {
                    background: "white",
                    color: "#41424c",
                    textAlign: "center",
                    height: "70%"
                }}
        >
            <Title style={mode == 1 ?
                { marginTop: "50px", fontSize: "40px", color: "white" } : { marginTop: "50px", fontSize: "40px" }}
            >{props.title}</Title>
            <Container
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    marginTop: "50px",
                    height: "60%"
                }}
            >
                {array_imgs ? array_imgs.map((i: string, index: number) => {
                    return (
                        <NftCard mode={mode} nft={i} key={index}/>
                    )
                }) : ""}
            </Container>

        </Container>
    )
}
