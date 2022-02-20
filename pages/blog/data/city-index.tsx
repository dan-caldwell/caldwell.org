import Post from '../../[...slug]';
import { getStaticMeta } from '../../../utils/next-page';
import Table from '../../../components/basic/Table';

export const getStaticProps = async () => await getStaticMeta(`blog/data/city-index`);

const Index = (props) => {

    const headers = props?.importedFiles[0]?.body?.headers || [];
    const rows = props?.importedFiles[0]?.body?.rows || [];

    return (
        <Post {...props}>
            <Table
                headers={headers}
                rows={rows}
                headerSortKeys={{
                    '2020 rank': 'int',
                    'City': 'alphabetical',
                    'State': 'alphabetical',
                    '2020 census': 'int',
                    '2010 census': 'int',
                    '2020 population density (mi)': 'int',
                    '2020 land area (mi)': 'float',
                    'Change': 'float'
                }}
            />
        </Post>
    )
}

export default Index;