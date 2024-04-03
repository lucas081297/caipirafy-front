import React from 'react';
import logo from '../assets/logo.png'

const Header = () => {
    return (
        <section className='bg-[#FFBE98] h-[80px] absolute w-screen'>
            <div className='h-full flex justify-center items-center'><img className='h-[80%]' src={logo} alt='logo'></img></div>
        </section>
    );
}

export default Header;
