"use client";

import React, { useState, useEffect } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchSubmissionRecord } from "@/lib/server-actions";
import Link from "next/link";

type SR = { id: string; userIp: string; formId: string[] };

const RecordPage = () => {
  const [submissionRecords, setSubmissionRecords] = useState<SR[]>([]);

  useEffect(() => {
    fetchSubmissionRecord().then((data: SR[]) => {
      setSubmissionRecords(data);
    });
  }, []);

  const submittedForms = new Set(
    submissionRecords.reduce<string[]>((acc, curr) => {
      curr.formId.forEach((id) => {
        if (!acc.includes(id)) {
          acc.push(id);
        }
      });
      return acc;
    }, [])
  );

  return (
    <div className="px-6 p-2 ">
      <Table>
        <TableCaption className="text-sm">
          A list of your recent form submissions.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">User IP</TableHead>
            <TableHead>Submitted Form Ids</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissionRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="font-medium">{record.userIp}</TableCell>
              <TableCell>
                {record.formId?.map((id) => (
                  <><Link href={`/form/${id}`}>{id}</Link>,{" "}</>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Form Submissions</TableCell>
            <TableCell className="text-right">{submittedForms.size}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default RecordPage;
