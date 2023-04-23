// Copyright 2021 Google LLC

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//     https://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const data = [
  {
    "id": "gas",
    "category": "Refineries",
    "emissions": 16797997,
    "location": {
      "name": "Tesoro Refining & Marketing Company LLC",
      "address": "Carson One Campus, 2530 E. 223rd street , Carson, CA 90810",
      "coords": {
        "lat": 33.824,
        "long": -118.233
      }
    }
  },
  {
    "id": "plant",
    "category": "Power Plants",
    "emissions": 5365993,
    "location": {
      "name": "AES Redondo Beach",
      "address": "1100 North Harbor Drive , Redondo Beach, CA 90277",
      "coords": {
        "lat": 33.85,
        "long": -118.393
      }
    }
  },
  {
    "id": "uni",
    "category": "Universities",
    "emissions": 312294,
    "location": {
      "name": "University of California, Los Angeles",
      "address": "405 Hilgard Ave. , Los Angeles, CA 90095",
      "coords": {
        "lat": 34.071,
        "long": -118.445
      }
    }
  },
  {
    "id": "waste",
    "category": "Landfills and Waste Processing",
    "emissions": 381663,
    "location": {
      "name": "Puente Hills Landfill",
      "address": "13130 Crossroads Parkway , City of Industry, CA 90607",
      "coords": {
        "lat": 34.028,
        "long": -118.017
      }
    }
  },
  {
    "id": "hospital",
    "category": "Hospitals",
    "emissions": 102412,
    "location": {
      "name": "Cedars-Sinai Medical Center",
      "address": "8700 Beverly Blvd. , Los Angeles, CA 90048",
      "coords": {
        "lat": 34.075,
        "long": -118.38
      }
    },
    "news": {
      "headline": "Healthcare Funding Slashed to Reduce Carbon Emissions",
      "body": "Thousands of residents no longer have access to nearby medical care, leading to overflow and crowding at remaining hospitals within the city."
    }
  },
  {
    "id": "factory",
    "category": "Factories",
    "emissions": 32488,
    "location": {
      "name": "Northrop Grumman",
      "address": "3520 E Avenue M , Palmdale, CA 93550",
      "coords": {
        "lat": 33.78,
        "long": -118.218
      }
    },
    "news": {
      "headline": "",
      "body": "Thousands of residents no longer have access to nearby medical care, leading to overflow and crowding at remaining hospitals within the city."
    }
  },
  {
    "id": "airport",
    "category": "Airport Operations",
    "emissions": 23963,
    "location": {
      "name": "Los Angeles International Airport",
      "address": "275 Center Way , Los Angeles, CA 90045",
      "coords": {
        "lat": 33.944,
        "long": -118.405
      }
    }
  },
  {
    "id": "vehicle",
    "category": "Vehicle Emissions",
    "emissions": 41682227,
    "location": {
      "name": "101 & I-405 Interchange",
      "address": "101 El Camino Real, Sherman Oaks, Los Angeles, CA",
      "coords": {
        "lat": 34.160231,
        "long": -118.469495
      }
    }
  },
  {
    "id": "food",
    "category": "Restaurants and Food Processing",
    "emissions": 116909,
    "location": {
      "name": "Clougherty Packing, LLC",
      "address": "3049 E Vernon Ave , Vernon, CA 90058",
      "coords": {
        "lat": 34.005,
        "long": -118.219
      }
    }
  }
]
const apiOptions = {
  apiKey: "AIzaSyCYGpG9IZUOcrgUd8px_Vu_eGUs0aSjcl8",
  version: "beta"
};

const mapOptions = {
  "tilt": 50,
  "heading": 0,
  "zoom": 15,
  "center" : { lat: 34.0488, lng: -118.2518 },
  "mapId": "58ecad07b2583814"
}

async function initMap() {    
  const mapDiv = document.getElementById("map");
  const apiLoader = new Loader(apiOptions);
  await apiLoader.load();
  return new google.maps.Map(mapDiv, mapOptions);
}




