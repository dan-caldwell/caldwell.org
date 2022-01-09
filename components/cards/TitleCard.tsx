const TitleCard = ({ title }) => {
    return (
        <div className="flex items-center justify-center bg-white width-full pt-16-9 relative">
            <div className="font-bold text-3xl absolute top-1/2 -translate-y-1/2">
                {title}
            </div>
        </div>
    )
}

export default TitleCard;