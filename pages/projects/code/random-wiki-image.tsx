import { useState } from 'react';
import Post from '../../[...slug]';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    const [img, setImg] = useState({
        src: null,
        title: null
    });

    const handleClick = async () => {
        const res = await fetch('https://ktcplj5z4d.execute-api.us-east-1.amazonaws.com/prod/get_image');
        const parsed = await res.json();
        setImg(parsed);
    }

    return (
        <Post {...props}>
            <div>
                <div className="pb-2">
                    <button onClick={handleClick} className="hover:bg-blue-600 bg-blue-500 p-2 rounded-xl text-white">Get image</button>
                </div>
                {img.src &&
                    <>
                        <h2>{img.title}</h2>
                        <img src={img.src} />
                    </>
                }
            </div>
        </Post>
    )
}

export default Index;