type ButtonProps = {
    title?: string,
    onClick: (e: React.MouseEvent) => void,
    className?: string
    children?: React.ReactChild,
    disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
    title = '',
    className = '',
    children,
    onClick = () => undefined,
    disabled = false
}) => {
    return (
        <button 
            className={`h-8 leading-4 ${disabled ? `bg-gray-300` : `bg-blue-500 hover:bg-blue-600`} text-white rounded-lg p-2 text-sm hover:shadow-sm transition-all ${className}`} 
            onClick={onClick}
            disabled={disabled}
        >{children || title}</button>
    )
}

export default Button;