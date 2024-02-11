import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { sql } from 'react-syntax-highlighter/dist/esm/languages/hljs'; // Importez le langage SQL



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

  // Fonction pour formater l'explication
const formatExplanation = (explanation) => {
  // explanation = explanation.replace(/`(.*?)`/g, '<strong>$1</strong>');

  // Remplacer ** mot ** par un mot en gras
  // explanation = explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // explanation = explanation.replace(/```(.*?)```/g, '<strong>$1</strong>');

  // Remplacer \n par un retour à la ligne
  explanation = explanation.replace(/\\n/g, '\n');
  // Supprimer les guillemets doubles
  explanation = explanation.replace(/"/g, '');
  explanation = explanation.replace(/'/g, '');
  explanation = explanation.replace(/`/g, '');
  
  return explanation;
};

  const handleSubmit = async () => {
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
    }
  };

  return (
    <>
      <div>Gemini</div>
      <br />

      <div className="bg-white shadow rounded h-screen">
        {/* Resizable panels container */}
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel className="border-r flex-grow">
              <div className="flex flex-col h-full items-center justify-center p-6">
                <span className="font-semibold">Original Text </span>
                <Textarea
                  className="mt-4 resize-none w-full flex-grow"
                  value={originalText}
                  onChange={(e) => setOriginalText(e.target.value)}
                />
              </div>
            </ResizablePanel>

            <ResizableHandle />
            
            <ResizablePanel className="flex-grow">

              <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                  <ResizablePanel className="border-r flex-grow">
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold">Query</span>
                      <Textarea
                        className="mt-4 resize-none w-full flex-grow"
                        value={generatedQuery}
                        readOnly
                      />
                      {/* <div className="App">
                        <DisplaySql sqlQuery={generatedQuery} />
                      </div> */}
                    </div>
                  </ResizablePanel>
                  
                  <ResizableHandle />

                  <ResizablePanel className="flex-grow">
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold">Query Explication</span>
                      <Textarea
                        className="mt-4 resize-none w-full flex-grow"
                        value={queryExplanation} 
                        readOnly
                      />
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
