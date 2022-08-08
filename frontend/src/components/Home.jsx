import React from "react";
import axiosManager from '../apis/axiosManager';
import Form from "./Forms.jsx"
import Results from "./Results.jsx";

const Home = () => { 

    const [context, setContext] = React.useState("");
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState("");
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async () => {
      try{
        console.log("Submitting");
        setIsLoading(true);
        const res = await axiosManager.post("/questionanswering", {
          "data": [{"question": question,
                    "context": context}]
        });
        onResult(res.data)

      }catch(err){
        console.log(err.message);
      }
      
    }

    // Cuando el result llegue del api:
    const onResult = (data) => {
        setAnswer(data.answer.answer);
        setHasResult(true);
        setIsLoading(true);
    };

    // Cuando le demos back al boton en resultados:
    const onReset = (data) => { 

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
      />
    );
    }



    return (
        <div className="h-screen flex">
            <div className="max-w-xl m-auto p-5">
                <div className="dark:bg-slate-800 p-6 rounded-md text-white">
                    <div className="text-center my-6">
                        <h1 className="text-3xl">Question Answering AI</h1>
                        <div>Artificial Intelligence For You</div>
                    </div>
                    {displayedElement}
                </div>
            </div>
        </div>
    )
}

export default Home;