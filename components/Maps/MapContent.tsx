import React, { useEffect, useRef } from "react";
// import { styledMapType } from "./MapStyles";
import data from "@/pages/api/data.json";
import { newsType } from "../Newspaper";
import Tooltip, { tooltipOptions } from "../Tooltip";
import { useMouse } from "react-use";
import { clickType } from "@/pages";

type Props = {
  center: google.maps.LatLngLiteral;
  zoom: number;
  setNewsContent: React.Dispatch<React.SetStateAction<newsType>>;
  setOverlayStage: React.Dispatch<React.SetStateAction<string>>;
  setNumClicked: React.Dispatch<React.SetStateAction<Array<clickType>>>;
  setMouseTooltip: React.Dispatch<React.SetStateAction<tooltipOptions | null>>;
  docRef: React.RefObject<Element>;
};

interface locationType {
  category?: string;
  emissions?: number;
  location: {
    name: string;
    address: string;
    coords: {
      lat: number;
      long: number;
    };
  };
  news?: newsType;
}

const MapComponent = ({
  center,
  zoom,
  setNewsContent,
  setOverlayStage,
  setNumClicked,
  setMouseTooltip,
  docRef,
}: Props) => {
  const ref = useRef(null);

  const { docX, docY } = useMouse(docRef);

  // useEffect(() => {
  //   console.log(docX, docY);
  // }, [docX, docY]);

  const mapOptions: google.maps.MapOptions = {
    center,
    zoom,
    minZoom: zoom - 1,
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

    initWebGLOverlayView(map).then(() => {
      data.forEach((entry: locationType) => {
        // console.log(entry.location.address);

        const cityCircle = new google.maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          map,
          center: {
            lat: entry.location.coords.lat,
            lng: entry.location.coords.long,
          },
          radius: 900,
        });

        cityCircle.addListener("mouseover", () => {
          // console.log(`${entry.location.name} hover`);

          if (entry.category && entry.location.name) {
            setMouseTooltip({
              title: entry.location.name,
              category: entry.category!,
              description: "This place is producing too much smog!",
            });
          }
        });

        cityCircle.addListener("mouseout", () => {
          setMouseTooltip(null);
        });

        cityCircle.addListener("click", () => {
          console.log(`${entry.location.name} click`);

          if (entry.news) {
            setNewsContent({
              headline: entry.news.headline,
              body: entry.news.body,
            });

            setOverlayStage("news");

            let newClick: clickType = {
              category: entry.category!,
              emissions: entry.emissions!,
            };
            setNumClicked((num) => [...num, newClick]);
          }
        });

        // // Define the LatLng coordinates for the polygon's path.
        // const locationCoords = [
        //   {
        //     lat: entry.location.coords.lat + 0.003,
        //     lng: entry.location.coords.long,
        //   },
        //   {
        //     lat: entry.location.coords.lat,
        //     lng: entry.location.coords.long + 0.003,
        //   },
        //   {
        //     lat: entry.location.coords.lat - 0.003,
        //     lng: entry.location.coords.long,
        //   },
        //   {
        //     lat: entry.location.coords.lat,
        //     lng: entry.location.coords.long - 0.003,
        //   },
        // ];

        // // Construct the polygon.
        // const locationPolygon = new google.maps.Polygon({
        //   paths: locationCoords,
        //   strokeColor: "#FF0000",
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: "#FF0000",
        //   fillOpacity: 0.35,
        // });

        // locationPolygon.setMap(map);
      });
    });

    // //  Init styles
    // const styles = new google.maps.StyledMapType(styledMapType, {
    //   name: "Styled Map",
    // });

    // map.mapTypes.set("styled_map", styles);
    // map.setMapTypeId("styled_map");
  }, []);

  return <div ref={ref} id="map" className={"w-full h-full"} />;
};

export default MapComponent;
