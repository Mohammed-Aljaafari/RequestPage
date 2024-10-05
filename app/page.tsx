import Image from "next/image";
import { Readex_Pro } from "next/font/google";
import catGif from "../public/giphy.gif";
import Head from 'next/head';

const readexPro = Readex_Pro({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>IE Club</title>
        <meta property="og:title" content="IE Club" />
        <meta property="og:description" content="Welcome to the Intellectual and Electronic Games Club at KFUPM - your ultimate destination for mind-stimulating and adrenaline-pumping gaming experiences! Dive into a vibrant community where passion meets intellect, offering a diverse range of intellectual and electronic games tailored for enthusiasts of all levels. Whether you're a chess grandmaster, a strategy aficionado, or a virtual reality enthusiast, our club provides a dynamic platform to engage, compete, and collaborate with like-minded individuals. Explore our extensive lineup of events, tournaments, and workshops designed to challenge your intellect, foster creativity, and foster lasting friendships. Join us at the forefront of innovation and entertainment, where fun and mental prowess intertwine seamlessly. Embark on your journey to sharpen your skills, expand your horizons, and unleash your gaming potential with the Intellectual and Electronic Games Club at KFUPM today!" />
        <meta property="og:image" content="ieclub_logo_vector.svg" />
        <meta property="og:url" content="ie.kfupm.club/" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
        <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center w-full">
            <Image
              src="/ieclub_logo_vector.svg"
              alt="Logo"
              width={100}
              height={100}
              priority
            />
            <div
              className="flex flex-col items-center justify-center mt-4 md:mt-0 md:ml-4 w-full"
              style={{ width: "65%" }}
            >
              <p
                className={`${readexPro.className} text-2xl font-semibold`}
                style={{
                  fontSize: "calc(13.5px + 1vmin)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                نادي الرياضات الذهنية والإلكترونية
              </p>
              <p
                className={`${readexPro.className} text-2xl font-semibold`}
                style={{
                  fontSize: "calc(10px + 1vmin)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Intellectual & Electronic Sports Club
              </p>
            </div>
          </div>
          <p className="mt-10 mb-10 text-2xl font-semibold">
            Work in progress. Stay tuned...
          </p>
          {/* gif giphy.gif from public dir */}
          <Image
            src={catGif}
            alt="cat gif"
            width={300}
            height={300}
            priority
            className="rounded-xl"
          />
        </div>
      </main>
    </>
  );
}
