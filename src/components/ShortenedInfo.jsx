import React from 'react';

const ShortenedInfo = ({ originalUrl, shortenedUrl }) => {
  return (
    <div className='bg-white rounded-md mt-4 pb-4 flex flex-col px-4'>
        <img src="./images/xmark-solid.svg" alt="" className='w-4 py-2' />
      <p className='py-2 flex text-ellipsis'>{originalUrl}</p>
      <hr className='border border-slate-300'/>
      <p className='py-2 text-cyan shortened-url'>{shortenedUrl}</p>
      <button className="bg-cyan rounded-md w-full p-3 text-white flex justify-self-center justify-center mx-auto text-center ">Copy</button>
    </div>
  );
};

export default ShortenedInfo;
