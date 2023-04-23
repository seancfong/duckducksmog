import React, { useEffect, useRef } from "react";
// import { styledMapType } from "./MapStyles";
import data from "@/pages/api/data.json";
import { newsType } from "../Newspaper";
import Tooltip, { tooltipOptions } from "../Tooltip";
import { useMouse } from "react-use";
import { clickType } from "@/pages";
import { Loader } from "@googlemaps/js-api-loader";
// @ts-ignore
import * as THREE from "three";
// @ts-ignore
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

  function initWebGLOverlayView(map: any) {
    // @ts-ignore
    let scene: THREE.Scene,
      // @ts-ignore
      renderer: {
        autoClear: boolean;
        render: (
          arg0: any,
          arg1: {
            // import { styledMapType } from "./MapStyles";
            projectionMatrix: any;
          }
        ) => void;
        resetState: () => void;
      },
      // @ts-ignore
      camera: { projectionMatrix: any },
      // @ts-ignore
      mixer: THREE.AnimationMixer,
      loader: {
        load: (
          arg0: string,
          arg1: {
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
            (gltf: any): void;
          }
        ) => void;
      },
      action;
    const webGLOverlayView = new google.maps.WebGLOverlayView();
    function loadModels(id: any) {
      switch (id) {
        case "cloud":
          const cloud = "/clouds/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(cloud, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "cloud";
              model1.scale.set(10, 10, 10);
              model1.rotation.x = Math.PI / 2;
              console.log("inside cloud");
              model1.traverse((object: any) => {
                if (object.material) {
                  object.material.opacity = 0.5;
                  object.material.transparent = true;
                }
              });

              const clip = new THREE.AnimationClip("CloudAnimation", 20, [
                // Define a keyframe track for the cloud's position
                new THREE.VectorKeyframeTrack(
                  ".position",
                  [
                    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
                    17, 18, 19, 20,
                  ],
                  [
                    0,
                    0,
                    250, // x,y,z coordinates for time 0
                    0.5,
                    1.5,
                    250, // x,y,z coordinates for time 1
                    1,
                    2,
                    250.5, // x,y,z coordinates for time 2
                    0.5,
                    2.5,
                    250.5, // x,y,z coordinates for time 3
                    -0.5,
                    2.5,
                    250.5, // x,y,z coordinates for time 4
                    -1,
                    2,
                    250.5, // x,y,z coordinates for time 5
                    -1,
                    2,
                    250, // x,y,z coordinates for time 6
                    -1,
                    2,
                    249.5, // x,y,z coordinates for time 7
                    -0.5,
                    2.5,
                    249.5, // x,y,z coordinates for time 8
                    0.5,
                    2.5,
                    249.5, // x,y,z coordinates for time 9
                    1,
                    2,
                    249.5, // x,y,z coordinates for time 10
                    0.5,
                    1.5,
                    250, // x,y,z coordinates for time 11
                    1,
                    2,
                    250.5, // x,y,z coordinates for time 12
                    0.5,
                    2.5,
                    250.5, // x,y,z coordinates for time 13
                    -0.5,
                    2.5,
                    250.5, // x,y,z coordinates for time 14
                    -1,
                    2,
                    250.5, // x,y,z coordinates for time 15
                    -1,
                    2,
                    250, // x,y,z coordinates for time 16
                    -1,
                    2,
                    249.5, // x,y,z coordinates for time 17
                    -0.5,
                    2.5,
                    249.5, // x,y,z coordinates for time 18
                    0.5,
                    2.5,
                    249.5, // x,y,z coordinates for time 19
                    0,
                    0,
                    250, // x,y,z coordinates for time 20 (matching the starting position)
                  ]
                ),
              ]);

              // Create a new animation mixer and add the clip to it
              mixer = new THREE.AnimationMixer(model1);
              action = mixer.clipAction(clip);

              // Set the animation to loop and start playing it
              action.loop = THREE.LoopRepeat;
              action.play();
              resolve(model1);
            });
          });
          break;
        case "gas":
          const gas = "/gas/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(gas, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "gas";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(1000, 1000, 1000);
              resolve(model1);
            });
          });
          break;
        case "factory":
          const factory = "/factory/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(factory, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "factory";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(200, 200, 200);
              resolve(model1);
            });
          });
          break;
        case "hospital":
          const hospital = "/hospital/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(hospital, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "factory";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(100, 100, 100);
              resolve(model1);
            });
          });
          break;
        case "waste":
          const waste = "/waste/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(waste, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "factory";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(1400, 1400, 1400);
              resolve(model1);
            });
          });
          break;
        case "plant":
          const plant = "/plant/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(plant, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "plant";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(500, 500, 500);
              resolve(model1);
            });
          });
          break;
        case "airport":
          const airport = "/airport/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(airport, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "airport";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(1.2, 1, 1);
              resolve(model1);
            });
          });
          break;
        case "uni":
          const uni = "/uni/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(uni, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "uni";
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(1000, 1000, 1000);
              resolve(model1);
            });
          });
          break;
        case "vehicle":
          const vehicle = "/vehicle/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(vehicle, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "vehicle";
              model1.rotation.x = Math.PI / 2;
              model1.rotation.y = Math.PI;
              model1.scale.set(400, 400, 500);
              resolve(model1);
            });
          });
          break;
        case "food":
          const food = "/food/scene.gltf";
          return new Promise((resolve, reject) => {
            loader.load(food, (gltf) => {
              const model1 = gltf.scene;
              model1.name = "food";
              model1.rotation.x = Math.PI / 2;
              model1.rotation.y = Math.PI / 2;
              model1.scale.set(2000, 2000, 2000);
              resolve(model1);
            });
          });
      }
    }

    webGLOverlayView.onAdd = async () => {
      loader = new GLTFLoader();
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera();

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.75); // soft white light
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(0, 1000, 0);
      directionalLight.castShadow = false;
      directionalLight.shadow.mapSize.width = 1024;
      directionalLight.shadow.mapSize.height = 1024;
      directionalLight.shadow.camera.near = 0.1;
      directionalLight.shadow.camera.far = 5000;
      directionalLight.shadow.camera.left = -1000;
      directionalLight.shadow.camera.right = 1000;
      directionalLight.shadow.camera.top = 1000;
      directionalLight.shadow.camera.bottom = -1000;
      directionalLight.position.set(0, 1000, 0);
      directionalLight.target.position.set(0, 0, 0);
      scene.add(directionalLight);

      // its go time mf
      const projection = map.getProjection();
      if (!projection) {
        return;
      }

      const radius = 6371 * 3.3;
      // Get the center of the map in LatLng coordinates
      const centerLatLng = map.getCenter();

      // Convert the center LatLng to a Point
      const centerPoint = projection.fromLatLngToPoint(centerLatLng);
      data.forEach(async (obj) => {
        const cloudobj = new THREE.Object3D();
        const itemobj = new THREE.Object3D();
        itemobj.name = "itemobj";
        cloudobj.name = "cloudobj";
        // Convert the target LatLng to a Point
        const targetLatLng = {
          lat: obj["location"]["coords"]["lat"],
          lng: obj["location"]["coords"]["long"],
        };
        const targetPoint = projection.fromLatLngToPoint(targetLatLng);

        // Calculate the x and y offsets
        const xOffset = (targetPoint.x - centerPoint.x) * 2 * Math.PI * radius;
        const yOffset = (centerPoint.y - targetPoint.y) * 2 * Math.PI * radius;

        cloudobj.position.set(xOffset, yOffset, 1000);
        itemobj.position.set(xOffset, yOffset, 5000);
        // cloudobj.coords = {lat: obj['location']['coords']['lat'], lng:obj['location']['coords']['long'], altitude: 250}
        // itemobj.coords = {lat: obj['location']['coords']['lat'], lng:obj['location']['coords']['long'], altitude: 125}
        // console.log(cloudobj)
        // @ts-ignore
        var model = await loadModels(obj["id"]);
        var cloudModel = await loadModels("cloud");
        if (model && cloudModel) {
          // @ts-ignore
          itemobj.add(model);
          // @ts-ignore
          cloudobj.add(cloudModel);
          // @ts-ignore
          scene.add(itemobj);
          // @ts-ignore
          scene.add(cloudobj);
        }
      });
    };
    webGLOverlayView.onContextRestored = ({ gl }) => {
      // create the three.js renderer, using the
      // maps's WebGL rendering context.
      // @ts-ignore
      renderer = new THREE.WebGLRenderer({
        canvas: gl.canvas,
        context: gl,
        ...gl.getContextAttributes(),
      });
      renderer.autoClear = false;
    };
    webGLOverlayView.onDraw = ({ gl, transformer }) => {
      const matrix = transformer.fromLatLngAltitude({
        // @ts-ignore
        lat: mapOptions.center.lat,
        // @ts-ignore
        lng: mapOptions.center.lng,
        altitude: 120,
      });
      camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

      // scene.children.forEach((obj) => {
      //   if(obj.coords){
      //     let name = obj.name
      //     let matrix = transformer.fromLatLngAltitude(obj.coords)
      //     let newermatrix = new THREE.Matrix4().fromArray(matrix)

      //     scene.updateMatrix(newermatrix)
      //     let newervector = new THREE.Vector3().fromArray(matrix)
      //     console.log(newervector)
      //     .position.copy(newervector)

      //   }
      // })
      // Request a redraw and render the scene.
      webGLOverlayView.requestRedraw();
      renderer.render(scene, camera);
      if (mixer) {
        const deltaTime = 1 / 60; // assuming 60 fps
        mixer.update(deltaTime);
      }

      // Always reset the GL state.
      renderer.resetState();
    };

    webGLOverlayView.setMap(map);
  }

  useEffect(() => {
    // Init map
    /* @ts-ignore */
    const map = new window.google.maps.Map(ref.current, mapOptions);

    // map.data.loadGeoJson("https://www.gstatic.com/mapsdata/buildings_v1.json");

    initWebGLOverlayView(map);

    data.forEach((entry: locationType) => {
      // console.log(entry.location.address);

      const cityCircle = new google.maps.Circle({
        strokeColor: "#22d2d4",
        strokeOpacity: 0.3,
        strokeWeight: 2,
        fillColor: "#22d2d4",
        fillOpacity: 0.15,
        map,
        center: {
          lat: entry.location.coords.lat,
          lng: entry.location.coords.long,
        },
        radius: 1400,
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
