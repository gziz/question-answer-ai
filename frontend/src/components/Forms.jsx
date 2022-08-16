
const Form = (props) => { 

    const updateContextValue = (e) => {
        const text = e.currentTarget.value;
          props.setContext(text);
      };
    const updateQuestionValue = (e) => {
        const text = e.currentTarget.value;
          props.setQuestion(text);
      };
    
    let contextInput = <></>;
    if (props.contextType === "question-text") {

      contextInput = (
        <>
        <div className="mb-6 text-slate-200">
          <p>Give me a context (paragraph/sentence) and a question. I will try to answer ...</p>
        </div>
        <label className="">Context as Text</label>
        <textarea
          className="h-48 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
          type="text" placeholder="Type your context!" 
          onChange={(e) => updateContextValue(e)} 
          value={props.context}
        ></textarea>
        </>
      );
    } else {
      contextInput = (
        <>
          <div className="mb-6 text-slate-200">
            <p>Give me a context as a website url and a question. I will scrape the website and try to answer ...</p>
          </div>
          <label className="">Context as URL</label>
          <textarea
            className="h-48 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
            type="text" placeholder="Paste your url!" 
            onChange={(e) => updateContextValue(e)} 
            value={props.context}
          ></textarea>
        </>
      );
      }

    return (

        <>
        {contextInput}

        <label className="">Question</label>
        <textarea
        className="bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
        type="text" placeholder="Type your question!" 
        onChange={(e) => updateQuestionValue(e)} 
        value={props.question}
        ></textarea>

        <div className="flex items-center mb-4">
            <input checked={props.storeQuery} onChange={(e) => props.setStoreQuery(e.target.checked)} id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"/>
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Save my query</label>
        </div>

        <div className= {"mb-2 text-sm text-right"}>
          Powered by Hugging Face
        </div>

        <button 
        type="submit"
        className="bg-indigo-900 disabled:opacity-50 w-full p-2 rounded-md text-lg hover:bg-indigo-800"
        onClick={props.onSubmit}
        >
            Submit</button>
            
        </>
    )
};


export default Form; 