import React, { useRef } from 'react';
import { useEffect } from 'react';
import useFileUpload from 'react-use-file-upload';

const FileUploader = (props) => {
  const {
    files,
    fileNames,
    fileTypes,
    totalSize,
    totalSizeInBytes,
    handleDragDropEvent,
    clearAllFiles,
    createFormData,
    setFiles,
    removeFile,
  } = useFileUpload();


  const [uploaded, setUploaded] = React.useState(false);
  const inputRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.uploadFile();
    setUploaded(true);
  };

  useEffect(() => {
    if (1>=files.length>0) {
      props.setContext(files[0]);
    }
  }, [files])

  const myRemoveFile = (name) =>{
    removeFile(name);
    setUploaded(false);
    props.setContext(null);
  }

  let fileHelpers = <></>;
  if (uploaded){
    fileHelpers = <></>;
  }else{
    fileHelpers = <button className="bg-green-900 disabled:opacity-50 p-2 rounded-md text-sm mr-4 hover:bg-green-700"
    onClick={handleSubmit}>{uploaded? "": "Click to upload"}</button>
  }

  return (
    <div>
     
        {/* Provide a drop zone and an alternative button inside it to upload files. */}
        <div className='h-36 bg-gray-700 p-2 w-full rounded-md focus:outline-teal-400 mb-3 text-center flex flex-col justify-around border-dashed border-2'
          onDragEnter={handleDragDropEvent}
          onDragOver={handleDragDropEvent}
          onDrop={(e) => {
            handleDragDropEvent(e);
            setFiles(e, 'a');
          }}
        >
          <p> Drop a Single File</p>

          {/* Hide the crappy looking default HTML input */}
          <input
            ref={inputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              if (files.length > 0) {console.log('STOP')} else {setFiles(e, 'a')} ;
              inputRef.current.value = null;
            }}
          />

        <div className='mb-3 text-center'>
          <button className="bg-gray-600 disabled:opacity-50 p-2 rounded-md text-sm hover:bg-gray-500"
            onClick={() => inputRef.current.click()}>Or select one to upload</button>
        </div>
      </div>

        <div className=''>
          <ul>
            {fileNames.map((name) => (
              <li className='mb-3' key={name}>
                <span className='bg-indigo-800 disabled:opacity-50 p-2 rounded-md text-sm mr-4'>{name}</span>

                {fileHelpers}
                <button className='bg-rose-700 disabled:opacity-50 p-2 rounded-md text-sm hover:bg-rose-500' onClick={() => myRemoveFile(name)}>
                  x
                </button>



              </li>
            ))}
          </ul>
      </div>

      {/* <div className="submit">
        <button onClick={handleSubmit}>Submit</button>
      </div> */}

    </div>
  );
};

export default FileUploader;