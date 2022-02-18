import Post from '../../[...slug]';
import { getStaticMeta } from '../../../utils/next-page';
import Table from '../../../components/basic/Table';

export const getStaticProps = async () => await getStaticMeta(`blog/data/city-index`);

const Index = (props) => {

    const headers = props?.importedFiles[0]?.body?.headers || [];
    const rows = props?.importedFiles[0]?.body?.rows || [];

    return (
        <Post {...props}>
            City Index
            <Table 
                headers={headers}
                rows={rows}
            />
        </Post>
    )
}

export default Index;