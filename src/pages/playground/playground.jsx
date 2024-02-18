/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Textarea } from '@/components/ui/textarea';
import { RocketIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Parser } from 'node-sql-parser';  
import './playgroud.css';
import Execution from "../../components/execution/execution";
import { AlertCircle } from "lucide-react"
import { Link } from 'react-router-dom';

function Playground() {
  const opt = {
    database: 'PostgreSQL'
  };
  const [sqlQuery, setSqlQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [optimizedQuery, setOptimizedQuery] = useState('');
  const [showExecutionPlan, setShowExecutionPlan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendValidationResult, setBackendValidationResult] = useState(false);  
  const [showErrorMessage, setShowErrorMessage] = useState(false);  

  const toggleExecutionPlan = () => {
    setShowExecutionPlan(!showExecutionPlan);
  };

  const parser = new Parser();

  const handleQueryValidation = () => {
    try {
      parser.astify(sqlQuery, opt);
      setValidationResult(true);
      setValidationError('');
      setOptimizedQuery('');
      setShowErrorMessage(false);  

       sendQueryToBackend(sqlQuery);
    } catch (error) {
      setValidationResult(false);
      setValidationError(error.message);
      setShowErrorMessage(true); // Afficher le message d'erreur en cas d'échec de la validation
      window.alert('Validation Error: ' + error.message);
    }
  };

  const sendQueryToBackend = async (query) => {
    setLoading(true); 
    const analyzeSqlEndpoint = 'http://127.0.0.1:5000/analyze_sql';

    const requestData = { query };

    try {
      const analyzeResponse = await fetch(analyzeSqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      if (!analyzeResponse.ok) {
        throw new Error('Failed to analyze SQL query');
      }

      const analyzeData = await analyzeResponse.json();

      console.log('SQL query analysis result:', analyzeData);

      if (analyzeData.status === 'success') {
        setLoading(true);  

        setBackendValidationResult(true); 
        sendOptimizeRequest(requestData);
      } else {
        setValidationError('Invalid SQL query');
        setBackendValidationResult(false); 
        setShowErrorMessage(true);
        setLoading(false);

         
        
      }
    } catch (error) {
      console.error('Error analyzing SQL query:', error);
      setValidationError('Error analyzing SQL query');
      setBackendValidationResult(false); 
      setLoading(false);  
      setShowErrorMessage(true);

    } 
  };

  const sendOptimizeRequest = async (query) => {
    const optimizeSqlEndpoint = 'http://127.0.0.1:5000/optimise_query';

    try {
      const response = await fetch(optimizeSqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error('Failed to optimize SQL query');
      }

      const data = await response.json();
      setOptimizedQuery(data.optimized_query);
    } catch (error) {
      console.error('Error optimizing SQL query:', error);
    }
    finally{
      setLoading(false);
    }
  };

  const getRandomImageName = () => {
    const imageNames = ['OIG4', 'OIG5', 'OIG6', 'OIG7'];
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return imageNames[randomIndex];
  };
  
  const randomImageName = getRandomImageName();
  const loadingImageUrl = `public/${randomImageName}.jpg`;

  return (
    <>
      <div>
        <div className="title1 font-bold text-3xl what2">
          Playground
        </div>
        <br />
        
        <div className="bg-white shadow-lg rounded ashraf">
          <div className="flex flex-col h-full">
            <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
              <ResizablePanel className="border-r flex-grow">
                <div className="flex flex-col h-full items-center justify-center p-6">
                  <span className="font-semibold text-xl">Original query</span>
                  <Textarea
                    spellcheck="false"
                    className="mt-4 resize-none w-full flex-grow bg-gray-100 font-semibold text-base"
                    placeholder="Type your text query"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                  />
                  <br />
                  <Button onClick={handleQueryValidation}>Submit</Button>

                  {showErrorMessage && (
                    <Alert variant="destructive" className = "mt-2">
                    <AlertCircle className="h-4 w-4 "  />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className= "flex flex-col items-center justify-center">
                      Oops! It seems like there's a problem with your query. <br/>
                      <Link to="/ChatBot" className="flex items-center font-semibold hover:text-gray-900 ">
                        Let's try something else!
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.29227 0.048984C3.47033 -0.032338 3.67946 -0.00228214 3.8274 0.125891L12.8587 7.95026C13.0134 8.08432 13.0708 8.29916 13.0035 8.49251C12.9362 8.68586 12.7578 8.81866 12.5533 8.82768L9.21887 8.97474L11.1504 13.2187C11.2648 13.47 11.1538 13.7664 10.9026 13.8808L8.75024 14.8613C8.499 14.9758 8.20255 14.8649 8.08802 14.6137L6.15339 10.3703L3.86279 12.7855C3.72196 12.934 3.50487 12.9817 3.31479 12.9059C3.1247 12.8301 3 12.6461 3 12.4414V0.503792C3 0.308048 3.11422 0.130306 3.29227 0.048984ZM4 1.59852V11.1877L5.93799 9.14425C6.05238 9.02363 6.21924 8.96776 6.38319 8.99516C6.54715 9.02256 6.68677 9.12965 6.75573 9.2809L8.79056 13.7441L10.0332 13.178L8.00195 8.71497C7.93313 8.56376 7.94391 8.38824 8.03072 8.24659C8.11753 8.10494 8.26903 8.01566 8.435 8.00834L11.2549 7.88397L4 1.59852Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                      </Link>
                    </AlertDescription>
                                      
                  </Alert>
                  )}

                  {validationResult === true && backendValidationResult === true && (
                    <Alert  className = "mt-2">
                      <RocketIcon className="h-4 w-4"   />
                      <AlertTitle>Success!</AlertTitle>
                      <AlertDescription>The SQL query is valid.</AlertDescription>
                    </Alert>
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle />

              <ResizablePanel className="flex-grow">
                <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                  <ResizablePanel className="flex-grow">
                    <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold text-xl">Optimized Query</span>
                      {loading ? 
                        ( <>
                            <br />
                            <div className="loader w-12 h-12 rounded-full border-2 border-gray-300 border-t-gray-800 animate-spin">
                              <img src={loadingImageUrl} alt="Loading..." className="w-full h-full rounded-full" />
                            </div>
                          </>
                        ):(
                          <>
                            <Textarea
                              className="mt-4 resize-none w-full flex-grow text-base bg-gray-100"
                              value={optimizedQuery}
                              readOnly
                            />
                            {optimizedQuery && (
                              <div className="flex justify-between">
                                <div className="flex-grow p-2">
                                  <CopyToClipboard text={optimizedQuery}>
                                    <Button className="w-full mt-2 py-1 px-4 rounded-lg" variant="outline" >
                                      <FontAwesomeIcon icon={faCopy} className="mr-2" />
                                      Copy Query
                                    </Button>
                                  </CopyToClipboard>
                                </div>
                                <div className="flex-grow p-2">
                                  <Button className="w-full mt-2 py-1 px-4 rounded-lg" onClick={toggleExecutionPlan}>
                                    {showExecutionPlan ? "Hide execute plan" : "Show execute plan"}
                                  </Button>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
      <br />
      {showExecutionPlan && <Execution query={optimizedQuery} />}
    </>
  );
}

export default Playground;
