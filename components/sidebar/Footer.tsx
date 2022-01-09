const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="hidden xl:flex items-center text-gray-400 p-4 text-xs border-t border-gray-300">© {year} Caldwell.org</div>
    )
}

export default Footer;