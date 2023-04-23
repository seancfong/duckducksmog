import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { getCurrentDate } from "@/lib/utils/helpers";

type Props = {
  overlayStage: string;
};

const Overlay = ({ overlayStage }: Props) => {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    if (overlayStage == "intro") {
      setDateString(new Date().toDateString());
    }
  }, [overlayStage]);
  return (
    <>
      {overlayStage == "intro" && (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-slate-700 bg-opacity-20">
          {/* newspaper div */}
          <motion.div
            initial={{ scale: 0.4 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-[60rem] h-3/4 bg-slate-100 rounded-xl grid grid-cols-5 auto-rows-min px-10 py-5 text-slate-600 font-newsreader overflow-y-scroll gray-scrollbar"
          >
            {/* newspaper info: 5 col */}
            <div className="col-span-5 flex border-b-4 border-slate-600 justify-between font-semibold text-lg">
              <div className="text-slate-400">
                California's sustainability report
              </div>
              <div className="text-slate-600">{dateString} Issue</div>
            </div>
            {/* newspaper title: 5 col */}
            <div className="flex flex-col col-span-5 items-center pt-10 pb-5 border-b-4 border-slate-600">
              <h2 className="uppercase font-semibold text-8xl">LA Quacks</h2>
              <p className="uppercase text-slate-400 text-3xl font-medium">
                The Unofficial LA Hacks Newspaper
              </p>
            </div>
            {/* newspaper headline: 5 col */}
            <div className="pt-10 col-span-5 pb-5">
              <h3 className="text-5xl font-medium">
                Election Results Are Out!
              </h3>
            </div>
            {/* newspaper body: 3 + 2 col */}
            <div className="text-2xl col-span-3 flex flex-col gap-5">
              <p>
                As the newly elected Chief Sustainability Officer of Los
                Angeles, you tackle 3 sustainability projects during your term,
                balancing effectiveness with cost.
              </p>
              <p className="font-semibold">Your goal:</p>
              <p>
                Implement the best sustainability policies during your term and
                get re-elected!
              </p>
            </div>
            <div className="h-full col-span-2 bg-slate-300 ml-5 rounded-lg" />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Overlay;
