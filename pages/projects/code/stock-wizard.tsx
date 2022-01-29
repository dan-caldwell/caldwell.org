import StockWizard from '../../../applications/stock-wizard/StockWizard';
import Post from '../../[...slug]';
export { getStaticProps } from '../../../utils/next-page';

const Index = (props) => {
    return (
        <Post {...props}>
            <div className="mb-4">Stock Wizard uses sophisticated technology to pick stocks you should buy for the day.</div>
            <StockWizard />
        </Post>
    )
}

export default Index;