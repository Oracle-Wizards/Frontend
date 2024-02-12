/* eslint-disable react/no-unescaped-entities */
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
import  './playgroud.css';
import { Separator } from "@/components/ui/separator"


function Playground() {
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
                <Textarea className="mt-4 resize-none w-full flex-grow bg-gray-100"
                                  placeholder="Type your text query "
                                  >
                </Textarea>
                {/* Add the Button component here */}
                <br />
                <Button className="">Submit</Button>
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
                      <span className="font-semibold text-xl">Optimized Quer</span>
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
    </>
  )
}

export default Playground;
