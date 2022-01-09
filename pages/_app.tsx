import PostProvider from '../components/context/PostContext';
import PageWithSidebar from '../components/templates/PageWithSidebar';
import '../styles/globals.css';

function App({ Component, pageProps }) {
    return (
        <PostProvider>
            <PageWithSidebar>
                <Component {...pageProps} />
            </PageWithSidebar>
        </PostProvider>
    )
}

export default App
