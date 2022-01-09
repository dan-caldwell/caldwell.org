type ContainerCardProps = {
    children: React.ReactNode,
    className?: string
}

const ContainerCard: React.FC<ContainerCardProps> = ({ children, className = '' }) => {
    return (
        <div className={`mx-auto w-200 flex flex-col ${className}`}>
            {children}
        </div>
    )
}
export default ContainerCard;