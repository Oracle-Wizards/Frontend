/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import  './plan.css';
import { Separator } from "@/components/ui/separator"
import {AlertDemo} from "../alertError"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

function Execution() {
  return (
    <>
      <div className="bg-white shadow-lg rounded ashraf h-auto ">
        <div className="flex flex-col  items-center justify-center p-6">
          <div className="">
            <span className="flex font-semibold text-xl">Plan d'execution</span>
          </div>
          <Separator className="pb-1 "/>
          <div className= "w-full flex ">
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
      </div>
    </>
  )
}

export default Execution;
