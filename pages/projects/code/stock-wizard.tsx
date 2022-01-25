import Post from '../../[...slug]';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    return (
        <Post {...props}>
            <div>Hello</div>
        </Post>
    )
}

export default Index;