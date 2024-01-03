import React from 'react';

const Navbar = ({ isOpen }) => {
  return (
    <div className={`hide ${isOpen ? 'show' : ''} relative top-8`}>
      <nav className="bg-dark-violet text-center text-white flex flex-col justify-center items-center absolute p-4 rounded-lg w-full">
        <ul className="leading-[3rem] w-full py-4 border-b border-slate-600">
          <li>Features</li>
          <li>Pricing</li>
          <li>Resources</li>
        </ul>

        <ul className="w-full flex flex-col justify-center items-center py-4 leading-[3rem]">
          <li>Login</li>
          <li className="bg-cyan w-72 text-white rounded-3xl my-2">
            <button>Sign Up</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
