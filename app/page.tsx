"use client"
import { useState, useEffect } from 'react';
import { Progress } from 'antd';

export default function Home() {
  const [dayCount, setDayCount] = useState(1);
  const [daysLeft, setDaysLeft] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(1);

  useEffect(() => {
    // Set the start date to 11th October 2023
    const startDate = new Date(2023, 9, 11); // Note: Month is 0-based, so 9 is October
    const endDate = new Date(2023, 9, 25); // Note: Month is 0-based, so 9 is October
    const currentDate = new Date();

    // Calculate the difference in days
    const differenceInTime = currentDate - startDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

    // Calculate the total duration and days left
    const totalDuration = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
    const remainingDays = totalDuration - differenceInDays;

    // Calculate the progress percentage
    const percentagePassed = ((totalDuration - remainingDays) / totalDuration) * 100;
    setProgressPercentage(percentagePassed);

    setDayCount(differenceInDays + 1); // +1 because the start date is Day 1
    setDaysLeft(remainingDays); // Update the days left state
  }, []);

  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-[-1]">
          <video 
              src="clip.mp4" 
              autoPlay 
              loop 
              muted  
              className="absolute min-w-full min-h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover grayscale blur-sm opacity-50"
          ></video>
      </div> 

      {dayCount <= 14 ? (
        <div className='bg-black w-[500px] h-[200px] p-5 rounded-2xl shadow-2xl flex flex-col justify-center items-center gap-2'>
          <h1 className='text-6xl font-medium'>Day {dayCount}</h1>
          <h1 className='text-xl font-medium'>{daysLeft} days left of no gayming</h1>
          <Progress percent={progressPercentage} showInfo={false}/>
        </div>
      ) : (
        <h2 className='text-4xl font-medium'>Congratulations!</h2>
      )}
    </div>
  );
}
