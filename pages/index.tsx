import GoogleMaps from "@/components/Maps/GoogleMaps";
import Overlay from "@/components/Overlay";
import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [overlayStage, setOverlayStage] = useState<string>("intro");

  return (
    <>
      <Head>
        <title>LA Quacks</title>
      </Head>
      <main className="w-screen h-screen relative">
        <GoogleMaps />
        <Overlay
          overlayStage={overlayStage}
          setOverlayStage={setOverlayStage}
        />
      </main>
    </>
  );
}
