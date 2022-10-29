import { useEffect } from "react";
import {Link} from "react-router-dom"

export default function Navbar() {
    return (
        <div className="top-0 w-screen h-14
                        flex flex-row space-x-10
                        bg-slate-800 p-6
                        justify-start">


            <Link to="/" className="text-xl self-center font-semibold text-white"> 
                Q&A
            </Link>
            <Link to="/" className="text-xl self-center text-gray-300 hover:text-white">
                Text
            </Link>
            <Link to="/file" className="text-xl self-center text-gray-300 hover:text-white">
                File
            </Link>

        </div>
    );
  }