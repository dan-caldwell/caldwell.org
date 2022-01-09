type HeaderProps = {
    title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    return (
        <h1 className="text-3xl font-bold mb-4 leading-8 leading-none">{title}</h1>
    )
}

export default Header;