/* eslint-disable react/no-unescaped-entities */
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
import  './playgroud.css';
import { Separator } from "@/components/ui/separator"
import {AlertDemo} from "../../components/ui/alertError"
import { Parser } from 'node-sql-parser';
import { RocketIcon } from "@radix-ui/react-icons"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

function Playground() {

  const [sqlQuery, setSqlQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const parser = new Parser();

  const handleQueryValidation = () => {
    try {
      // Parse the SQL query using sql-parser
      parser.astify(sqlQuery);
      // If parsing succeeds, set validation result to true
      setValidationResult(true);
      setValidationError('');
      prompt('Validation Error:', error.message);


    } catch (error) { 
      // If parsing fails, set validation result to false and log the error
      prompt('Validation Error:', error.message);
      setValidationResult(false);
      setValidationError(error.message);    }
  };

  return (
    <>
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
                <ResizablePanel className="border-b flex-grow">
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

                <ResizableHandle />

                <ResizablePanel className="flex-grow">
                  {/* <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Optimized Query</span>
                  </div> */}
                  <div className="flex flex-col h-full items-center justify-center p-6">
                      <span className="font-semibold text-xl">Optimized Query</span>
                      <Textarea
                        className="mt-4 resize-none w-full flex-grow text-base bg-gray-100"
                        value={""}
                        readOnly
                      />
                      {/* <div className="App">
                        <DisplaySql sqlQuery={generatedQuery} />
                      </div> */}
                    </div>
                </ResizablePanel>
                
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
      <AlertDemo />
    </>
  )
}

export default Playground;