import { Select } from "@taikai/rocket-kit";
import React, { ChangeEvent } from 'react';


interface DestinationProps {
  setDestination: (destination: string) => void;
  setLat: (lat: string) => void;
  setLong: (lat: string) => void;
}

export default function Destination({ setDestination, setLat, setLong}: DestinationProps) {
    const handleDestination = (e: ChangeEvent<HTMLSelectElement>) => {
        setDestination(e.target.value)

        switch(e.target.value) {
          case "paris":
            setLat("48.864716")
            setLong("2.349014")
            break;
          case "miami": 
            setLat("25.761681")
            setLong("-80.191788")
            break;
          case "rio_de_janeiro":
            setLat("-23.000372")
            setLong("-43.365894")
            break;
        }
     }

    return(
      <div style={{display: "flex", flexDirection: "column"}}>
          <h2>Destination</h2>
          <Select
            error=""
            name="select-city"
            onChange={handleDestination}
            options={[
              {
                name: 'Rio de Janeiro',
                value: 'rio_de_janeiro'
              },
              {
                name: 'Paris',
                value: 'paris'
              },
              {
                name: 'Miami',
                value: 'miami'
              }
            ]}
            placeholder="City"
          />
        </div>
    )
}