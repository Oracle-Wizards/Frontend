/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-irregular-whitespace */
import   { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { sql } from 'react-syntax-highlighter/dist/esm/languages/hljs'; // Importez le langage SQL
import  './gemini.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react'
import loadingGif  from './loading.gif';


function DisplaySql(props) {
  const sqlQuery = props.sqlQuery;

  return (
    <div className="sql-container">
      <SyntaxHighlighter language={sql} style={sqlTheme}>
        {sqlQuery}
      </SyntaxHighlighter>
    </div>
  );
}

const sqlTheme = {
  dark: {
    color: '#d4d4d4',
    background: '#1E1E1E',
    // Custom styles for keywords, strings, etc. can be added here
  },
  light: {
    color: '#333',
    background: '#f8f8f8',
    // Custom styles for keywords, strings, etc. can be added here
  }
};

// import API_BASE_URL from 'src/api.js'; 

function Gemini() {
  const [originalText, setOriginalText] = useState('');
  const [generatedQuery, setGeneratedQuery] = useState('');
  const [queryExplanation, setQueryExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  // Fonction pour formater l'explication
const formatExplanation = (explanation) => {
  // explanation = explanation.replace(/`(.*?)`/g, '<strong>$1</strong>');

  // Remplacer ** mot ** par un mot en gras
  // explanation = explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // explanation = explanation.replace(/```(.*?)```/g, '<strong>$1</strong>');

  // Remplacer \n par un retour à la ligne
  explanation = explanation.replace(/\\n/g, '\n');
  explanation = explanation.replace(/\\n{2,}/g, '\n');

  // Supprimer les guillemets doubles
  explanation = explanation.replace(/"/g, '');
  explanation = explanation.replace(/'/g, '');
  explanation = explanation.replace(/```/g, '');
  explanation = explanation.replace(/``/g, '');
  
  return explanation;
};

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/generate`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_text: originalText })
      });
      
      const data = await response.json();
      setGeneratedQuery(data.generated_query);
      setQueryExplanation(formatExplanation(data.explanation));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      
      setLoading(false);
    }
  };
  

  return (
    <>
     <div className="flex flex-col items-center ">
        <div className="flex flex-row">
          <Avatar>
            <AvatarImage src="https://www.gstatic.com/lamda/images/bard_sparkle_v2.svg" alt="Gemini" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="title1  font-bold text-3xl what2">
            Hello, I'm Query Wizard :
          </div>
        </div>
        <div className="qts  font-bold text-2xl what">
        input text, get query, see magic 🪄
        </div>
      </div>
      {/* <br/> */}
      <div className="bg-white shadow-lg rounded ashraf">
        {/* Resizable panels container */}
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel className="border-r flex-grow" defaultSize={50}>
              <div className="flex flex-col h-full items-center justify-center p-6">
                <span className="font-semibold text-xl">Original Text </span>
                <Textarea
                  className="mt-4 resize-none w-full flex-grow text-lg bg-gray-100"
                  value={originalText}
                  placeholder="Type your text here."
                  onChange={(e) => setOriginalText(e.target.value)}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle />

            <ResizablePanel className="flex-grow" defaultSize={50}>

                <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                  <ResizablePanel className="flex-grow" defaultSize={40}>
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold text-xl">Query</span>
                      {loading ?  
                        ( <>
                            <br />
                            <img src={loadingGif} alt="Loading..."  style={{ width: '50px', height: '50px' }}/>

                            {/* <Spinner/> */}
                          </>
                        ):(<>
                        <Textarea
                          className="mt-4 resize-none w-full flex-grow text-base bg-gray-100"
                          value={generatedQuery}
                          readOnly
                        />
                       {/* <CopyToClipboard text={generatedQuery}>
                      <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Copy Query</button>
                    </CopyToClipboard> */}

                    
                    {generatedQuery && (
                      <CopyToClipboard text={generatedQuery}>
                      <Button className="mt-2  py-2 px-4  rounded-lg" variant="outline" >
                       <FontAwesomeIcon icon={faCopy} className="mr-2" />
                       Copy Query
                     </Button>
                   </CopyToClipboard>
                    )}
                    
                      {/* <div className="App">
                        <DisplaySql sqlQuery={generatedQuery} />
                      </div> */}
                      </>
                      )}
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle />

                  <ResizablePanel className="flex-grow" defaultSize={60}>
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold text-xl">Query Explanation</span>
                      {loading ? 
                        ( <>
                            <br />
                            <img src={loadingGif} alt="Loading..."  style={{ width: '50px', height: '50px' }}/>
                          </>
                        ):(
                          <>
                            <Textarea
                              className="mt-4 resize-none w-full flex-grow text-base bg-gray-100"
                              value={queryExplanation} 
                              readOnly
                            />
                          </>
                        )
                      }

                    </div>
                  </ResizablePanel>

                </ResizablePanelGroup>
            </ResizablePanel>

          </ResizablePanelGroup>
          <div className="p-6">
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gemini;