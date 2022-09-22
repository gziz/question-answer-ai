import { useEffect } from "react";


const NavBar = (props) => { 

    const updateContextType = (contextType) => {
        props.navChange();

        if (contextType === "text"){
            props.setContextType("question-text");
        }else if (contextType === "url"){
            props.setContextType("question-url");
        } else{
            props.setContextType("question-file");
        }


      };

    return (                
            <div className="top-0 w-screen h-14
                            flex flex-row space-x-10
                            bg-slate-800 p-6
                            justify-start">

                <span className="self-center text-xl font-semibold text-white">Q&A</span>
                <button onClick={() => updateContextType("text")} className="self-center text-gray-300 hover:text-white">Context As Text</button>
                <button onClick={() => updateContextType("url")} className="self-center text-gray-300 hover:text-white">Context As Url</button>
                <button onClick={() => updateContextType("file")} className="self-center text-gray-300 hover:text-white">Context As File</button>
            </div>

    )
}

export default NavBar;