const DataPointListItem = ({
    title,
    value
}) => {
    return (
        <div className="flex">
            <strong>&bull; {title}</strong>
            <span>&nbsp;- {value}</span>
        </div>
    )
}

export default DataPointListItem;