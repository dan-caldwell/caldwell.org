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
                    '2020 population density (mi)': (value: string) => parseInt(value.replace(/,/g, ''))
                }}
            />
        </Post>
    )
}

export default Index;