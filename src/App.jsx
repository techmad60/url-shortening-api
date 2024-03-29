import React, { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import ShortenUrl from './components/ShortenUrl';
import ShortenedInfo from './components/ShortenedInfo';
import axios from "axios";

function App() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isShortened, setIsShortened] = useState(false);
  const [isDivVisible, setDivVisible] = useState(true);
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const [shortenedLinks, setShortenedLinks] = useState([
    { originalUrl: '', shortenedUrl: '', isVisible: true },
  ]);

  // ...

  useEffect(() => {
    const storedIsDivVisible = localStorage.getItem('isDivVisible');
    const storedIsShortened = localStorage.getItem('isShortened');
    const storedOriginalUrl = localStorage.getItem('originalUrl');
    const storedShortenedUrl = localStorage.getItem('shortenedUrl');
    const storedShortenedLinks = JSON.parse(localStorage.getItem('shortenedLinks')) || [];

    console.log('Stored data from local storage:', storedIsDivVisible, storedIsShortened, storedOriginalUrl, storedShortenedUrl, storedShortenedLinks);

    setDivVisible(storedIsDivVisible === null ? true : storedIsDivVisible === 'false' ? false : true);
    setIsShortened(storedIsShortened === 'true');
    setOriginalUrl(storedOriginalUrl || '');
    setShortenedUrl(storedShortenedUrl || '');
    setShortenedLinks(storedShortenedLinks);
  }, []);

  const saveToLocalStorage = (links) => {
    const updatedLinks = links || shortenedLinks;  // Use the passed links or the current state
    localStorage.setItem('isDivVisible', isDivVisible.toString());
    localStorage.setItem('isShortened', isShortened.toString());
    localStorage.setItem('originalUrl', originalUrl);
    localStorage.setItem('shortenedUrl', shortenedUrl);
    localStorage.setItem('shortenedLinks', JSON.stringify(updatedLinks));

    console.log('Saved data to local storage:', isDivVisible, isShortened, originalUrl, shortenedUrl, updatedLinks);
  };

  const handleInputChange = (e) => {
    setOriginalUrl(e.target.value);
  };

  const handleDeleteClick = (index) => {
    setShortenedLinks((prevLinks) => {
      const updatedLinks = prevLinks.filter((link, i) => i !== index);
      saveToLocalStorage(updatedLinks); // Make sure to call saveToLocalStorage
      return updatedLinks;
    });
  };


  const toggleNavbar = () => {
    setIsNavbarOpen((prevIsNavbarOpen) => !prevIsNavbarOpen);
  };

  const handleShortenUrl = async () => {
    try {
      const response = await axios.post(
        'https://url-shortener23.p.rapidapi.com/shorten',
        { url: originalUrl },
        { headers: { 'content-type': 'application/json', 'X-RapidAPI-Key': '214317bfbemsh07407bb72ed8ccfp103ee4jsn9f28f2238dca', 'X-RapidAPI-Host': 'url-shortener23.p.rapidapi.com' } }
      );

      const shortenedUrl = response.data.short_url;

      if (typeof shortenedUrl === 'string') {
        const newLink = { originalUrl, shortenedUrl, isVisible: true };
        setShortenedLinks((prevLinks) => [...prevLinks, newLink]);
        setShortenedUrl(shortenedUrl);
        setError('');
        saveToLocalStorage();  // Move this line inside the if block
        setIsShortened(true);
        setDivVisible(true);

        console.log('Successfully shortened URL. Data after update:', shortenedUrl, shortenedLinks);
      } else {
        setError('Invalid response format. Expected a string for the shortened URL.');
      }
      saveToLocalStorage();
    } catch (error) {
      console.error('Error shortening URL:', error);

      if (error.response) {
        console.log('API Response Error:', error.response.data);
        setError(error.response.data.message);
      } else {
        setError('An error occurred while processing your request.');
      }
      saveToLocalStorage();
    }
  };

  // ...

  useEffect(() => {
    return () => {
      localStorage.removeItem('isDivVisible');
      console.log('Cleaned up. Removed isDivVisible from local storage.');
    };
  }, []);


  

  return (
    <div className="font-poppins overflow-clip" >
      <header className="p-5 ">
        <div className="flex items-center justify-between">
          <img src="./images/logo.svg" alt="" />
          <button className={`hamburger ${isNavbarOpen ? 'rotate' : ''}`} onClick={toggleNavbar}>
            <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 448 512"><path fill="#a0aec0" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
            </svg>
          </button>
          
        </div>
        <Navbar isOpen={isNavbarOpen}/>
      </header>

      <main className="text-center">
        <div className=" pl-5 -mr-36 mt-2 mb-10">
          <img src="./images/illustration-working.svg" alt=""/>
        </div>
        
        <section className="px-5">
          <h1 className="text-4xl font-extrabold text-very-dark-violet mt-5">More than just shorter links</h1>
          <p className="p-4">Build your brand's recognition and get detailed insights on how your links are performing. </p>

          <button className="bg-cyan w-44 py-3 text-white rounded-3xl my-3">Get Started
          </button>
          
          <ShortenUrl originalUrl={originalUrl} handleInputChange ={handleInputChange} handleShortenUrl={handleShortenUrl}/>
        </section>

        <section className="bg-slate-200">
        {shortenedLinks.map((link, index) => (
          <div key={index} className={`pt-24 mx-5 text-start ${link.isVisible ? 'show' : 'hide'}`}>
            <ShortenedInfo
              originalUrl={link.originalUrl}
              shortenedUrl={link.shortenedUrl}
              handleDeleteClick={() => handleDeleteClick(index)}
              isDivVisible={link.isVisible}
            />
          </div>
        ))}
          <h2 className="text-2xl pt-36 font-extrabold ">Advanced Statistics</h2>
          <p className="p-5">Track how your links are performing across the web with our advanced statistics dashboard.</p>

          <article className="bg-white mx-5 mt-16 rounded-md article-vertical" >
            <div className=" rounded-full flex justify-center w-fit mx-auto bg-dark-violet relative bottom-10">
              <img src="./images/icon-brand-recognition.svg" alt="" className="p-5 "/>
            </div>
            
            <h3 className="text-xl font-extrabold">Brand Recognition</h3>
            <p className="p-6"> Boost your brand recognition with each click. Generic links don’t 
            mean a thing. Branded links help instil confidence in your content.</p>
          </article>

          <article className="bg-white mx-5 mt-20 rounded-md article-vertical" >
            <div className=" rounded-full flex justify-center w-fit mx-auto bg-dark-violet relative bottom-10">
              <img src="./images/icon-detailed-records.svg" alt="" className="p-5 "/>
            </div>
            
            <h3 className="text-xl font-extrabold"> Detailed Records</h3>
            <p className="p-6">  Gain insights into who is clicking your links. Knowing when and where 
            people engage with your content helps inform better decisions.</p>
          </article>

          <article className="bg-white mx-5 my-20 rounded-md" >
            <div className=" rounded-full flex justify-center w-fit mx-auto bg-dark-violet relative bottom-10">
              <img src="./images/icon-fully-customizable.svg" alt="" className="p-5 "/>
            </div>
            
            <h3 className="text-xl font-extrabold"> Fully Customizable</h3>
            <p className="p-6">           Improve brand awareness and content discoverability   through customizable 
            links, supercharging audience engagement.
            </p>
          </article>

          <div className="text-center bg-boost-mobile bg-no-repeat bg-dark-violet flex flex-col justify-center items-center py-20">
            <p className="text-2xl font-extrabold text-white">Boost your links today</p>
            <button className="bg-cyan w-44 py-3 text-white rounded-3xl my-3 ">Get Started
            </button>
          </div>
        </section>
      </main>

      <footer className="text-center flex flex-col justify-center items-center bg-very-dark-blue text-white py-10 ">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="121" height="33"><path fill="#ffff" d="M16.715 7.932c-.068-.09-.306-.26-.714-.51s-.918-.51-1.53-.782-1.281-.51-2.006-.714a8.005 8.005 0 00-2.176-.306c-1.995 0-2.992.669-2.992 2.006 0 .408.107.748.323 1.02.215.272.532.516.952.731.419.215.946.414 1.58.595l1.406.393.805.219c1.156.317 2.198.663 3.128 1.037.929.374 1.717.839 2.363 1.394a5.647 5.647 0 011.496 2.023c.35.793.527 1.745.527 2.856 0 1.36-.255 2.51-.765 3.451-.51.94-1.185 1.7-2.023 2.278-.84.578-1.802.997-2.89 1.258-1.088.26-2.21.391-3.366.391a19.68 19.68 0 01-5.44-.799c-.884-.26-1.74-.572-2.567-.935A14.358 14.358 0 01.53 22.28l2.448-4.862c.09.113.385.329.884.646.498.317 1.116.635 1.853.952.736.317 1.558.6 2.465.85.906.25 1.824.374 2.754.374 1.972 0 2.958-.6 2.958-1.802 0-.453-.148-.827-.442-1.122-.295-.295-.703-.561-1.224-.799a12.455 12.455 0 00-1.504-.56l-1.702-.495-.976-.288c-1.111-.34-2.074-.708-2.89-1.105-.816-.397-1.49-.856-2.023-1.377a5.003 5.003 0 01-1.19-1.802c-.261-.68-.391-1.473-.391-2.38 0-1.27.238-2.391.714-3.366a7.266 7.266 0 011.938-2.465 8.435 8.435 0 012.839-1.513c1.076-.34 2.215-.51 3.417-.51.838 0 1.666.08 2.482.238.816.159 1.598.363 2.346.612.748.25 1.445.533 2.09.85.647.317 1.242.635 1.786.952l-2.448 4.624zM40.139 25h-5.44V14.97c0-1.156-.227-2.006-.68-2.55-.454-.544-1.077-.816-1.87-.816-.318 0-.663.074-1.037.221a4.173 4.173 0 00-1.088.646 5.827 5.827 0 00-.97 1.003 4.4 4.4 0 00-.68 1.292V25h-5.44V.18h5.44v9.962a6.786 6.786 0 012.602-2.465c1.076-.578 2.26-.867 3.553-.867 1.201 0 2.17.21 2.907.629.736.42 1.303.952 1.7 1.598.396.646.663 1.371.799 2.176.136.805.204 1.592.204 2.363V25zm12.34.34c-1.519 0-2.873-.25-4.063-.748-1.19-.499-2.193-1.173-3.01-2.023a8.54 8.54 0 01-1.852-2.958 9.97 9.97 0 01-.63-3.519c0-1.224.21-2.397.63-3.519a8.54 8.54 0 011.853-2.958c.816-.85 1.819-1.53 3.009-2.04s2.544-.765 4.063-.765c1.519 0 2.867.255 4.046.765 1.179.51 2.176 1.19 2.992 2.04a8.754 8.754 0 011.87 2.958 9.736 9.736 0 01.646 3.519 9.97 9.97 0 01-.63 3.519 8.54 8.54 0 01-1.852 2.958c-.816.85-1.82 1.524-3.01 2.023-1.19.499-2.543.748-4.062.748zM48.5 16.092c0 1.405.374 2.533 1.122 3.383.748.85 1.7 1.275 2.856 1.275a3.59 3.59 0 001.564-.34c.476-.227.89-.544 1.24-.952a4.57 4.57 0 00.834-1.479 5.632 5.632 0 00.306-1.887c0-1.405-.374-2.533-1.122-3.383-.748-.85-1.689-1.275-2.822-1.275a3.702 3.702 0 00-2.84 1.292 4.57 4.57 0 00-.832 1.479 5.632 5.632 0 00-.306 1.887zm27.776-4.284c-1.315.023-2.505.238-3.57.646-1.065.408-1.836 1.02-2.312 1.836V25h-5.44V7.15h4.998v3.604c.612-1.201 1.4-2.142 2.363-2.822.963-.68 1.989-1.031 3.077-1.054h.544c.113 0 .227.011.34.034v4.896zm14.074 12.24a21.71 21.71 0 01-2.567.884c-.963.272-1.932.408-2.907.408-.68 0-1.32-.085-1.92-.255a4.286 4.286 0 01-1.582-.816c-.453-.374-.81-.867-1.07-1.479-.262-.612-.392-1.349-.392-2.21v-9.316h-2.278V7.15h2.278V1.472h5.44V7.15h3.638v4.114h-3.638v7.446c0 .59.147 1.014.442 1.275.295.26.669.391 1.122.391.408 0 .827-.068 1.258-.204.43-.136.805-.283 1.122-.442l1.054 4.318zM92.627.18h5.44v18.462c0 1.36.578 2.04 1.734 2.04.272 0 .572-.04.901-.119.329-.08.63-.198.901-.357l.714 4.08c-.68.317-1.462.567-2.346.748-.884.181-1.711.272-2.482.272-1.564 0-2.765-.408-3.604-1.224-.839-.816-1.258-1.995-1.258-3.536V.18zm11.456 27.506c.454.159.879.272 1.275.34a6.4 6.4 0 001.071.102c.658 0 1.168-.227 1.53-.68.363-.453.692-1.27.986-2.448l-6.8-17.85h5.61l4.148 13.192 3.57-13.192h5.1l-6.8 20.74a7.106 7.106 0 01-2.55 3.587c-1.224.918-2.674 1.377-4.352 1.377a8.17 8.17 0 01-1.377-.119 7.516 7.516 0 01-1.41-.391v-4.658z"/></svg>
        </div>

        <section className="py-4">
          <h2 className="font-bold py-6">Features</h2>
          <ul className="text-sm leading-8">
            <li>Link Shortening</li>
            <li>Branded Links</li>
            <li>Analytics</li>
          </ul>
        </section>
        
        <section className="py-4">
          <h2 className="font-bold py-6"> Resources</h2>
          <ul className="text-sm leading-8">
            <li> Blog</li>
            <li>Developers</li>
            <li> Support</li>
          </ul>

        </section>
        <section className="py-4">
          <h2 className="font-bold py-6"> Company</h2>
          <ul className="text-sm leading-8">
            <li> About</li>
            <li>Our Team</li>
            <li> Careers</li>
            <li>Contact</li>
          </ul>
        </section>

        <nav className="py-6">
          <ul className="flex space-x-6 justify-center items-center">
            <li><img src="./images/icon-facebook.svg" alt="" /></li>
            <li><img src="./images/icon-twitter.svg" alt="" /></li>
            <li><img src="./images/icon-pinterest.svg" alt="" /></li>
            <li><img src="./images/icon-instagram.svg" alt="" /></li>
          </ul>
        </nav>
      </footer>
    </div>
  )
}

export default App
