import GoogleMapReact from "google-map-react";
import { useMemo, useEffect, useState } from "react";
import moment from "moment";

export default ({ port, ships, selectedShip, setSelectedShip }) => {
  const [destinationPort, setDestinationPort] = useState();
  useEffect(() => {
    if (selectedShip && selectedShip.Port) {
      setDestinationPort({
        lat: selectedShip.Port.location.coordinates[1],
        lng: selectedShip.Port.location.coordinates[0],
      });
    } else {
      setDestinationPort(null);
    }
  }, [selectedShip]);
  const center = useMemo(() => {
    if (port) {
      return {
        lat: port.location.coordinates[1],
        lng: port.location.coordinates[0],
      };
    }
    return {
      lat: 59.95,
      lng: 30.33,
    };
  }, [port]);
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyB3MMFqosCSoYHNY9ChTxytllGDjgkq2oU" }}
      center={center}
      defaultZoom={11}
    >
      {!!port && (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Legenda_port.svg/1024px-Legenda_port.svg.png"
          width={50}
          height={50}
          lat={center.lat}
          lng={center.lng}
        />
      )}
      {ships.map((item) => {
        return (
          <img
            className={item.idle ? "filter-tint" : ""}
            style={{
              tintColor: "yellow",
              backgroundColor:
                selectedShip && item.id === selectedShip.id ? "yellow" : null,
            }}
            onClick={() => {
              setSelectedShip(item);
            }}
            src="https://icon-library.com/images/boat-icon-png/boat-icon-png-12.jpg"
            width={25}
            height={25}
            lat={item.location.coordinates[1]}
            lng={item.location.coordinates[0]}
          />
        );
      })}

      {destinationPort && (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Legenda_port.svg/1024px-Legenda_port.svg.png"
          width={50}
          height={50}
          className="filter-tint2"
          lat={destinationPort.lat}
          lng={destinationPort.lng}
        />
      )}
    </GoogleMapReact>
  );
};
