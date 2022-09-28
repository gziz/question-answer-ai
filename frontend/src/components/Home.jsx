import React from "react";
import axiosManager from '../apis/axiosManager';
import Form from "./Forms.jsx"
import Results from "./Results.jsx";
import NavBar from "./NavBar.jsx"

const Home = () => { 
    // const [tmpContext, setTmpContext] = React.useState("");
    const [context, setContext] = React.useState();
    const [question, setQuestion] = React.useState("");
    const [answer, setAnswer] = React.useState(""); 
    const [hasResult, setHasResult] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [contextType, setContextType] = React.useState("question-text"); 
    const [storeQuery, setStoreQuery] = React.useState(true);

    let formData;
    if (contextType === "question-file"){

      formData =  {
        "question": question
      }


    }else{
      formData =  {
        "question": question,
        "context": context,
        "storeQuery": storeQuery
      }
    }

    const onSubmit = async () => {
      try{
        console.log("Submitting");
        setIsLoading(true);
        
        const endpoint = `/${contextType}`
        const res = await axiosManager.post(endpoint, formData);
        onResult(res.data)
        
      }catch(err){
        console.log(err.message);
      }
    }

    const uploadFile = async () => {
      try{
        setIsLoading(true);
        const endpoint = "/upload_file";

        let formData;
        formData = new FormData();
        formData.append("file", context);
        const res = await axiosManager.post(endpoint, formData);
        console.log(res.data)
        setIsLoading(false);
      }catch(err){
        console.log(err.message);
      }
    }

    // Cuando el result llegue del api:
    const onResult = (data) => {
        // setTmpContext(context);

        // const modified_context = data.data.context.replace(
        //     data.data.answer, '--->' + data.data.answer + '<---'
        // );
        //setContext(context);
        setAnswer(data.data.answer);
        setHasResult(true);
        setIsLoading(true);
    };

    // Cuando le demos back al boton en resultados:
    const onReset = (data) => {
        setContext(context);
        setHasResult(false);
        setIsLoading(false);

    }
    
    const navChange = (data) => {
      setHasResult(false);
      setAnswer("");
      setContext("");
      setQuestion("");
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
          contextType={contextType}
        />
      );
    } else {
    displayedElement = (
      <Form
        context={context}
        contextType={contextType}
        setContext={setContext}
        question={question}
        setQuestion={setQuestion}
        onSubmit={onSubmit}
        isLoading={isLoading}
        setStoreQuery={setStoreQuery}
        storeQuery={storeQuery}
        uploadFile={uploadFile}
      />
    );
    }

    return (
      <>
        <NavBar setContextType={setContextType} navChange={navChange}/>
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

export default Home;