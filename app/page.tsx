"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cinzel_Decorative } from "next/font/google";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export default function Home() {
  const [stage, setStage] = useState<"intro" | "loading" | "poster" | "schedule" | "no">("intro");
  const [noCount, setNoCount] = useState(0);
  const [leaves, setLeaves] = useState<{ x: number; delay: number; dur: number }[]>([]);

  useEffect(() => {
    if (stage === "loading") {
      const timer = setTimeout(() => setStage("poster"), 2500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  // fix hydration mismatch: only generate random leaves client-side
  useEffect(() => {
    setLeaves(
      Array.from({ length: 10 }, () => ({
        x: Math.random() * 100,
        delay: Math.random() * 5,
        dur: 10 + Math.random() * 10,
      }))
    );
  }, []);

  // Cute + spooky messages
  const noMessages = [
    "Aww... please say yes 🥺💀",
    "Baby say yes tayebbb 🕸️",
    "Dandounte i did this for you say YESSS ",
    "U still insist eno no ? 🥺🥺",
    "If you love me youll say yes <3 ",
  ];

  const currentNoMessage =
    noCount < noMessages.length ? noMessages[noCount] : noMessages[noMessages.length - 1];

  return (
    <main
      className={`flex items-center justify-center h-screen relative overflow-hidden text-white ${cinzel.className}`}
    >
      {/* spooky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0002] via-[#1a0007] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,80,0,0.15),transparent_70%)]" />
      <div className="absolute inset-0 backdrop-blur-[2px]" />
{/* FOG / MIST LAYER */}
<div className="absolute inset-0 overflow-hidden z-0 opacity-60">
  {[...Array(3)].map((_, i) => (
    <motion.div
      key={`fog-${i}`}
      className="absolute w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(180,100,50,0.08)_0%,transparent_70%)] blur-3xl"
      initial={{ x: i % 2 === 0 ? "-50%" : "50%", y: i * 100 - 50 }}
      animate={{
        x: i % 2 === 0 ? ["-50%", "50%"] : ["50%", "-50%"],
        y: [i * 100 - 50, i * 100 - 70, i * 100 - 50],
      }}
      transition={{
        duration: 60 + i * 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ))}
</div>

      {/* Spider webs in corners */}
      <div className="absolute top-0 left-0 opacity-20">
        🕸️
      </div>
      <div className="absolute top-0 right-0 opacity-20 rotate-90">
        🕸️
      </div>
      <div className="absolute bottom-0 left-0 opacity-20 -rotate-90">
        🕸️
      </div>
      <div className="absolute bottom-0 right-0 opacity-20 rotate-180">
        🕸️
      </div>

      <AnimatePresence mode="wait">
        {/* INTRO */}
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-20"
          >
            <motion.h1
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="text-5xl mb-6 text-orange-600 drop-shadow-[0_0_10px_#ff5500]"
            >
              💀 Do you dare to enter? 💀
            </motion.h1>
            <div className="space-x-6">
              <button
                onClick={() => setStage("loading")}
                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-900 text-lg rounded-3xl shadow-[0_0_20px_#ff5500] hover:shadow-[0_0_35px_#ff5500] hover:scale-105 transition-all"
              >
                Yes... Enter the darkness
              </button>
              {noCount < 4 && (
                <button
                  onClick={() => {
                    setStage("no");
                    setNoCount((c) => c + 1);
                  }}
                  className="px-8 py-3 bg-gradient-to-r from-red-800 to-red-900 text-lg rounded-3xl shadow-[0_0_15px_#ff0044] hover:shadow-[0_0_30px_#ff0044] hover:scale-105 transition-all"
                >
                  No 😱
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* MULTI NO RESPONSES */}
        {stage === "no" && (
          <motion.div
            key="no"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-20"
          >
            <h2 className="text-3xl mb-4 text-pink-400 drop-shadow-[0_0_8px_#ff80b5]">
              {currentNoMessage}
            </h2>
            <div className="space-x-4">
              <button
                onClick={() => setStage("loading")}
                className="px-6 py-3 bg-gradient-to-r from-green-700 to-green-900 rounded-3xl text-lg shadow-[0_0_20px_#00ff88] hover:shadow-[0_0_30px_#00ff88] transition-all"
              >
                Okay fine 💕
              </button>
              {noCount < 4 && (
                <button
                  onClick={() => setNoCount((c) => c + 1)}
                  className="px-6 py-3 bg-gradient-to-r from-red-800 to-red-900 rounded-3xl text-lg shadow-[0_0_20px_#ff0044] hover:shadow-[0_0_30px_#ff0044] transition-all"
                >
                  Still No 😈
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* LOADING */}
        {stage === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-20"
          >
            <motion.h2
              animate={{ opacity: [0, 1, 0, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-4xl text-orange-400 drop-shadow-[0_0_15px_#ff6600]"
            >
              Welcome, my darling... 🕯️
            </motion.h2>
          </motion.div>
        )}

        {/* POSTER */}
        {stage === "poster" && (
          <motion.div
            key="poster"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center z-20 max-w-xl mx-auto px-6 bg-black/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(255,100,0,0.2)] border border-orange-800"
          >
            <h1 className="text-5xl mb-8 text-orange-500 font-bold drop-shadow-[0_0_25px_#ff5500]">
              🕸️ The Ultimate Halloween Hangout 🕸️
            </h1>
            <div className="space-y-4 text-lg text-gray-200">
              <p>
                <span className="text-orange-400 font-semibold">A special invite for</span> Dandounte my wife
              </p>
              <p>
                <span className="text-orange-400 font-semibold">When?</span> Friday, 31st of October
              </p>
              <p>
                <span className="text-orange-400 font-semibold">What time?</span> 9:00 PM
              </p>
              <p>
                <span className="text-orange-400 font-semibold">Where?</span> Discord
              </p>
            </div>
            <motion.button
              onClick={() => setStage("schedule")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-3 bg-gradient-to-r from-orange-700 to-red-800 rounded-3xl text-lg font-semibold shadow-[0_0_30px_#ff5500] hover:shadow-[0_0_40px_#ff3300] transition-all"
            >
              See Schedule 🕷️
            </motion.button>
          </motion.div>
        )}

        {/* SCHEDULE */}
        {stage === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-xl mx-auto px-6 z-20 bg-black/50 rounded-3xl p-8 border border-orange-900 shadow-[0_0_40px_rgba(255,80,0,0.2)]"
          >
            <h1 className="text-5xl mb-6 text-orange-500 font-bold drop-shadow-[0_0_20px_#ff5500]">
              🎃 Halloween Schedule 🎃
            </h1>
            <p className="mb-4 text-lg text-gray-300 italic">
              A spooky night filled with laughter, scares, and a little love ❤️
            </p>
            <div className="bg-gray-900 bg-opacity-70 p-6 rounded-2xl shadow-lg text-left space-y-3 border border-orange-800">
              <h2 className="text-2xl text-orange-400 mb-2">👻 Schedule</h2>
              <ul className="space-y-2 text-gray-200">
                <li>🕖 9:00 PM — Join the call (costumes encouraged!)</li>
                <li>🕸️ 9:15 PM — Watch a  movie together</li>
                <li>🍫 10:30 PM — Halloween snack break (They will arrive to your doorstep my love) </li>
                <li>💀 11:00 PM — Fun activity together</li>
                <li>🌙 11:45 PM — Chill & talk under the (virtual) moon</li>
              </ul>
            </div>
            <motion.button
              onClick={() => setStage("poster")}
              whileHover={{ scale: 1.1 }}
              className="mt-8 px-6 py-2 text-sm text-gray-400 underline hover:text-orange-400 transition"
            >
              ← Back
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating candles */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`candle-${i}`}
            className="absolute w-2 h-6 bg-yellow-300 rounded-full opacity-70"
            initial={{ y: "100vh", x: `${i * 20}%`, scale: 0.8 }}
            animate={{ y: ["100vh", "-10vh"], opacity: [0.7, 0.3, 0.7] }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 1.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Bats flying */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={`bat-${i}`}
            className="absolute text-gray-400 text-5xl opacity-70"
            initial={{ x: "-10vw", y: `${20 + i * 20}vh`, rotate: 0 }}
            animate={{
              x: ["-10vw", "110vw"],
              y: [`${20 + i * 20}vh`, `${25 + i * 20}vh`],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            🦇
          </motion.div>
        ))}
      </div>

      {/* Falling leaves — fixed hydration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {leaves.map((leaf, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-orange-600 text-2xl"
            initial={{
              x: `${leaf.x}vw`,
              y: "-10vh",
              rotate: 0,
            }}
            animate={{
              y: "110vh",
              rotate: [0, 360],
              opacity: [1, 0.8, 1],
            }}
            transition={{
              duration: leaf.dur,
              repeat: Infinity,
              delay: leaf.delay,
              ease: "easeInOut",
            }}
          >
            🍁
          </motion.div>
        ))}
      </div>
    </main>
  );
}
