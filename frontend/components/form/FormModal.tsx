import { ModalDrawer, ModalFooter, Button } from "@taikai/rocket-kit"
import { useEffect, useState } from "react";
import { ERC20 } from "@taikai/dappkit";
import { Web3Connection } from "@taikai/dappkit";
import { useWeb3 } from "@/hooks/useWeb3";
import { ethers } from "ethers";
import UsdcAbi from '../../utils/Usdc.json';
import InsuranceAbi from '../../utils/RainInsurance.json';

interface FormModalProps {
    premium: number;
    duration: {arrival: Date, departure: Date};
    coverage: number;
    lat: string;
    long: string;
    dailyPrec: number;
    modal?: boolean;
    closeModal: () => void;
}

export default function FormModal({closeModal, modal, premium, coverage, duration, lat, long, dailyPrec}: FormModalProps) {
    const [policyCreated, setPolicyCreated] = useState(false);

    return(
        <div>
            <ModalDrawer
                closeValue="Close"
                footer={
                    <ModalButtons 
                        closeModal={closeModal}
                        premium={premium}
                        coverage={coverage}
                        duration={duration}
                        lat={lat}
                        long={long}
                        dailyPrec={dailyPrec}
                        setPolicyCreated={setPolicyCreated}
                        policyCreated={policyCreated}
                    />
                }
                hide={closeModal}
                isShowing={modal}
                title={policyCreated ? "Policy Created" : "Calculated Premium" }
            >
                {policyCreated ?
                    <p>Your policy was created successfully! You can now view it under the Policies tab.</p>
                :
                <>  
                    <p>Using the data from your trip details we've calculated the premium for your trip to be: </p>
                    ${premium}
                </>
                }
                
            </ModalDrawer>
      </div>
    )
}

interface ModalButtonsProps {
    policyCreated: boolean;
    setPolicyCreated: (policy: boolean) => void
}

function ModalButtons({ closeModal, premium, duration, coverage, lat, long, dailyPrec, policyCreated, setPolicyCreated}: FormModalProps & ModalButtonsProps) {
    const [usdcContract, setUsdcContract] = useState();
    const [insuranceContract, setInsuranceContract] = useState();
    const [approving, setIsApproving] = useState(false);
    const [applying, setApplying] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [value, setValue] = useState(0);
            
    const handleApproveTransaction = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tempUsdcContract = new ethers.Contract(
                process.env.NEXT_PUBLIC_USDC_CONTRACT_ADDRESS,
                UsdcAbi.abi,
                provider.getSigner(),
        );
        setUsdcContract(tempUsdcContract)
        tempUsdcContract.approve(process.env.NEXT_PUBLIC_INSURANCE_CONTRACT_ADDRESS, 1000000)
        setIsApproving(true)
    }

    const getMyPolicy = () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const tempInsuranceContract = new ethers.Contract(
                process.env.NEXT_PUBLIC_INSURANCE_CONTRACT_ADDRESS,
                InsuranceAbi.abi,
                provider.getSigner(),
        );
        setInsuranceContract(tempInsuranceContract)

        const start = new Date(duration.arrival).getTime() / 1000
        const end = new Date(duration.departure).getTime() / 1000

        const premiumBigNumber = ethers.utils.parseUnits(premium.toString(), 6)
        const coverageBigNumber = ethers.utils.parseUnits(coverage.toString(), 6)
        const parameters = [start, end, lat, long, dailyPrec, coverageBigNumber, premiumBigNumber, 0]
        tempInsuranceContract.applyForPolicy(parameters)
        setApplying(true)
    }

    useEffect(() => {

        const onPolicyCreated = (policyId, policyHolder, premiumAmount, insuredAmount) => {
            console.log(`Policy created event arrived, policyId: ${policyId}, policyHolder: ${policyHolder}`);
            setApplying(false);
            setPolicyCreated(true);
        };

        const onApproval = (owner, spender, value) => {
          console.log(`Approval event arrived, owner: ${owner}, spender: ${spender}, value: ${value}`);
          setValue(value);
          setIsApproving(false);
        };
    
        if (usdcContract) {
            usdcContract.on('Approval', onApproval);
        }
        if (insuranceContract) {
            insuranceContract.on('PolicyCreated', onPolicyCreated);
        }

        return () => {
          if (usdcContract) {
            usdcContract.off('Approval', onApproval);
          }
          if (insuranceContract) {
            insuranceContract.off('PolicyCreated', onPolicyCreated);
          }
        }
    }, [usdcContract, insuranceContract])
    

    return(
        <ModalFooter closeAction={closeModal} closeValue="Close">
            {value ? 
                <Button 
                    type="submit" 
                    value={applying ? "Generating Policy..." : "Get My Policy" }
                    disabled={policyCreated}
                    action={getMyPolicy}
                /> 
                :
                <Button 
                    type="submit" 
                    value={approving ? "Approving..." : "Approve"}
                    action={handleApproveTransaction}
                />
            }
        </ModalFooter>
    )
}