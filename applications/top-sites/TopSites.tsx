import { useEffect, useState } from 'react';
import clone from 'clone';
import Button from './components/Button';

export type Rank = {
    url: string;
    rank: number;
}

const searchUrl = `https://top-sites-list.s3.amazonaws.com/`;

const TopSites = () => {
    const [searchString, setSearchString] = useState('');
    const [rankingType, setRankingType] = useState<'page' | '1letter' | '2letter'>('page');
    const [currentPage, setCurrentPage] = useState(1);
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

    const handleListRankings = async (pageNum = 1) => {
        try {
            const res = await fetch(`${searchUrl}pages/${pageNum}.json`);
            const parsed = await res.json();
            setFullPageResults(parsed);
            setSearchResults(parsed);
            setRankingType('page');
        } catch (err) {
            console.error(err);
        }
    }

    const handleSearchClick = async (e: React.MouseEvent) => {

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
    }

    const handleClearSearch = () => {
        setSearchString('');
        setSearchResults(fullPageResults);
        setRankingType('page');
    }

    const handleFilterOnlyDomains = () => {
        setOnlyDomainsActive(oldValue => {
            if (oldValue) {
                setSearchResults(fullPageResults);
            } else {
                setSearchResults(oldResults => {
                    const newResults = clone(oldResults);
                    return newResults.filter((item: Rank) => {
                        const matches = item.url.match(/\./g);
                        if (!matches) return false;
                        if (matches.length === 1) return true;
                        return false;
                    })
                });
            }
            setRankingType('page');
            return !oldValue;
        });
    }

    const handleNavigatePage = async (direction: 'back' | 'forward') => {
        const newPageNum = direction === 'forward' ? currentPage + 1 : currentPage - 1;
        await handleListRankings(newPageNum);
        setCurrentPage(newPageNum);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        handleListRankings();
    }, []);

    return (
        <div className="TopSites bg-white">
            <div className="fixed bottom-0 xl:static xl:sticky xl:top-0 p-4 bg-white border-t xl:border-t-0 xl:border-b flex justify-between">
                <div className="flex">
                    <input className="border border-gray-300 p-2 rounded-lg text-sm h-8" type="text" value={searchString} onChange={handleSearchChange} />
                    <Button title="Search" onClick={handleSearchClick} className="ml-2" />
                    <Button title="Clear" onClick={handleClearSearch} className="ml-2" />
                    <Button title="Only Domains" onClick={handleFilterOnlyDomains} className="ml-2" />
                </div>
                <div className="flex items-center">
                    {rankingType === 'page' &&
                        <>
                            {currentPage > 1 &&
                                <Button title="Previous" onClick={() => handleNavigatePage('back')} className="ml-2" />
                            }
                            {currentPage < 1000 &&
                                <Button title="Next" onClick={() => handleNavigatePage('forward')} className="ml-2" />
                            }
                            <div className="ml-2">{currentPage} / {1000000 / 1000}</div>
                        </>
                    }
                </div>
            </div>
            <table className="w-full">
                <tbody>
                    {searchResults.map(({ rank, url }) => (
                        <tr key={url} className="border-b">
                            <td className="w-0 p-2 border-r">{rank}</td>
                            <td className="p-2 text-ellipsis max-w-0 overflow-hidden whitespace-nowrap">
                                <a className="text-blue-600 overflow-x-scroll whitespace-nowrap" href={`https://${url}`} target="_blank" rel="noopener noreferrer">{url}</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-row-reverse">
                <div 
                    className="cursor-pointer fixed bottom-0 p-2 bg-white border border-gray-200 m-4 shadow-md rounded-xl text-blue-600"
                    onClick={() => window.scrollTo(0, 0)}
                >Go to top ↑</div>
            </div>
        </div>
    )
}

export default TopSites;