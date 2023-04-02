import { Button } from "@taikai/rocket-kit"
import { PremiumTypes } from "@/pages/_app"

interface ButtonProps {
    getPremiumArgs: () => PremiumTypes,
    calculatePremium: ({destination, duration, coverage}: PremiumTypes) => number
}

export default function CalculateButton({ getPremiumArgs, calculatePremium }: ButtonProps) {
    const handleButtonClick = () => {
        const premiumArgs = getPremiumArgs();
        const premium = calculatePremium(premiumArgs);
    }

    return(
        <Button
            action={handleButtonClick}
            ariaLabel="Calculate Button"
            // className="button"
            color="purple500"
            txtColor="white"
            value="Calculate Premium"
            variant="solid"
            style={{marginTop: "3%"}}
        />
    )
}
