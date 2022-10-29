import FileUploader from "./FileUploader.jsx"
import BeatLoader from "react-spinners/BeatLoader"

const Form = (props) => { 

    const updateQuestionValue = (e) => {
        const text = e.currentTarget.value;
          props.setQuestion(text);
      };
    
    let fileInput = (
          <>
          <div className="mb-6 text-slate-200">
            <p>Give me a context as a file. I will read it and try to answer ...</p>
            <p>Available formats: .pdf</p>
          </div>

          <label className="">Context as a File</label>
          <FileUploader
            file={props.file}
            setFile={props.setFile}
            uploadFile={props.uploadFile}
            />
          </>
        )

      const SubmitButton= (
        <button 
        type="submit"
        className="bg-indigo-900 disabled:opacity-50 w-full p-2 rounded-md text-lg hover:bg-indigo-800"
        onClick={props.onSubmit}
        >
          Submit</button>
      )

      const BarLoader = (
        <div className="text-center">
        <BeatLoader color="#e9eeed"/>
        </div>
      )


    return (
        <>
        {fileInput}

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

        {props.isLoading? BarLoader: SubmitButton}

        </>
    )
};


export default Form; 