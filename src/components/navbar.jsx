import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <header className="border-b border-slate-100 bg-white/80 backdrop-blur-lg">
            <nav className="mx-auto flex max-w-6xl gap-8 px-6 transition-all duration-200 ease-in-out lg:px-12 py-0.1"> 
                <div className="flex items-center">
                    <Link to="/">
                        <img src="public/icon.jpg" loading="lazy" className="h-10 mb-2" alt="Logo" />
                    </Link>
                </div>
                
                <div className="flex-grow"></div>

                 

                <div className="hidden md:flex md:space-x-10 list-none">
                    <li>
                        <Link to="/ChatBot" className="text-base font-normal text-gray-500 list-none hover:text-gray-900">
                            Text-to-SQL Converter
                        </Link>
                    </li>
                    <li>
                        <Link to="/playground" className="text-base font-normal text-gray-500 list-none hover:text-gray-900">
                            SQL Optimizer
                        </Link>
                    </li>
                </div>
                
            </nav>
        </header>
    );
}

export default Navbar;
