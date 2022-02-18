const Table = ({
    headers,
    rows
}) => {

    return (
        <table className="bg-white border border-gray-300 text-xs">
            <thead>
                <tr>
                    {headers.map((header: string) => (
                        <th className="border border-gray-300" key={header}>{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row: string[]) => (
                    <tr key={row.join('')}>
                        {row.map((item: string) => (
                            <td
                                key={item}
                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                            />
                        ))}
                    </tr>
                ))}
                <tr className="border-b border-gray-300">
                    <th className="border-r border-gray-300 p-2">City</th>
                    <th className="p-2">Crime level</th>
                </tr>
                <tr>
                    <td className="border-r border-gray-300 p-2">Houston</td>
                    <td className="p-2">1.25</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;