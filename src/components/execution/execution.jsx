import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Spinner } from '@chakra-ui/react'
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

function Execution({ query }) {
  const [executionPlan, setExecutionPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Fonction de chargement du plan d'exécution lors du montage du composant
    const fetchExecutionPlan = async () => {
      setLoading(true);
      try {
        const CleanedQuery = query.replace(/;/g, '');

        const response = await fetch('http://127.0.0.1:5000/execution-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: CleanedQuery })

        });
        const data = await response.json();
        setExecutionPlan(data.execution_plan);
        console.log(data.execution_plan);

      } catch (error) {
        console.error('Error:', error);
        setError(true);


      } finally {
        setLoading(false);
      }
      

  
    };

    fetchExecutionPlan(); // Appel de la fonction de chargement du plan d'exécution
  }, [query]); // Exécuter l'effet uniquement lorsque la requête change

  return (
    <>
      <div className="bg-white shadow-lg rounded ashraf h-auto ">
      {loading ?  
                ( <>
                            <Spinner/> 
                   </>
                ):
                (<> 
                    {!error && (                                          
                        <div className="flex flex-col items-center justify-center p-6">
                          <div className="">
                            <span className="flex font-semibold text-xl">Execution Plan </span>
                            <br />
                          </div>
                          <Separator className="pb-1" />
                          <div className="w-full flex">
                                        
                                            <Table>
                                              <TableHeader>
                                                <TableRow>
                                                  <TableHead className = "text-center">ID</TableHead>
                                                  <TableHead className = "text-center">Operation</TableHead>
                                                  <TableHead className = "text-center">Name</TableHead>
                                                  <TableHead className = "text-center">Rows</TableHead>
                                                  <TableHead className = "text-center">Bytes</TableHead>
                                                  <TableHead className = "text-center">Cost</TableHead>
                                                  <TableHead className = "text-center">Time</TableHead>
                                                </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                {executionPlan && executionPlan.map((row, index) => (
                                                  <TableRow key={index}>
                                                    <TableCell>{row.Id}</TableCell>
                                                    <TableCell>{row.Operation}</TableCell>
                                                    <TableCell>{row.Name}</TableCell>
                                                    <TableCell>{row.Rows}</TableCell>
                                                    <TableCell>{row.Bytes}</TableCell>
                                                    <TableCell>{row.Cost}</TableCell>
                                                    <TableCell>{row.Time}</TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                                
                                            </Table>
                                                
                                                
                          </div>
                        </div>
                    )}  
                     {error && (
                        <Alert variant="destructive">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Error</AlertTitle>
                          <AlertDescription>
                              An error occurred while fetching the execution plan. Please try again later.
                          </AlertDescription>
                        </Alert>
                      )}  
                  </>
                )}
      </div>
    </>
  );
}

export default Execution;
