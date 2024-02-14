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

function Execution({ query }) {
  const [executionPlan, setExecutionPlan] = useState([]);

  useEffect(() => {
    // Fonction de chargement du plan d'exécution lors du montage du composant
    const fetchExecutionPlan = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/execution-plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ query: query })
        });
        const data = await response.json();
        setExecutionPlan(data.execution_plan);
        console.log(data.execution_plan);
      } catch (error) {
        console.error('Error:', error);
      }
  
    };

    fetchExecutionPlan(); // Appel de la fonction de chargement du plan d'exécution
  }, [query]); // Exécuter l'effet uniquement lorsque la requête change

  return (
    <>
      <div className="bg-white shadow-lg rounded ashraf h-auto ">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="">
            <span className="flex font-semibold text-xl">Execution Plan {query}</span>
          </div>
          <Separator className="pb-1" />
          <div className="w-full flex">
          <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Id</TableHead>
                            <TableHead>Operation</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Rows</TableHead>
                            <TableHead>Bytes</TableHead>
                            <TableHead>Cost</TableHead>
                            <TableHead>Time</TableHead>
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
      </div>
    </>
  );
}

export default Execution;
