type ContentContainerProps = {
    children: React.ReactNode,
    className?: string,
    layout?: 'scroll' | 'fixed',
}

const ContentContainer: React.FC<ContentContainerProps> = ({ children, className = '', layout = 'fixed' }) => {

    const layoutClassName = [
        layout === 'fixed' ? 'h-screen-fix' : '',
    ].join(' ');

    return (
        <div className={`ContentContainer flex flex-col mx-auto py-8 w-container ${layoutClassName} ${className}`}>
            {children}
        </div>
    )
}

export default ContentContainer;