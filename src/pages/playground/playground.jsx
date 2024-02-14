import { Button } from "@/components/ui/button";
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from '@/components/ui/textarea';
import './playgroud.css';
import { Separator } from "@/components/ui/separator"
import {AlertDemo} from "../../components/alertError"
import { Parser } from 'node-sql-parser';
import { RocketIcon } from "@radix-ui/react-icons"
import Execution from "../../components/execution/execution"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Spinner } from '@chakra-ui/react'

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

function Playground() {
  const opt = {
    database: 'MySQL' // MySQL is the default database
  }
  const [sqlQuery, setSqlQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [optimizedQuery, setOptimizedQuery] = useState('SELECT * FROM TABLE WHERE condition');
  const [showExecutionPlan, setShowExecutionPlan] = useState(false);

  const toggleExecutionPlan = () => {
    setShowExecutionPlan(!showExecutionPlan);
  };

  const parser = new Parser();

  const handleQueryValidation = () => {
    try {
      // Parse the SQL query using sql-parser
      parser.astify(sqlQuery, opt);
      // If parsing succeeds, set validation result to true
      setValidationResult(true);
      setValidationError('');
      // Example of setting optimized query
      setOptimizedQuery('SELECT * FROM Table WHERE condition');
    } catch (error) {
      // If parsing fails, set validation result to false and display the error message
      setValidationResult(false);
      setValidationError(error.message);
      // Display the error message as an alert dialog
      window.alert('Validation Error: ' + error.message);
    }
  };
  
  return (
    <>
    <div>
     <div className="title1  font-bold text-3xl what2">
            Playground
          </div>
      {/* <div>playground</div> */}
      <br />

      <div className="bg-white shadow-lg rounded ashraf">
        {/* Resizable panels container */}
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel className="border-r flex-grow">
              <div className="flex flex-col h-full items-center justify-center p-6">
                <span className="font-semibold text-xl">Original query </span>
                <Textarea
            className="mt-4 resize-none w-full flex-grow bg-gray-100"
            placeholder="Type your text query"
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
          />
          <br />
          <Button onClick={handleQueryValidation}>Submit</Button>

                
            {/* Display alert message if there's a validation error */}
            {validationResult === false && (
              <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            {/* Optionally, you can also display a success message if the validation succeeds */}
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
              {/* Nested ResizablePanelGroup */}
              <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                {/* <ResizablePanel className="border-b flex-grow">
                  <div className="flex flex-col h-full items-center justify-center p-6">
                    <div className="">
                      <span className="flex font-semibold text-xl">Plan d'execution</span>

                      </div>                       
                      <Separator className="pb-1 "/>

                     <div className= "w-full flex">
                      <Table >
                        <TableHeader>
                          <TableRow>
                            <TableHead>bytes</TableHead>
                            <TableHead>cost</TableHead>
                            <TableHead>rows</TableHead>
                            <TableHead>time</TableHead>
                            <TableHead>name</TableHead>
                            <TableHead>operation</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>600</TableCell>
                            <TableCell>2(0)</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>00:00:07</TableCell>
                            <TableCell>Etudiant</TableCell>
                            <TableCell>SELECT * FROM Etudiant</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>600</TableCell>
                            <TableCell>2(0)</TableCell>
                            <TableCell>15</TableCell>
                            <TableCell>00:00:07</TableCell>
                            <TableCell>Etudiant</TableCell>
                            <TableCell>SELECT * FROM Etudiant</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle /> */}

                <ResizablePanel className="flex-grow">
                  <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold text-xl">Optimized Query</span>
                      <Textarea
                        className="mt-4 resize-none w-full flex-grow text-base bg-gray-100"
                        value={optimizedQuery}
                        readOnly
                      />
                      {optimizedQuery && (
                        <>
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
                                  <Button className="w-full mt-2 py-1 px-4 rounded-lg" 
                                     onClick={toggleExecutionPlan}>
                                       {showExecutionPlan ? "Hide execute plan" : "Show execute plan"}
                                    </Button>
                                </div>
                              </div>


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
      {showExecutionPlan && <Execution query={"data"} />}
    </>
  )
}

export default Playground;
