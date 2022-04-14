import Post from '../../[...slug]';
import { getStaticMeta } from '../../../utils/next-page';
import Table from '../../../components/basic/Table';

export const getStaticProps = async () => await getStaticMeta(`blog/data/city-index`);

const Index = (props) => {

    const headers = (props?.importedFiles[0]?.body?.headers || []);
    const rows = props?.importedFiles[0]?.body?.rows || [];

    return (
        <Post {...props}>
            <Table
                headers={headers}
                rows={rows}
                headerSortKeys={{
                    'Rank': 'none',
                    'Population rank': 'int',
                    'City': 'alphabetical',
                    'State': 'alphabetical',
                    '2020 census': 'int',
                    '2010 census': 'int',
                    '2020 population density (mi)': 'int',
                    'US city crime percentile': 'int',
                    'Per capita income': 'int',
                    'Median rent': 'int',
                }}
            />
        </Post>
    )
}

export default Index;