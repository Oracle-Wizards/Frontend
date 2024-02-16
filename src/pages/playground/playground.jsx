import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Textarea } from '@/components/ui/textarea';
import { RocketIcon } from "@radix-ui/react-icons";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Parser } from 'node-sql-parser'; // Assurez-vous d'installer ce package si ce n'est pas déjà fait
import './playgroud.css';
import Execution from "../../components/execution/execution";

function Playground() {
  const opt = {
    database: 'MySQL'
  };
  const [sqlQuery, setSqlQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [optimizedQuery, setOptimizedQuery] = useState('');
  const [showExecutionPlan, setShowExecutionPlan] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleExecutionPlan = () => {
    setShowExecutionPlan(!showExecutionPlan);
  };

  const parser = new Parser();

  const handleQueryValidation = () => {
    try {
      parser.astify(sqlQuery, opt);
      setValidationResult(true);
      setValidationError('');

      // Envoyer la requête SQL analysée au backend
      sendQueryToBackend(sqlQuery);
    } catch (error) {
      setValidationResult(false);
      setValidationError(error.message);
      window.alert('Validation Error: ' + error.message);
    }
  };

  const sendQueryToBackend = (query) => {
    setLoading(true); // Activer le chargement

    fetch('http://127.0.0.1:5000/analyze-sql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to send query to the backend');
        }
      })
      .then(data => {
        setOptimizedQuery(data.optimized_query);
        console.log('Query successfully sent to the backend');
      })
      .catch(error => {
        console.error('Error sending query to backend:', error);
        window.alert('Error sending query to backend: ' + error.message);
      })
      .finally(() => {
        setLoading(false); // Désactiver le chargement une fois le traitement terminé
      });
  };
  const getRandomImageName = () => {
    const imageNames = ['OIG4', 'OIG5', 'OIG6', 'OIG7'];
    const randomIndex = Math.floor(Math.random() * imageNames.length);
    return imageNames[randomIndex];
  };
  
  // Dans votre composant où vous définissez l'image de chargement
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
                    className="mt-4 resize-none w-full flex-grow bg-gray-100"
                    placeholder="Type your text query"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                  />
                  <br />
                  <Button onClick={handleQueryValidation}>Submit</Button>

                  {validationResult === false && (
                    <Alert>
                      <RocketIcon className="h-4 w-4" />
                      <AlertTitle>Error!</AlertTitle>
                      <AlertDescription>{validationError}</AlertDescription>
                    </Alert>
                  )}

                  {validationResult === true && (
                    <Alert>
                      <RocketIcon className="h-4 w-4" />
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
