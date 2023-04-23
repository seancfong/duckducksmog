import GoogleMaps from "@/components/Maps/GoogleMaps";
import Overlay from "@/components/Overlay";

export default function Home() {
  return (
    <main className="w-screen h-screen relative">
      <GoogleMaps />
      <Overlay overlayStage={"intro"} />
    </main>
  );
}
