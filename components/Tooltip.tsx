import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export type tooltipOptions = {
  title: string;
  category: string;
  description: string;
};

type Props = {
  options: tooltipOptions | null;
};

const Tooltip = ({ options }: Props) => {
  return (
    <AnimatePresence>
      {options && (
        <div className="absolute py-3 overflow-y-hidden">
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-150%" }}
            className="relative w-min h-min bg-slate-700 rounded-xl text-white flex flex-col justify-center items-center px-5 py-2 text-center font-primary whitespace-nowrap"
          >
            <p className="font-light">Create a new policy for</p>
            <h4 className="text-2xl">{options.category}</h4>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Tooltip;
