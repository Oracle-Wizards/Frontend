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
  const opt = {
    database: 'PostgreSQL' //   is the default database
  }
  const [sqlQuery, setSqlQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const parser = new Parser();

  const handleQueryValidation = () => {
    try {
      // Parse the SQL query using sql-parser
      parser.astify(sqlQuery, opt);
      // If parsing succeeds, set validation result to true
      setValidationResult(true);
      setValidationError('');

      // Send the SQL query to the backend after successful validation
      verifyQueryBackend(sqlQuery);
    } catch (error) {
      // If parsing fails, set validation result to false and display the error message
      setValidationResult(false);
      setValidationError(error.message);
      // Display the error message as an alert dialog
      window.alert('Validation Error: ' + error.message);
    }
  };
  
  async function verifyQueryBackend(query) {
    // Make a POST request to your Flask backend with the SQL query
    fetch('http://127.0.0.1:5000/api/validation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    }) .then(response=>{
      if (response.ok) {
        // Handle successful response from the backend
        console.log('Query is valid');
      } else {
        // Handle error response from the backend
        throw new Error('false query');
      }
    
    })      .catch(error => {
      // Handle any errors that occur during the fetch operation
      console.error('Error sending query to backend:', error);
      window.alert('Error sending query to backend: ' + error.message);
    });
    }
  const sendQueryToBackend = (query) => {
    // Make a POST request to your Flask backend with the SQL query
    fetch('http://127.0.0.1:5000/api/optimization', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    })
      .then(response => {
        if (response.ok) {
          // Handle successful response from the backend
          console.log('Query successfully sent to the backend');
        } else {
          // Handle error response from the backend
          throw new Error('Failed to send query to the backend');
        }
      })
      .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('Error sending query to backend:', error);
        window.alert('Error sending query to backend: ' + error.message);
      });
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
              <Alert style={{ backgroundColor: 'red', color: 'white' }}>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Error!</AlertTitle>
                <AlertDescription style={{ color: 'white' }}>
                  {validationError}
                  <br />
                  {/* Add a link to /ChatBot */}
                  <a href="/ChatBot" style={{ color: 'white' }}>Ask our ChatBOT</a>
                </AlertDescription>
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