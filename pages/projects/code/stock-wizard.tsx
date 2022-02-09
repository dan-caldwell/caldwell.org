import StockWizard from '../../../applications/stock-wizard/StockWizard';
import Post from '../../[...slug]';
import { getStaticMeta } from '../../../utils/next-page';

export const getStaticProps = async () => await getStaticMeta(`projects/code/stock-wizard`);

const Index = (props) => {
    return (
        <Post {...props}>
            <div className="mb-4">Stock Wizard uses sophisticated technology to pick stocks you should buy for the day.</div>
            <StockWizard />
        </Post>
    )
}

export default Index;