function initWebGLOverlayView (map) {
  
  let scene, renderer, camera, mixer, loader, gasMixer, gasAction, action;
  const webGLOverlayView = new google.maps.WebGLOverlayView();
  
  
 
    
  
  function loadModels(id){
      switch(id){
        case "cloud":
          const cloud = "/clouds/scene.gltf";
          return new Promise((resolve, reject) => {
          loader.load(
            cloud,
            gltf => { 
              const model1 = gltf.scene
              model1.name = 'cloud';
              model1.scale.set(3,3,3);
              model1.rotation.x = Math.PI / 2;
              model1.traverse((object) => {
                if (object.material) {
                  object.material.opacity = 0.5;
                  object.material.transparent = true;
                }
              });
          
              const clip = new THREE.AnimationClip('CloudAnimation', 20, [
                // Define a keyframe track for the cloud's position
                new THREE.VectorKeyframeTrack('.position', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], [
                  0, 0, 250,    // x,y,z coordinates for time 0
                  0.5, 1.5, 250,    // x,y,z coordinates for time 1
                  1, 2, 250.5,  // x,y,z coordinates for time 2
                  0.5, 2.5, 250.5,  // x,y,z coordinates for time 3
                  -0.5, 2.5, 250.5, // x,y,z coordinates for time 4
                  -1, 2, 250.5,   // x,y,z coordinates for time 5
                  -1, 2, 250,   // x,y,z coordinates for time 6
                  -1, 2, 249.5, // x,y,z coordinates for time 7
                  -0.5, 2.5, 249.5, // x,y,z coordinates for time 8
                  0.5, 2.5, 249.5, // x,y,z coordinates for time 9
                  1, 2, 249.5, // x,y,z coordinates for time 10
                  0.5, 1.5, 250,    // x,y,z coordinates for time 11
                  1, 2, 250.5,  // x,y,z coordinates for time 12
                  0.5, 2.5, 250.5,  // x,y,z coordinates for time 13
                  -0.5, 2.5, 250.5, // x,y,z coordinates for time 14
                  -1, 2, 250.5,   // x,y,z coordinates for time 15
                  -1, 2, 250,   // x,y,z coordinates for time 16
                  -1, 2, 249.5, // x,y,z coordinates for time 17
                  -0.5, 2.5, 249.5, // x,y,z coordinates for time 18
                  0.5, 2.5, 249.5, // x,y,z coordinates for time 19
                  0, 0, 250     // x,y,z coordinates for time 20 (matching the starting position)
                ])]);
              
              // Create a new animation mixer and add the clip to it
              mixer = new THREE.AnimationMixer(model1);
              action = mixer.clipAction(clip);
              
              // Set the animation to loop and start playing it
              action.loop = THREE.LoopRepeat;
              action.play();
             resolve(model1)
            }
          );})
          break;
        case "gas":
          const gas = "/gas/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(gas, gltf => {
            const model1 = gltf.scene
            model1.name = 'gas';
            model1.rotation.x = Math.PI / 2;
            model1.scale.set(200,200,200);
            resolve(model1);
          });
        });
        break;
        case "factory":
          const factory = "/factory/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(factory, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'factory';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(60,60,60);
              resolve(model1);
            })
          })
        break;
        case "hospital":
          const hospital = "/hospital/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(hospital, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'factory';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(25,25,25);
              resolve(model1);
            })
          })
        break;
        case "waste":
          const waste = "/waste/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(waste, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'factory';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(300,300,300);
              resolve(model1);
            })
          })
        break;
        case "plant":
          const plant = "/plant/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(plant, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'factory';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(100,100,100);
              resolve(model1);
            })
          })
        break;
        case "airport":
          const airport = "/airport/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(airport, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'airport';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(.3,.3,.3);
              resolve(model1);
            })
          })
        break;
        case "uni":
          const uni = "/uni/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(uni, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'uni';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(250,250,250);
              resolve(model1);
            })
          })
        break;
        case "vehicle":
          const vehicle = "/vehicle/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(vehicle, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'vehicle';
              model1.rotation.x = Math.PI / 2;
              model1.scale.set(100,100,100);
              resolve(model1);
            })
          })
        break;
        case "food":
          const food = "/food/scene.gltf"
          return new Promise((resolve, reject) => {
            loader.load(food, gltf =>{
              const model1 = gltf.scene;
              model1.name = 'food';
              model1.rotation.x = Math.PI / 2;
              model1.rotation.y = Math.PI / 2;
              model1.scale.set(400,400,400);
              resolve(model1);
            })
          })
        break;
      }
  }

  webGLOverlayView.onAdd = async () => {  
    loader = new GLTFLoader();
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();
    
    
    const ambientLight = new THREE.AmbientLight( 0xffffff, .75); // soft white light
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

    data.forEach(async obj => {
      
      const cloudobj = new THREE.Object3D();
      const itemobj = new THREE.Object3D();
      itemobj.name='itemobj'
      cloudobj.name='cloudobj'

      const projection = map.getProjection();
      if (!projection) {
        return;
      }


      const radius = 6371* 3.3
      // Get the center of the map in LatLng coordinates
      const centerLatLng = map.getCenter();

      // Convert the center LatLng to a Point
      const centerPoint = projection.fromLatLngToPoint(centerLatLng);

      // Convert the target LatLng to a Point
      const targetLatLng = { lat: obj['location']['coords']['lat'], lng: obj['location']['coords']['long'] };
      const targetPoint = projection.fromLatLngToPoint(targetLatLng);

      // Calculate the x and y offsets
      const xOffset = (targetPoint.x - centerPoint.x) * 2 * Math.PI * radius;
      const yOffset = (centerPoint.y - targetPoint.y) * 2 * Math.PI * radius;

      cloudobj.position.set(xOffset, yOffset, 600)
      itemobj.position.set(xOffset,yOffset,75)
      // cloudobj.coords = {lat: obj['location']['coords']['lat'], lng:obj['location']['coords']['long'], altitude: 250}
      // itemobj.coords = {lat: obj['location']['coords']['lat'], lng:obj['location']['coords']['long'], altitude: 125}
      // console.log(cloudobj)

      var model = await loadModels(obj['id'])
      var cloudModel = await loadModels('cloud')
      if(model && cloudModel){
        itemobj.add(model)
        cloudobj.add(cloudModel)
        scene.add(itemobj)
        scene.add(cloudobj)
      }
      
    });
    
  }
  webGLOverlayView.onContextRestored = ({gl}) => {    
    // create the three.js renderer, using the
    // maps's WebGL rendering context.
    renderer = new THREE.WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });
    renderer.autoClear = false;

    
  }
  webGLOverlayView.onDraw = ({gl, transformer}) => {
    const matrix = transformer.fromLatLngAltitude({
      lat: mapOptions.center.lat,
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

(async () => {        
  const map = await initMap();
  initWebGLOverlayView(map);
})();