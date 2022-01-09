import YouTube from "react-youtube";

const YouTubeWrap = ({ videoId = '' }) => {
    return <YouTube 
        videoId={videoId}
        containerClassName="flex-grow max-h-frame" 
    />
}

export default YouTubeWrap;