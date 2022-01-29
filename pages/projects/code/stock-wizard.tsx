import StockWizard from '../../../applications/stock-wizard/StockWizard';
import Post from '../../[...slug]';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    return (
        <Post {...props}>
            <StockWizard />
        </Post>
    )
}

export default Index;