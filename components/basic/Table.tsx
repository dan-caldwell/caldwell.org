import { useState } from "react";
import clone from 'clone';

const sortIcons = {
    asc: '↑',
    desc: '↓'
}

const sortParsers = {
    int: (value: string) => parseInt(value.replace(/[A-Za-z%,]/g, '').replace(/−/g, '-')) || 0,
    float: (value: string) => parseFloat(value.replace(/[A-Za-z%,]/g, '').replace(/−/g, '-')) || 0
}

const Table = ({
    headers: rawHeaders,
    rows: rawRows,
    headerSortKeys
}) => {
    const [headers, setHeaders] = useState(rawHeaders);
    const [rows, setRows] = useState(rawRows);
    const [sortBy, setSortBy] = useState({
        type: 'asc',
        index: 0
    });

    const sortRows = (header: string, index: number) => {

        if (headerSortKeys[header]) {
            const parseType = typeof headerSortKeys[header];
            if (parseType !== 'function' && !sortParsers[headerSortKeys[header]]) return;
            setRows((oldRows) => {
                const newRows = clone(oldRows);
                // Sort rows via the sort key function as defined in the props
                newRows.sort((a, b) => {
                    const larger = sortBy.type === 'asc' ? b : a;
                    const smaller = sortBy.type === 'asc' ? a : b;
                    if (parseType === 'function') return headerSortKeys[header](larger[index]) - headerSortKeys[header](smaller[index]);
                    return sortParsers[headerSortKeys[header]](larger[index]) - sortParsers[headerSortKeys[header]](smaller[index])
                });
                return newRows;
            });
            // Set the sorted state
            setSortBy(sortBy.type === 'asc' ?
                {
                    index,
                    type: 'desc'
                } :
                {
                    index,
                    type: 'asc'
                }
            );
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
                            className={`border-r border-gray-200 last:border-0 p-2 ${headerSortKeys[header] ? 'cursor-pointer': ''}`}
                            onClick={() => sortRows(header, index)}
                            key={header}
                        >{header} {sortBy.index === index ? sortIcons[sortBy.type] : ''}</th>
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