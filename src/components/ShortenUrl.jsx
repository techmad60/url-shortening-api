import React from 'react'


const ShortenUrl = ({originalUrl, handleInputChange, handleShortenUrl}) => {
  return (
    <div className="flex flex-col bg-shorten-mobile bg-no-repeat bg-dark-violet b bg-right-top justify-center items-center px-2 py-6 rounded-lg relative top-24">
        <input type="text" placeholder="Shorten a link here..." className="text-sm rounded-md w-72 mb-2 p-3 " value={originalUrl} onChange={handleInputChange}/>
        <span className='justify-self-start self-start italic text-red px-3 text-xs hidden '>Please add a link</span>
        <button className="bg-cyan rounded-md w-72 p-3 text-white mt-3" onClick={handleShortenUrl}>Shorten it!</button>
    </div>
  )
};

export default ShortenUrl;