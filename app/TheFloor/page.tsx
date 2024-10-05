"use client";

import { Box, Typography } from '@mui/material';
import React, { useState, useEffect, useCallback, useRef, use } from "react";
const COLORS = {
  DOUBLE: "#FFD700",
  DEFAULT: "#F5EFE8",
  SELECTED: "#bab3df",
  TEAM1: "#17ba17",
  TEAM2: "#db1616",
  STROKE: "#000000",
};
const GRADIENT = {
  DOUBLE: "#FFD700",
  DEFAULT: "#F5EFE8",
  SELECTED: "linear-gradient(315deg, #bab3ff 0%, #bab3df 74%)",
  TEAM1: "linear-gradient(315deg, #378b29 0%, #74d680 74%)",
  TEAM2: "linear-gradient(315deg, #ff0000 0%, #ff7878 74%)",
  STROKE: "#000000",
};
export default function QuizLayout() {
  const [Teampoint1, setTeampoint1] = useState(0);

  const [Teampoint2, setTeampoint2] = useState(0);

  const [isRunning, setIsRunning] = useState(false);

  const [isRunning2, setIsRunning2] = useState(false);

  const [time, setTime] = useState<number>(60);

  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const [time2, setTime2] = useState<number>(60);

  const [intervalId2, setIntervalId2] = useState<NodeJS.Timeout | null>(null);

  const handleSKeyPress = (event: KeyboardEvent) => {
    if (event.code === "KeyA") {
      
      event.preventDefault(); // Prevent default behavior of "S" key
      if (isRunning) {
        // Pause the timer
        
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(null);
          setTeampoint1(Teampoint1+1);
        }
        const newIntervalId2 = setInterval(() => {
          
          setTime2(prevTime2  => {
            if (prevTime2  > 0) {
              return prevTime2  - 1; // Decrease time
            } else {
              clearInterval(newIntervalId2); // Stop the timer when it reaches 0
              return 0;
            }
          });
        }, 1000);

        setIntervalId2(newIntervalId2);

        setIsRunning2(true);

        setIsRunning(false);
        console.log("Timer paused");
      } else {
        if (intervalId2) {
          clearInterval(intervalId2);
          setIntervalId(null);
          setIsRunning2(false);
          setTeampoint2(Teampoint2+1);
        }
        // Start the timer
        const newIntervalId = setInterval(() => {
          setTime(prevTime  => {
            if (prevTime  > 0) {
              return prevTime  - 1; // Decrease time
            } else {
              clearInterval(newIntervalId); // Stop the timer when it reaches 0
              return 0;
            }
          });
        }, 1000);
        setIntervalId(newIntervalId);
        setIsRunning(true);
       
        console.log("Timer started");
      }
      console.log("S key was pressed and default behavior prevented!");
    }
    else if(event.code === "KeyP"){
      if (intervalId2) {
        clearInterval(intervalId2);
        setIntervalId(null);
      }
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
    else if(event.code === "KeyS"){
      if(isRunning){
        setTime(prevTime => Math.max(prevTime - 5, 0)); 
      }
      if(isRunning2){
        setTime2(prevTime => Math.max(prevTime - 5, 0)); 
      }
      
    }
  };

  // UseEffect to add and remove the event listener
  useEffect(() => {
    const addListener = () => window.addEventListener("keydown", handleSKeyPress);

    const removeListener = () => window.removeEventListener("keydown", handleSKeyPress);

    // Add the listener on component mount
    addListener();

    // Clean up the listener on component unmount
    return () => removeListener();
  }, [isRunning, intervalId]);



  
  function Timer(time: string) {
    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <div className="flex flex-col gap-5 items-center justify-center border-2 border-[#d63939] border-double text-4xl rounded-full p-6">
                <h1 className="text-5xl font-bold text-black">{time}</h1>
            </div>
        </div>
    );
}
  return (
    <div className='main-container w-[1920px] h-[1080px] bg-[rgba(0,0,0,0)] relative mx-auto my-0'>
      <div className='w-[1920px] h-[1080px] text-[0px] bg-[rgba(0,0,0,0)] relative z-[13] mr-0 mb-0 ml-[227px]'>
        <span className="block h-[49px] font-['Inter'] text-[35.900001525878906px] font-semibold leading-[43.447px] text-[#373737] relative text-left whitespace-nowrap z-[14] mt-[42px] mr-0 mb-0 ml-[587px]">
          تصنيف المرحلة
        </span>
        <div className='w-[1433px] h-[686px] relative z-20 mt-[53px] mr-0 mb-0 ml-[21px]'>
          <div className='w-[139px] h-[143px] bg-[rgba(0,0,0,0)] absolute bottom-[543px] right-[1294px] z-[15]'>
            {/* <div className='w-[133px] h-[134px] text-[0px] bg-[url(/be7b971b4da67dac639097bc3a1675d9c3e415d0.png)] bg-cover bg-no-repeat relative z-[16] mt-[5px] mr-0 mb-0 ml-[3px]'>
              <span className="block h-[41px] font-['Inter'] text-[31.799999237060547px] font-semibold leading-[38.485px] text-[#474747] relative text-left whitespace-nowrap z-[18] mt-[12px] mr-0 mb-0 ml-[35px]">
                شعار
              </span> */}
              {/* <div className='w-[77px] h-[43px] bg-[url(/7f9369823f65f28b66321221277ea0b02b05bd3c.png)] bg-cover bg-no-repeat relative z-[17] mt-[17px] mr-0 mb-0 ml-[28px]' /> */}
            {/* </div> */}
          </div>
          <div className='w-[466px] h-[104px] bg-[rgba(0,0,0,0)] absolute bottom-[102px] right-[474px] z-[9]'>
              <div className='w-[444px] h-[88px] bg-[url(/51851dce05003b8cdf605b1f461916c467414a17.png)] bg-cover bg-no-repeat relative z-10 mt-[8px] mr-0 mb-0 ml-[12px]'>
                <span className="flex h-[54px] justify-start items-center font-['Inter'] text-[40.400001525878906px] font-semibold leading-[48.893px] text-[#4f4f4f] absolute bottom-[24px] right-[170px] text-left whitespace-nowrap z-[11]">
                  الجواب
                </span>
              </div>
            </div>
          <div className='w-[1036px] h-[547px] bg-[url(/8127845a8f63df38611f4df9448f030819c84924.png)] bg-cover bg-no-repeat absolute bottom-[139px] right-[202px] z-[8]'>
            <div className='w-[368px] h-[162px] bg-[url(/a35053a882e9c73fd1c2c4d921a1cd0715f0a55d.png)] bg-cover bg-no-repeat relative z-[12] mt-[168px] mr-0 mb-0 ml-[333px]' />
          </div>
          <div className='w-[1252px] h-[681px] bg-[rgba(0,0,0,0)] absolute top-[5px] left-1/2 translate-x-[-42.77%] translate-y-0 z-[1]'>
            <div className='w-[134px] h-[532px] absolute bottom-[148px] right-[36px] z-[5]'>
              <button className='w-[134px] h-[134px] bg-cover bg-no-repeat border-none relative z-[5] pointer mt-0 mr-0 mb-0 ml-0'>
                <div className='w-[68px] h-[36px] bg-[url(/6e636d6d22f0d10b223b6c8216c76e733c49a735.png)] bg-cover bg-no-repeat relative z-[7] mt-[15px] mr-0 mb-0 ml-[36px]' />
                <div className='w-[78px] h-[43px] bg-[url(/f79378599a61d35824b9757bf35acb4d03163448.png)] bg-cover bg-no-repeat relative z-[6] mt-[19px] mr-0 mb-0 ml-[28px]' />
              </button>
              <Box
      sx={{
        border: '1px solid #ccc', // Light border
        borderRadius: '5px',      }}
    >
      <span className="block h-[42px] font-['Inter'] text-[29.899999618530273px] font-semibold leading-[36.186px] text-[#5c5c5c] relative text-left whitespace-nowrap z-[4] mt-[33px] mr-0 mb-0 ml-[22px]">
        النتيجة
      </span>
      <span className="block h-[42px] font-['Inter'] text-[29.899999618530273px] font-semibold leading-[36.186px] text-[#5c5c5c] relative text-left whitespace-nowrap z-[5] mt-[33px] mr-0 mb-0 ml-[22px]">
        {Teampoint1}
      </span>
    </Box>
              <button className='w-[134px] h-[134px] bg-cover bg-no-repeat border-none relative z-[2] pointer mt-[189px] mr-0 mb-0 ml-0'>
                <span className="flex h-[46px] justify-start items-center font-['Inter'] text-[30.399999618530273px] font-semibold leading-[36.791px] text-[#505050] absolute bottom-[47px] right-[-35px] text-left whitespace-nowrap z-[3]">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-3xl font-bold">{Timer((Math.floor((time ? time : 0) / 60) < 10 ? ('0' + Math.floor((time ? time : 0) / 60).toString()) : Math.floor((time ? time : 0) / 60).toString()) + ':' + (((time ? time : 0) % 60).toString().length == 1 ? ('0' + ((time ? time : 0) % 60).toString()) : ((time ? time : 0) % 60).toString()))}</h1>
                    
                </div>
                </span>
              </button>
            </div>
            
          </div>
          
          <Box
      sx={{
        border: '1px solid #ccc', // Light border
        borderRadius: '5px',
        padding: '10px', // Optional padding for space inside the box
        textAlign: 'left', // Ensure the content is aligned to the left
      }}
    >
      <span className="block h-[42px] font-['Inter'] text-[29.899999618530273px] font-semibold leading-[36.186px] text-[#5c5c5c] relative text-left whitespace-nowrap z-[4] mt-[33px] mr-0 mb-0 ml-[22px]">
        النتيجة
      </span>
      <span className="block h-[42px] font-['Inter'] text-[29.899999618530273px] font-semibold leading-[36.186px] text-[#5c5c5c] relative text-left whitespace-nowrap z-[5] mt-[33px] mr-0 mb-0 ml-[22px]">
        {Teampoint2}
      </span>
    </Box>
          <button className='w-[133px] h-[134px] bg-cover bg-no-repeat border-none absolute bottom-[156px] right-[1300px] z-20 pointer'>
          <span className="flex h-[46px] justify-start items-center font-['Inter'] text-[30.399999618530273px] font-semibold leading-[36.791px] text-[#505050] absolute bottom-[47px] right-[-55px] text-left whitespace-nowrap z-[3]">
                <div className="flex flex-col gap-5 items-center justify-center">
                    <h1 className="text-3xl font-bold">{Timer((Math.floor((time2 ? time2 : 0) / 60) < 10 ? ('0' + Math.floor((time2 ? time2 : 0) / 60).toString()) : Math.floor((time2 ? time2 : 0) / 60).toString()) + ':' + (((time2 ? time2 : 0) % 60).toString().length == 1 ? ('0' + ((time2 ? time2 : 0) % 60).toString()) : ((time2 ? time2 : 0) % 60).toString()))}</h1>
                    
                </div>
                </span>
          </button>
        </div>
      </div>
      <div className='w-[1920px] h-[1080px] bg-[url(/2e4c6b7f-a521-4849-9cd2-60dd6ba4d58c.png)] bg-cover bg-no-repeat absolute bottom-[-4px] right-0' />
    </div>

  );
}








