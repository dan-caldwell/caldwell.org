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

    const handleListRankings = async () => {
        const res = await fetch(`${searchUrl}pages/1.json`);
        const parsed = await res.json();
        setFullPageResults(parsed);
        setSearchResults(parsed);
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
            parsedResults = parsed;
        } else if (searchString.length > 1 && twoLetterSearchPage.letters !== searchString.slice(0, 2)) {
            const res = await fetch(`${searchUrl}characters/${searchString.slice(0, 2)}.json`);
            const parsed = await res.json();
            setTwoLetterSearchPage({
                letters: searchString.slice(0, 2),
                results: parsed
            });
            parsedResults = parsed;
        }
        if (singleLetterSearchPage.results.length && singleLetterSearchPage.letters === searchString[0]) parsedResults = singleLetterSearchPage.results;
        if (twoLetterSearchPage.results.length && twoLetterSearchPage.letters === searchString.slice(0, 2)) parsedResults = twoLetterSearchPage.results;
        setSearchResults(parsedResults.filter((item: Rank) => item.url.includes(searchString)));
    }

    const handleClearSearch = () => {
        setSearchString('');
        setSearchResults(fullPageResults);
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
            return !oldValue;
        });
    }

    useEffect(() => {
        handleListRankings();
    }, []);

    return (
        <div className="Search bg-white">
            <div className="sticky top-0 p-4 bg-white border-b">
                <input className="border border-gray-300 p-2 rounded-lg text-sm h-8" type="text" value={searchString} onChange={handleSearchChange} />
                <Button title="Search" onClick={handleSearchClick} className="ml-2" />
                <Button title="Clear" onClick={handleClearSearch} className="ml-2" />
                <Button title="Only Domains" onClick={handleFilterOnlyDomains} className="ml-2" />
            </div>
            <div className="flex">
                <div className="flex flex-col border-r">
                    {searchResults.map(({ rank }) => (
                        <div key={rank} className="p-2 border-b">{rank}</div>
                    ))}
                </div>
                <div className="flex flex-col flex-grow overflow-hidden">
                    {searchResults.map(({ url }) => (
                        <div key={url} className="p-2 border-b">
                            <a className="text-blue-600 overflow-x-scroll whitespace-nowrap" href={`https://${url}`} target="_blank" rel="noopener noreferrer">{url}</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopSites;