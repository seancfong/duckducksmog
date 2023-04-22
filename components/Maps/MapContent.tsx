import React, { useEffect, useRef } from "react";

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
};

const MapComponent = ({ center, zoom }: Props) => {
  const ref = useRef(null);

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom,
    tilt: 50,
    disableDefaultUI: true,
    mapId: "58ecad07b2583814",
  };

  async function initWebGLOverlayView(map: google.maps.Map) {
    let scene, renderer, camera, loader;
    const webGLOverlayView = new google.maps.WebGLOverlayView();

    webGLOverlayView.onAdd = () => {};
    webGLOverlayView.onContextRestored = ({ gl }) => {};
    webGLOverlayView.onDraw = ({ gl, coordinateTransformer }) => {};
    webGLOverlayView.setMap(map);
  }

  useEffect(() => {
    // Init map
    /* @ts-ignore */
    const map = new window.google.maps.Map(ref.current, mapOptions);

    initWebGLOverlayView(map);
  }, []);

  return <div ref={ref} id="map" className={"w-full h-full"} />;
};

export default MapComponent;
