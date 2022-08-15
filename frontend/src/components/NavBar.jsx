import { useEffect } from "react";


const NavBar = (props) => { 

    const updateContextType = (contextType) => {
        props.navChange();

        if (contextType === "text"){
            props.setContextType("question-text");
        }else{
            props.setContextType("question-url");
        }


      };

    return (                
            <div className="fixed top-0 w-screen h-14
                            flex flex-row space-x-10
                            dark:bg-slate-800 p-6
                            justify-start">

                <span className="self-center text-xl font-semibold dark:text-white">Q&A</span>
                <a onClick={() => updateContextType("text")} href="#" className="self-center text-gray-300 hover:text-white">Context As Text</a>
                <a onClick={() => updateContextType("url")} href="#" className="self-center text-gray-300 hover:text-white">Context As Url</a>
            </div>

    )
}

export default NavBar;