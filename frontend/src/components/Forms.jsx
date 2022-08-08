
const Form = (props) => { 

    const updateContextValue = (e) => {
        const text = e.currentTarget.value;
          props.setContext(text);
      };
    const updateQuestionValue = (e) => {
        const text = e.currentTarget.value;
          props.setQuestion(text);
      };

    return (
        <>
        <div className="mb-6 text-slate-200">
          <p>Give me a context (paragraph/sentence) and a question. I will try to answer ...</p>
        </div>

        <label className="">Context</label>
        <textarea
        className="h-32 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
        type="text" placeholder="Type your context!" 
        onChange={(e) => updateContextValue(e)} 
        value={props.context}
        ></textarea>

        
        <label className="">Question</label>
        <textarea
        className="bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3"
        type="text" placeholder="Type your question!" 
        onChange={(e) => updateQuestionValue(e)} 
        value={props.question}
        ></textarea>

        <div className= {"mb-2 text-sm text-right"}>
          Powered by Hugging Face
        </div>

        <button 
        type="submit"
        className="bg-indigo-700 disabled:opacity-50 w-full p-2 rounded-md text-lg"
        onClick={props.onSubmit}
        >
            Submit</button>
            
        </>
    )
};

export default Form;