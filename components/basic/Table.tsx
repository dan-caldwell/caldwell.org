import { useState } from "react";

const Table = ({
    headers: rawHeaders,
    rows: rawRows,
    headerSortKeys
}) => {
    const [headers, setHeaders] = useState(rawHeaders);
    const [rows, setRows] = useState(rawRows);

    const sortRows = (header: string, index: number) => {
        const rowValues = rows.map(row => row[index]);

        if (headerSortKeys[header]) {
            console.log({
                header,
                sorted: rowValues.sort((a, b) => {
                    return headerSortKeys[header](b) - headerSortKeys[header](a)
                })
            })
        }
    }

    return (
        <table className="bg-white border border-gray-300 text-xs">
            <thead>
                <tr
                    className="sticky top-0 bg-white table-header-sticky"
                >
                    {headers.map((header: string, index: number) => (
                        <th 
                            className="border-r border-gray-200 last:border-0 p-2"
                            onClick={() => sortRows(header, index)}
                            key={header}
                        >{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: string[]) => (
                    <tr 
                        className="border-b border-gray-200"
                        key={row.join('')}
                    >
                        {row.map((item: string, index) => (
                            <td
                                className="border-r p-2 last:border-0"
                                key={index}
                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                            />
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table;