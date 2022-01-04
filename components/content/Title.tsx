const Title: React.FC<{
    title: string;
}> = ({ title }) => {
    return (
        <h1 className="text-3xl mb-4">{title}</h1>
    )
}

export default Title;