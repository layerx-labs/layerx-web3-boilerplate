import { ChangeEvent } from 'react';
import { TextField } from "@taikai/rocket-kit"

interface DurationProps {
    dispatchDuration: () => void
}

export default function Duration({ dispatchDuration }: DurationProps) {

    const handleArrival = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        dispatchDuration({ type: type, nextArrival: e.target.value})
    }

    const handleDeparture = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        dispatchDuration({ type: type, nextDeparture: e.target.value})
    }

    return(
      <div style={{display: "flex", columnGap: "20px"}}>
          <div style={{display: "flex", flexDirection: "column"}}>
            <h2>Arrival</h2>
            <TextField
              minimal
              name="arrival-date"
              onChange={(e) => handleArrival(e, "arrival")}
              type="date"
            />
          </div>
          <div style={{display: "flex", flexDirection: "column"}}>
            <h2>Departure</h2>
            <TextField
              minimal
              name="departure-date"
              onChange={(e) => handleDeparture(e, "departure")}
              type="date"
            />
          </div>
        </div>
    )
}