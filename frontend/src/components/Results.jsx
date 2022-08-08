  const Results = (props) => {   
  
      return (
          <>
          <div className="mb-6">
  
                <div className="mb-6 text-slate-200">
                    <p>Give me a context (paragraph/sentence) and a question. I will try to answer ...</p>
                </div>
                <div className="h-32 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3  overflow-auto">              
                <div className="text-slate-400 font-bold text-sm">
                    Context
                </div>
                    {props.context}
                </div>

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
                    {props.answer}
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