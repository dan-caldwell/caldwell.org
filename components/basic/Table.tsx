import { useState } from "react";
import clone from 'clone';

const sortIcons = {
    asc: '↑',
    desc: '↓',
    updown: '↕'
}

const sortParsers = {
    int: (value: string) => parseInt(value.replace(/[A-Za-z%,$]/g, '').replace(/−/g, '-')) || 0,
    float: (value: string) => parseFloat(value.replace(/[A-Za-z%,$]/g, '').replace(/−/g, '-')) || 0,
    alphabetical: true
}

const Table = ({
    headers,
    rows: rawRows,
    headerSortKeys
}) => {
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
                    const larger = sortBy.type === 'asc' ? b[index] : a[index];
                    const smaller = sortBy.type === 'asc' ? a[index] : b[index];
                    if (parseType === 'function') return headerSortKeys[header](larger) - headerSortKeys[header](smaller);
                    if (headerSortKeys[header] === 'alphabetical') return larger.localeCompare(smaller);
                    return sortParsers[headerSortKeys[header]](larger) - sortParsers[headerSortKeys[header]](smaller)
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
                    {['Rank', ...headers].map((header: string, index: number) => {
                        // We added 'Rank' to the headers, so subtract that
                        const realIndex = index - 1;
                        const sortable = headerSortKeys[header];
                        const active = sortBy.index === realIndex;
                        return (
                            <td
                                className={`
                                    border-r border-gray-200 last:border-0 p-2
                                    ${sortable ? 'cursor-pointer' : ''}
                                `}
                                onClick={() => sortRows(header, realIndex)}
                                key={header}
                            >
                                <div
                                    className="flex justify-between items-center"
                                >
                                    <div>{header}</div>
                                    {sortable &&
                                        <div
                                            className={[
                                                'ml-2',
                                                active ? '' : 'text-gray-400',
                                            ].join(' ')}
                                        >{active ? sortIcons[sortBy.type] : sortIcons.updown}</div>
                                    }
                                </div>
                            </td>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: string[], rowIndex: number) => (
                    <tr
                        className={[
                            "border-b border-gray-200",
                            rowIndex % 2 !== 0 ? 'bg-gray-50' : ''
                        ].join(' ')}
                        key={row.join('')}
                    >
                        <td
                            className="border-r p-2 last:border-0"
                        >{rowIndex + 1}</td>
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