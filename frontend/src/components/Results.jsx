  const Results = (props) => {   

    let contextInput = <></>
    if (props.contextType === "question-text") {
        contextInput = (
            <>
                
                <div className="mb-6 text-slate-200">
                    <p>Give me a context (paragraph/sentence) and a question. I will try to answer ...</p>
                </div>
                <label className="">Context as Text</label>
                <textarea
                    className="h-48 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
                    type="text" readOnly
                    value={props.context}
                >
                </textarea>
            </>

        );
      } else if (props.contextType === "question-url") {
        
        contextInput = (
            <>
                <div className="mb-6 text-slate-200">
                    <p>Answers came from the following passages</p>
                </div>
                <label className="">Context as URL</label>
                <textarea
                    className="h-48 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
                    type="text" readOnly
                    value={props.context}
                >{props.context}</textarea>
            </>
        );
        } else{
            contextInput = (
                <>
                <div className="bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3">              
                    <div className="text-slate-400 font-bold text-sm">
                        Answers came from the following passages
                </div>
                    <ul>
                        {props.context.map(doc => <> <li>{doc}  </li> <br /> </>)  }
                    </ul>
                </div>
                </>
            );  
        }

      return (
          <>
          <div className="mb-6">

                {contextInput}

                <div className="bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3">              
                    <div className="text-slate-400 font-bold text-sm">
                        Question
                    </div>
                    {props.question}
                </div>

                <div className="bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3">              
                    <div className="text-slate-400 font-bold text-sm">
                        Answer
                </div>
                    <ul>
                        {props.answer.map(ans => <li>{ans}</li>)}
                    </ul>
                </div>

          </div>
          <button
          className="bg-indigo-700 w-full p-2 rounded-md text-lg"
           onClick={props.onBack}>Back
           </button>
          </>
      )
  };
  
  export default Results;