import React, { useEffect, useState } from "react";
import DateHelper from './api/classes/DateHelper';
import DataPointListItem from './components/DataPointListItem';

const today = DateHelper.currentDate();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatObjectKeyTitle = (title: string) => {
    return (title.match(/[A-Z][a-z]+|[0-9-]+/g) || title.split(' '))
        .join(' ')
        .replace('Peg', 'Price/Earnings-to-Growth')
        .replace('Pe', 'Price/Earnings')
        .replace('Pb', 'Price/Book')
        .replace('Ps', 'Price/Sales')
        .replace('Current', '')
        .replace('Trailing', '');
}

const StockWizard = () => {
    const [dailyPick, setDailyPick] = useState({
        name: null,
        ticker: null,
        sector: null,
        sharesToBuy: null,
        date: null,
        sellOn: null
    });
    const [spyAverages, setSpyAverages] = useState({
        average: null,
        median: null
    });

    useEffect(() => {
        fetch(`https://s3.caldwell.org/stock-wizard/random_stock_picks/data/latest.json`)
            .then(res => res.json())
            .then(data => setDailyPick(data))
            .catch(err => {
                console.error(err);
                setDailyPick({
                    name: 'Tesla Inc.',
                    ticker: 'TSLA',
                    sector: 'Technology',
                    sharesToBuy: '50',
                    sellOn: today,
                    date: today
                })
            });
        fetch(`https://caldwell-apps.s3.amazonaws.com/stock-wizard/etf_averages/etfs/spy.json`)
            .then(res => res.json())
            .then(data => setSpyAverages(data))
            .catch(err => {
                console.error(err);
            });
    }, []);

    const sellOnObj = dailyPick.sellOn ? new Date(dailyPick.sellOn) : new Date();

    const currentAverages = Object.entries(spyAverages.average || {}).filter(item => item[0].includes('Current'));
    const disallowedKeys = ['Current', 'ID', 'Name', 'SEDOL', 'Weight', 'Shares Held'];
    const historicalAverages = Object.entries(spyAverages.average || {}).filter(item => {
        return !disallowedKeys.find(key => item[0].includes(key))
    });

    return (
        <>
            <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                <div className="underline mb-2">
                    Stock pick for {today}
                </div>
                {dailyPick.ticker ? (
                    <div>
                        You should buy <strong>{dailyPick.sharesToBuy} shares</strong> of <strong>{dailyPick.ticker}</strong> ({dailyPick.name}) and you should sell on <strong>{months[sellOnObj.getMonth()]} {sellOnObj.getDate()}, {sellOnObj.getFullYear()}</strong>.
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="bg-white border border-gray-300 rounded-lg p-4">
                <div className="underline mb-2">
                    S&P 500 averages for {today}
                </div>
                {spyAverages.average ? (
                    <>
                        <div className="border-b mb-2 border-gray-300">Current</div>
                        <div className="text-left flex flex-col text-md">
                            {currentAverages.map(([key, value]) => {
                                return <DataPointListItem
                                    title={formatObjectKeyTitle(key)}
                                    value={value}
                                    key={key}
                                />
                            })}
                        </div>
                        <div className="mt-4 mb-2 border-b border-gray-300">Historical</div>
                        <div className="text-left flex flex-col text-md">
                            {historicalAverages.map(([key, value]) => {
                                return <DataPointListItem
                                    title={formatObjectKeyTitle(key)}
                                    value={value}
                                    key={key}
                                />
                            })}
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default StockWizard;