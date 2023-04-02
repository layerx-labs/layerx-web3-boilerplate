import { ChangeEvent } from 'react';
import { TextField } from "@taikai/rocket-kit";

interface CoverageProps { 
    setCoverage: (coverageValue: number) => void
}

export default function Coverage({ setCoverage }: CoverageProps) {
    const handleCoverage = (e: ChangeEvent<HTMLInputElement>) => {
        const coverageValue = parseInt(e.target.value);
        setCoverage(coverageValue)
    }

    return(
        <div style={{display: "flex", flexDirection: "column"}}>
            <h2>Coverage</h2>
            <TextField
                min={20}
                name="coverage-value"
                onChange={handleCoverage}
                minimal={false}
                placeholder="Coverage"
                type="number"
            />
        </div>
    )
}