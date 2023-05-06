## [LAHacks 2023 Devpost Link](https://devpost.com/software/duckducksmog)

## Inspiration
Every day, the news is flooded with concerns about climate change, throwing blame to new issues, touting hot new ways to reduce your own carbon footprint, and providing half-baked ideas on how to solve it without considering the consequences. It's easy to drown under the constant waves of noise and lose the ability to recognize good ideas from bad. Every sustainability solution has already been mentioned to the point of saturation, and it can be hard to measure one solution against another and see what answers really matter.

## What it does
DuckDuckSmog solves this problem by placing the user in the shoes of someone with real power: a city councilperson. Users can try their hand at solving LA's carbon footprint themselves, by simulating a possible solution and seeing the consequences live in the news, using real Greenhouse Gas Emission data.

Users are given choices of what sectors of LA's economy to target for sustainability solutions, and can try to maximize their carbon footprint reduction in a limited number of actions. Each time a choice is made, they can see how their actions affect the city socially and economically.

## How we built it
DuckDuckSmog is a web-app running on Next.js, with an interactive 3d environment created using the Google Maps API and Three.js.

Data for carbon footprints was pulled from various peer-reviewed studies on carbon emissions in LA as well as state government data from CARB, South Coast and Antelope Valley Air Quality Management Districts. All 3D models used are freely licensed to students.

## Challenges we ran into
The largest challenge we faced was geolocating the models into their respective landmark zones. Working with 3D models and integrating them with geolocations in a web environment is not a forgiving task. This required a significant amount of math to align coordinate data with locations within the browser's 3D WebGL environment, using matrix transformations and trigonometry.

## Accomplishments that we're proud of
We are proud of the atmosphere we created in our webapp through our artistic choices, in visual style, writing, and UI design. We were also proud of creating an interactive 3D experience within the limited environment of a browser.

## What we learned
We learned how hard it is to work with 3d models within a geographical environment.
