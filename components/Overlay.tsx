import { AnimatePresence, motion } from "framer-motion";
import React, { SetStateAction, useEffect, useState } from "react";
import { getCurrentDate } from "@/lib/utils/helpers";
import { BsChevronDoubleDown } from "react-icons/bs";
import Newspaper from "./Newspaper";

type Props = {
  overlayStage: string;
  setOverlayStage: React.Dispatch<SetStateAction<string>>;
};

const Overlay = ({ overlayStage, setOverlayStage }: Props) => {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    if (overlayStage == "intro") {
      setDateString(new Date().toDateString());
    }
  }, [overlayStage]);

  return (
    <>
      <AnimatePresence>
        {overlayStage == "intro" && (
          <motion.div
            className="w-screen h-screen fixed left-0 top-0 flex flex-col justify-start items-center bg-slate-700 bg-opacity-20 overflow-y-scroll py-32 gray-scrollbar"
            initial={false}
            animate={{ y: "0vh" }}
            exit={{ y: "-100vh" }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            {/* newspaper div */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.04, 1, 0.29, 0.99],
                delay: 1.5,
              }}
              className="w-[60rem] bg-slate-100 rounded-xl grid grid-cols-5 auto-rows-min p-10 text-slate-600 font-newsreader relative"
            >
              {/* scroll icon */}
              <div className="absolute w-full flex flex-col items-center text-white -top-16">
                <BsChevronDoubleDown className="animate-bounce" />
                <span className="font-primary tracking-wider">Scroll Down</span>
              </div>
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
                  Angeles, you must tackle 3 sustainability projects during your
                  term, balancing effectiveness with cost.
                </p>
                <p className="font-semibold">Your goal:</p>
                <p>
                  Implement the best sustainability policies during your term
                  and get re-elected!
                </p>
              </div>
              <div className="h-full col-span-2 bg-slate-300 ml-5 rounded-lg" />
            </motion.div>
            {/* button to begin */}
            <div className="flex justify-center py-5 col-span-5">
              <button
                className="bg-green-500 rounded-xl px-10 py-3 text-white text-xl font-mediumA font-primary"
                onClick={() => {
                  setOverlayStage("game");
                }}
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {overlayStage == "game" && (
          // Navbar
          <motion.div
            className="fixed top-3 left-3 pointer-events-none bg-slate-100 px-4 py-1 rounded-lg bg-opacity-60"
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <h1 className="font-primary text-3xl text-slate-600">
              Smog Papers
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
      {overlayStage == "news" && (
        <Newspaper
          headline="New Policy to Reduce Emissions in Universities"
          bodySections={[
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
              mollitia labore amet assumenda alias quis incidunt, voluptas
              veritatis eaque facilis dignissimos porro tempore maiores soluta
              optio voluptatem. Illum, neque voluptate.
            </p>,
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt
              mollitia labore amet assumenda alias quis incidunt, voluptas
              veritatis eaque facilis dignissimos porro tempore maiores soluta
              optio voluptatem. Illum, neque voluptate.
            </p>,
          ]}
        />
      )}
    </>
  );
};

export default Overlay;
