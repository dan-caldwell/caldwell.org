import React from "react";
import CenteredStandardContainer from "./CenteredStandardContainer";
import Title from "../content/Title";

const StandardWithTitle: React.FC<{
    title: string;
    className?: string;
    children: React.ReactNode | React.ReactNode[]
}> = ({ title, children, className }) => {
    return (
        <CenteredStandardContainer className={className}>
            <Title title={title} />
            <div>
                {children}
            </div>
        </CenteredStandardContainer>
    )
}

export default StandardWithTitle;