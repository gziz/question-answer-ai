import io
import re
import PyPDF2
import os

def process_text(text):
  text = re.sub(pattern="\t", repl=' ', string=text)
  text = re.sub(pattern="\[[0-9]+\]", repl='', string=text)
  text = re.sub(pattern="\n-\n", repl='-', string=text)
  text = re.sub(pattern="(?<! )\n", repl=' ', string=text)
  text = re.sub(pattern="\n", repl='', string=text)
  text = re.sub(r"/^[A-Za-z\/\s\.'-]+$/", '', text)
  return text

async def process_file(file, file_path):

    file_name, ext = os.path.splitext(file_path)

    # if ext == '.txt':
    #     pass

    if ext == '.pdf':

        file_content = await file.read()
        file_content = io.BytesIO(file_content)
    
        pdfReader = PyPDF2.PdfFileReader(file_content)
        
        text_str = ""
        for page in range(pdfReader.numPages):
            pageObj = pdfReader.getPage(page)
            text = pageObj.extractText()
            text = process_text(text)
            text_str += text


        text_splitted = text_str.split('.') 
        span = 3
        text_stream = [(".".join(text_splitted[i:i+span])+".").strip()
                        for i in range(0, len(text_splitted), span)]

    return text_stream
    