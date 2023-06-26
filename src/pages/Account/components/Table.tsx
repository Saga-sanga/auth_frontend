import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import "./table.css"

interface OrgTableType {
    dat: Array<any>;
}

const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-IN', options).toLowerCase().replace(/[^a-zA-Z0-9]/g, '-');
};

const data = [
    {
        name: "String1", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
    {
        name: "String", alt_id: "y1132u14u231o4y123asdfsah92399123", validity: "126817267"
    },
]

export function OrgTable() {
    return (
        <Table >
            <TableCaption>Organization List</TableCaption>
            <TableHeader className="sticky top-0 w-full " >
                <TableRow className="bg-[#4338CA] text-white hover:bg-[#4338ca]"  >
                    <TableHead className="min-w-max text-white"></TableHead>
                    <TableHead className="min-w-max text-white">Organization</TableHead>
                    <TableHead className="min-w-max text-white">Organization Name</TableHead>
                    <TableHead className="min-w-max text-white">Organization ID</TableHead>
                    <TableHead className="min-w-max text-white">Plan Validity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={item.index} className="font-semibold">
                        <StyledCell value="Manage" className=" bg-[#4338ca] text-white" />
                        <StyledCell value={item.name} />
                        <StyledCell value={item.name} />
                        <StyledCell value={item.alt_id} />
                        <StyledCell value={convertTimestampToDate(item.validity * 1000)} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

const StyledCell = ({ value, className = "" }) => {
    return (
        <TableCell>
            <p className={`text-center px-4 py-1.5 text-slate-700 rounded-sm min-w-max ${className ? className : "bg-gray-200"}`}>
                {value}
            </p>
        </TableCell>
    );
}
