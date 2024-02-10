import React from 'react'
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Textarea } from '@/components/ui/textarea'

function Playground() {
  return (
    <>
      <div>playground</div>
      

      <div className="bg-white shadow rounded h-screen">
        {/* Resizable panels container */}
        <div className="flex flex-col h-full">
          <ResizablePanelGroup direction="horizontal" className="flex flex-grow">
            <ResizablePanel className="border-r flex-grow">
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">One</span>
                <Textarea className="mt-4">This is the content of Panel One.</Textarea>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel className="flex-grow">
              {/* Nested ResizablePanelGroup */}
              <ResizablePanelGroup direction="vertical" className="flex flex-grow">
                <ResizablePanel className="border-b flex-grow">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Two</span>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel className="flex-grow">
                  <div className="flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Three</span>
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

export default Playground