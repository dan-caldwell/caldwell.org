import React from "react";

const CenteredStandardContainer: React.FC<{
    children: React.ReactNode | React.ReactNode[];
    className?: string;
}> = ({ children, className }) => {
    return (
        <div className={`CenteredStandardContainer mx-auto w-container my-8 ${className || ''}`}>
            {children}
        </div>
    )    
}

export default CenteredStandardContainer;