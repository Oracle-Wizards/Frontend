import * as React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function Query() {
  return (
    <><div className="grid w-full gap-3">
          <Textarea placeholder="Type your message here." style={{ width: '400px' }} />
          <Button
              style={{ width: '400px' }}
          >Send message</Button>
      </div>
      <br />
      <div className="grid w-full gap-3">
              <Textarea placeholder="Type your message here." style={{ width: '400px' }} />
              
        </div></>
  )
}
export default Query
