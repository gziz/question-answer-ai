import React from "react";
import axiosManager from '../apis/axiosManager';
import Form from "./FormsText.jsx"
import Results from "./Results.jsx";
import NavBar from "./NavBar.jsx"

const QuestionText = () => { 
    const [context, setContext] = React.useState(undefined);
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState(""); 
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [storeQuery, setStoreQuery] = React.useState(true);

    let formData =  {
        "question": question,
        "context": context,
        "storeQuery": storeQuery
      }

    const onSubmit = async () => {
      try{
        console.log("Submitting");
        setIsLoading(true);
        const res = await axiosManager.post("question-text", formData);
        onResult(res.data)
        
      }catch(err){
        console.log(err.message);
      }
    }

    // Cuando el result llegue del api:
    const onResult = (data) => {

        setContext(data.data.context);
        setAnswer(data.data.answer);
        setHasResult(true);
        setIsLoading(false);
    };

    // Cuando le demos back al boton en resultados:
    const onReset = (data) => {

        setContext(context);
        setHasResult(false);
        setIsLoading(false);

    }
  
    // Hace render al forms o a la seccion de resultados
    let displayedElement = <></>;
    if (hasResult) {    
      displayedElement = (
        <Results
          context={context}
          question={question}
          answer={answer}
          onBack={onReset}
          contextType={"question-text"}
        />
      );
    } else {
    displayedElement = (
      <Form
        context={context}
        setContext={setContext}
        question={question}
        setQuestion={setQuestion}
        onSubmit={onSubmit}
        isLoading={isLoading}
        setStoreQuery={setStoreQuery}
        storeQuery={storeQuery}
      />
    );
    }

    return (
      <>
        <div className=" flex scale-[0.85]">
            <div className="max-w-xl h-5/6 m-auto p-5">
                <div className="bg-slate-800 p-6 rounded-md text-white">
                    <div className="text-center my-6">
                        <h1 className="text-3xl">Question Answering AI</h1>
                        <div>Artificial Intelligence For You</div>
                    </div>
                    {displayedElement}
                </div>
            </div>
        </div>

      </>
    )
}

export default QuestionText;