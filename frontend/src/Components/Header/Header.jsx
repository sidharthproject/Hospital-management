import React, { useEffect, useRef } from 'react';
import logo from '../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { BiMenu } from "react-icons/bi";
import { useSelector } from "react-redux";
const navlinks = [
    {
        path: '/',
        display: 'Home'
    },
    {
        path: '/doctors',
        display: 'Find a Doctor'
    },
    {
        path: '/services',
        display: 'Services'
    },
    {
        path: '/contact',
        display: 'Contact'
    },
];
function Header() {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    console.log(token,user);
    const role = useSelector(state => state.auth.role);


    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const handleStickyHeader = () => {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                headerRef.current.classList.add('sticky_header');
            } else {
                headerRef.current.classList.remove('sticky_header');
            }
        });
    };

    useEffect(() => {
        handleStickyHeader();
        return () => window.removeEventListener('scroll', handleStickyHeader);
    }, []);

    const toggleMenu = () => menuRef.current?.classList.toggle('show_menu');

    return (
        <header className='header flex items-center' ref={headerRef}>
            <div className='container'>
                <div className='flex items-center justify-between'>
                    <div>
                        <img src={logo} alt="" />
                    </div>
                    <div className='navigation' ref={menuRef} onClick={toggleMenu}>
                        <ul className='menu flex items-center gap-[2.7rem]'>
                            {navlinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink to={link.path} className='text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor'>{link.display}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-4'>
                        {user && token ? (
                            <div className='flex items-center'>
                                <Link className='flex items-center gap-5' to={role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}>
                                    <figure className='w-[35px] h-[35px] rounded-full'>
                                        <img src={user?.photo} className='w-full h-10 rounded-full' alt="" />
                                    </figure>
                                    <h2>{user?.name}</h2>
                                </Link>
                            </div>
                        ) : (
                            <Link to='/login'>
                                <button className='bg-primaryColor py-1 px-6 text-white font-[600] h-[38px] flex items-center justify-center rounded-[50px] '>Login</button>
                            </Link>
                        )}
                        <span className='md:hidden' onClick={toggleMenu}>
                            <BiMenu className='w-6 h-6 cursor-pointer' />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;