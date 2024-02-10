import React from 'react';
import { Button } from "@/components/ui/button";
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

function Playground() {
  return (
    <>
      <div>playground</div>
      
      <div className="bg-white shadow rounded h-screen">
        {/* Resizable panels container */}
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel className="border-r flex-grow">
              <div className="flex flex-col h-full items-center justify-center p-6">
                <span className="font-semibold">Original query </span>
                <Textarea className="mt-4 resize-none w-full flex-grow">
                  Enter your query 
                </Textarea>
                {/* Add the Button component here */}
                <Button>Submit</Button>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex-grow">
              {/* Nested ResizablePanelGroup */}
              <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                <ResizablePanel className="border-b flex-grow">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Plan d'execution</span>
                    <Table>
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
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel className="flex-grow">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Optimized Query</span>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </>
  )
}

export default Playground;
