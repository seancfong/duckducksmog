import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { BsChevronDoubleDown } from "react-icons/bs";

export interface newsType {
  headline: string;
  body: Array<string>;
}

type Props = {
  headline: string;
  bodySections: Array<React.ReactElement>;
  setOverlayStage: React.Dispatch<React.SetStateAction<string>>;
};

const Newspaper = ({ headline, bodySections, setOverlayStage }: Props) => {
  const [dateString, setDateString] = useState<string>("");

  useEffect(() => {
    setDateString(new Date().toDateString());
  }, []);

  return (
    <motion.div
      className="w-screen h-screen fixed left-0 top-0 flex flex-col justify-start items-center bg-slate-700 bg-opacity-20 overflow-y-scroll py-32 gray-scrollbar"
      initial={{ y: "0vh", opacity: 0 }}
      animate={{ y: "0vh", opacity: 1 }}
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
          delay: 0.5,
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
          <h2 className="uppercase font-semibold text-8xl">Policy Update</h2>
          <p className="uppercase text-slate-400 text-3xl font-medium">
            The Unofficial LA Hacks Newspaper
          </p>
        </div>
        {/* newspaper headline: 5 col */}
        <div className="pt-10 col-span-5 pb-5">
          <h3 className="text-5xl font-medium">{headline}</h3>
        </div>
        {/* newspaper body: 3 + 2 col */}
        {bodySections.map((section: React.ReactElement, i: number) => {
          const sectionClass =
            "text-2xl col-span-3 flex flex-col gap-5 text-slate-600";
          const imgClass = "h-full col-span-2 bg-slate-300 rounded-lg";

          return (
            <>
              {i % 2 == 0 && (
                <>
                  <div className={sectionClass}>{section}</div>
                  <div className={imgClass + " ml-5"} />
                  <div className="col-span-5 h-10"></div>
                </>
              )}
              {i % 2 == 1 && (
                <>
                  <div className={imgClass + " mr-5"} />
                  <div className={sectionClass}>{section}</div>
                  <div className="col-span-5 h-10"></div>
                </>
              )}
            </>
          );
        })}
      </motion.div>
      {/* button to begin */}
      <div className="flex justify-center py-5 col-span-5">
        <button
          className="bg-slate-100 rounded-xl px-10 py-3 text-slate-600 border-4 border-slate-600 text-xl font-medium font-primary"
          onClick={() => {
            setOverlayStage("");
          }}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Newspaper;
