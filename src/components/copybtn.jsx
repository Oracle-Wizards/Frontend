import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
function Copybtn(Query) {
    const { toast } = useToast()

    const handleCopy = () => {
        toast({
            description: "Query copied successfully.",
           
        });
    };

  return (
    <div>
        <CopyToClipboard text={Query}>
            <Button 
                className="w-full mt-2 py-1 px-4 rounded-lg" 
                variant="outline" 
                onClick={() => {
                    toast({
                      description: "Query copied successfully.",
                    })
                  }}>
                    <FontAwesomeIcon icon={faCopy} className="mr-2" />
                    Copy Query
            </Button>
        </CopyToClipboard>
    </div>
  )
}

export default Copybtn