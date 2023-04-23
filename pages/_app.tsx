import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Lexend_Deca, Newsreader } from "next/font/google";

const lexendDeca = Lexend_Deca({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
const newsreader = Newsreader({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --lexend-deca-font: ${lexendDeca.style.fontFamily};
            --newsreader-font: ${newsreader.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
