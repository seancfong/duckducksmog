import React, { useEffect, useRef } from "react";
// import { styledMapType } from "./MapStyles";

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

const MapComponent = ({ center, zoom }: Props) => {
  const ref = useRef(null);

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom,
    // minZoom: zoom,
    tilt: 50,
    disableDefaultUI: true,
    mapId: "58ecad07b2583814",
  };

  async function initWebGLOverlayView(map: google.maps.Map) {
    let scene, renderer, camera, loader;
    // @ts-ignore
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {};
    webGLOverlayView.onContextRestored = ({ gl }: any) => {};
    // @ts-ignore
    webGLOverlayView.onDraw = ({ gl, coordinateTransformer }) => {};
    webGLOverlayView.setMap(map);
  }

  useEffect(() => {
    // Init map
    /* @ts-ignore */

    const map = new window.google.maps.Map(ref.current, mapOptions);

    map.data.loadGeoJson("https://www.gstatic.com/mapsdata/buildings_v1.json");

    // Set the style for the building footprints
    map.data.setStyle({
      fillColor: "#b4b4b4",
      strokeColor: "#ffffff",
      strokeWeight: 1,
      visible: true,
    });

    // //  Init styles
    // const styles = new google.maps.StyledMapType(styledMapType, {
    //   name: "Styled Map",
    // });

    // map.mapTypes.set("styled_map", styles);
    // map.setMapTypeId("styled_map");

    initWebGLOverlayView(map);
  }, []);

  return <div ref={ref} id="map" className={"w-full h-full"} />;
};

export default MapComponent;
