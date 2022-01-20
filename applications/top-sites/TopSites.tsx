import { useEffect, useState } from 'react';
import clone from 'clone';
import Button from './components/Button';
import { ArrowRight, Search } from '../../components/icons/icons';
import XButton from '../../components/basic/XButton';

export type Rank = {
    url: string;
    rank: number;
}

const searchUrl = `https://top-sites-list.s3.amazonaws.com/`;

const TopSites = () => {
    const [searchString, setSearchString] = useState('');
    const [rankingType, setRankingType] = useState<'page' | '1letter' | '2letter'>('page');
    const [currentPage, setCurrentPage] = useState<number | string>(1);
    const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
    const [singleLetterSearchPage, setSingleLetterSearchPage] = useState({
        letters: '',
        results: []
    });
    const [twoLetterSearchPage, setTwoLetterSearchPage] = useState({
        letters: '',
        results: []
    });
    const [fullPageResults, setFullPageResults] = useState<Rank[]>([]);
    const [searchResults, setSearchResults] = useState<Rank[]>([]);
    const [onlyDomainsActive, setOnlyDomainsActive] = useState(false);

    const handleSearchChange = async (e: React.SyntheticEvent) => {
        // Ensure acceptable key pressed
        const nativeEvent = e.nativeEvent as InputEvent;
        const keyPressed = nativeEvent.data || '';
        const acceptableChars = "abcdefghijklmnopqrstuvwxyz0123456789.-";
        if (!acceptableChars.includes(keyPressed)) return;
        const target = e.target as HTMLInputElement;
        setSearchString(target.value);
    }

    const handleSearchKeyPress = async (e: React.KeyboardEvent) => {
        // When we press "Enter", return search results
        const nativeEvent = e.nativeEvent;
        const keyPressed = nativeEvent.key || '';
        if (keyPressed === 'Enter') handleSearchClick();
    }

    const handleListRankings = async (pageNum = 1) => {
        try {
            const res = await fetch(`${searchUrl}pages/${pageNum}.json`);
            const parsed = await res.json();
            setFullPageResults(parsed);
            setSearchResults(() => {
                return onlyDomainsActive ? handleOnlyDomainsChange(parsed) : parsed;
            });
            setRankingType('page');
        } catch (err) {
            console.error(err);
        }
    }

    const handleSearchClick = async () => {

        if (!searchString) {
            await handleListRankings();
            return;
        }

        let parsedResults: Rank[] = [];
        if (searchString.length == 1 && singleLetterSearchPage.letters !== searchString[0]) {
            const res = await fetch(`${searchUrl}characters/${searchString}.json`);
            const parsed = await res.json();
            setSingleLetterSearchPage({
                letters: searchString,
                results: parsed
            });
            setRankingType('1letter');
            parsedResults = parsed;
        } else if (searchString.length > 1 && twoLetterSearchPage.letters !== searchString.slice(0, 2)) {
            const res = await fetch(`${searchUrl}characters/${searchString.slice(0, 2)}.json`);
            const parsed = await res.json();
            setTwoLetterSearchPage({
                letters: searchString.slice(0, 2),
                results: parsed
            });
            setRankingType('2letter');
            parsedResults = parsed;
        }
        if (singleLetterSearchPage.results.length && singleLetterSearchPage.letters === searchString[0]) parsedResults = singleLetterSearchPage.results;
        if (twoLetterSearchPage.results.length && twoLetterSearchPage.letters === searchString.slice(0, 2)) parsedResults = twoLetterSearchPage.results;
        setSearchResults(parsedResults.filter((item: Rank) => item.url.includes(searchString)));
        window.scrollTo(0, 0);
    }

    const handleClearSearch = () => {
        if (searchString) {
            window.scrollTo(0, 0);
        }
        setSearchString('');
        setSearchResults(() => {
            return onlyDomainsActive ? handleOnlyDomainsChange(fullPageResults) : fullPageResults;
        });
        setRankingType('page');
    }

    const handleOnlyDomainsChange = (oldResults: Rank[]) => {
        const newResults = clone(oldResults);
        return newResults.filter((item: Rank) => {
            const matches = item.url.match(/\./g);
            if (!matches) return false;
            if (matches.length === 1) return true;
            return false;
        });
    }

    const handleFilterOnlyDomains = () => {
        setOnlyDomainsActive(oldValue => {
            if (oldValue) {
                setSearchResults(fullPageResults);
            } else {
                setSearchResults(handleOnlyDomainsChange);
            }
            setRankingType('page');
            return !oldValue;
        });
    }

    const handleNavigatePage = async (direction?: 'back' | 'forward' | null, pageNum?: number) => {
        const newPageNum = pageNum || (direction === 'forward' ? Number(currentPage) + 1 : Number(currentPage) - 1);
        await handleListRankings(newPageNum);
        setCurrentPage(newPageNum);
        window.scrollTo(0, 0);
    }

    const handleGoToPage = async (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const value = Number(target.value || 0);
        if (value > 0 && value < 1001) {
            await handleNavigatePage(null, value);
        } else if (value === 0) {
            setCurrentPage('');
        }
    }

    const handleMobileSearchClick = () => {
        if (!mobileSearchOpen) {
            setMobileSearchOpen(true);
        } else {
            handleSearchClick();
        }
    }

    const handleMobileXButton = () => {
        setMobileSearchOpen(false);
        handleClearSearch();
    }

    useEffect(() => {
        handleListRankings();
    }, []);

    return (
        <div className="TopSites bg-white">
            <div className="fixed bottom-0 left-0 xl:static xl:sticky xl:top-0 p-4 bg-white border-t xl:border-t-0 xl:border-b flex justify-between w-full">
                <div className="flex items-center">
                    <div className="flex h-8 items-center">
                        <XButton
                            className={`w-5 h-5 mr-2 ${mobileSearchOpen ? '' : 'hidden'} xl:hidden`}
                            onClick={handleMobileXButton}
                        />
                        <input
                            className={`border border-gray-300 p-2 rounded-lg text-sm h-8 xl:flex ${mobileSearchOpen ? '' : 'hidden'}`}
                            type="text"
                            value={searchString}
                            onChange={handleSearchChange}
                            onKeyPress={handleSearchKeyPress}
                        />
                        <div
                            className={`w-5 h-5 xl:hidden ${mobileSearchOpen ? 'hidden' : ''}`}
                            onClick={handleMobileSearchClick}
                        >
                            <Search />
                        </div>
                    </div>
                    <Button
                        title="Search"
                        onClick={handleSearchClick}
                        className={`ml-2 xl:flex ${mobileSearchOpen ? '' : 'hidden'}`}
                        disabled={!searchString}
                    />
                    <Button
                        title="Clear"
                        onClick={handleClearSearch}
                        className={`ml-2 hidden xl:flex`}
                        disabled={!searchString}
                    />
                    <Button
                        title={`Only Domains ${onlyDomainsActive ? '✓' : ''}`}
                        onClick={handleFilterOnlyDomains}
                        className={`
                            ml-2 ${searchString ? 'hidden' : (mobileSearchOpen ? 'hidden xl:flex' : '')}
                        `}
                    />
                </div>
                <div className="flex items-center">
                    {rankingType === 'page' &&
                        <>
                            {currentPage > 1 &&
                                <Button title="←" onClick={() => handleNavigatePage('back')} className={`ml-2 ${mobileSearchOpen ? 'hidden' : ''} xl:flex`} />
                            }
                            <div className={`ml-2 text-center whitespace-nowrap text-xs ${mobileSearchOpen ? 'hidden' : ''} xl:inline-block`}>
                                pg. <input className="w-8 border border-gray-300 rounded" type="number" value={currentPage} onChange={handleGoToPage} />
                            </div>
                            {currentPage < 1000 &&
                                <Button title="→" onClick={() => handleNavigatePage('forward')} className={`ml-2 ${mobileSearchOpen ? 'hidden' : ''} xl:flex`} />
                            }
                        </>
                    }
                </div>
            </div>
            <ResultsTable results={searchResults} />
            <GoToTop />
        </div>
    )
}

export default TopSites;

const ResultsTable = ({ results }) => (
    <table className="w-full">
        <tbody>
            {!results.length &&
                <tr>
                    <td className="p-2">No Results found</td>
                </tr>
            }
            {results.map(({ rank, url }) => (
                <tr key={url} className="border-b">
                    <td className="w-1 p-2 border-r">{rank}</td>
                    <td className="max-w-0 p-2 text-ellipsis overflow-hidden whitespace-nowrap">
                        <a className="text-blue-600 overflow-x-scroll whitespace-nowrap" href={`https://${url}`} target="_blank" rel="noopener noreferrer">{url}</a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)

const GoToTop = () => (
    <div className="xl:flex flex-row-reverse hidden">
        <div
            className="cursor-pointer fixed bottom-0 p-2 bg-white border border-gray-200 m-4 shadow-md rounded-xl text-blue-600"
            onClick={() => window.scrollTo(0, 0)}
        >Go to top ↑</div>
    </div>
)