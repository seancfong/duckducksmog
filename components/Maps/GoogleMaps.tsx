import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React, { ReactElement } from "react";
import MapComponent from "./MapContent";

type Props = {};

let mapsKey = process.env["NEXT_PUBLIC_GOOGLE_MAPS_KEY"];

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <h3>{status} ..</h3>;
  if (status === Status.FAILURE) return <h3>{status} ...</h3>;
  /* @ts-ignore */
  return null;
};

const GoogleMaps = (props: Props) => {
  const center = { lat: 34.0488, lng: -118.2518 };
  const zoom = 17;

  return (
    <Wrapper apiKey={mapsKey ?? ""} render={render}>
      <MapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
};

export default GoogleMaps;
