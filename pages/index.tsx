import GoogleMaps from "@/components/Maps/GoogleMaps";
import Overlay from "@/components/Overlay";
import { useEffect, useState } from "react";
import Head from "next/head";
import { newsType } from "@/components/Newspaper";
import React, { useRef } from "react";
import { useMouse } from "react-use";
import Tooltip, { tooltipOptions } from "@/components/Tooltip";
import { AnimatePresence } from "framer-motion";

export type clickType = {
  category: string;
  emissions: number;
};

export default function Home() {
  const [overlayStage, setOverlayStage] = useState<string>("intro");
  const [newsContent, setNewsContent] = useState<newsType>({
    headline: "",
    body: [""],
  });
  const [mouseTooltip, setMouseTooltip] = useState<tooltipOptions | null>(null);
  const [numClicked, setNumClicked] = useState<Array<clickType>>([]);

  const docRef = useRef(null);
  const { docX, docY } = useMouse(docRef);

  return (
    <>
      <Head>
        <title>LA Quacks</title>
      </Head>
      <main className="w-screen h-screen relative overflow-hidden" ref={docRef}>
        <GoogleMaps
          setNewsContent={setNewsContent}
          setOverlayStage={setOverlayStage}
          setMouseTooltip={setMouseTooltip}
          setNumClicked={setNumClicked}
          docRef={docRef}
        />
        <Overlay
          overlayStage={overlayStage}
          setOverlayStage={setOverlayStage}
          numClicked={numClicked}
          setNumClicked={setNumClicked}
          newsContent={newsContent}
        />
        <div
          className="absolute pointer-events-none w-min h-min"
          style={{
            top:
              // @ts-ignore
              docY + (docRef?.current?.clientHeight - 100 < docY ? -100 : 10),
            left:
              // @ts-ignore
              docX + (docRef?.current?.clientWidth - 400 < docX ? -400 : 10),
          }}
        >
          <Tooltip options={mouseTooltip} />
        </div>
      </main>
    </>
  );
}
