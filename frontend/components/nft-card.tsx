import { Container } from "@/styles/home"
import { AvatarImage, Button } from "@taikai/rocket-kit"

export default function NftCard(props: any) {
    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <img
                style={{
                    width: "calc(33.33 % - 10px)",
                    marginRight: "10px"
                }}
                src={props.nft}
            >
            </img>
            <div
                style={props.mode == 1 ? {
                    marginTop: "30px",
                    marginBottom: "80px",
                    display: "flex",
                    background: "#fff",
                    height: "70px",
                    width: "330px",
                    borderRadius: "5px",
                    color: "black",
                    fontSize: "1.5rem",
                    alignItems: "center",
                    justifyContent: "space-between"
                } : {
                    marginTop: "30px",
                    marginBottom: "80px",
                    display: "flex",
                    background: "#94A4A6",
                    height: "70px",
                    width: "330px",
                    borderRadius: "5px",
                    color: "white",
                    fontSize: "1.5rem",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <span style={{ marginLeft: "15px" }}>GenIA: _________</span>
                <Button
                    ariaLabel="sell"
                    className="button"
                    color={props.mode == 1 ? "black" : "white"}
                    txtColor={props.mode == 1 ? "white" : "black"}
                    value={props.mode == 1 ? "Sell" : "Buy"}
                    variant="solid"
                    action={() => alert("teste")}
                    style={{
                        marginRight: "15px",
                        height: "45px",
                        width: "140px",
                        fontSize: "10rem"
                    }}
                />
            </div>
        </Container>
    )
}