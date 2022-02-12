import React, { useEffect, useState } from "react";
import DateHelper from './api/classes/DateHelper';
import DataPointListItem from './components/DataPointListItem';

const today = DateHelper.currentDate();
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
                    <div className="text-left flex flex-col text-md">
                        <DataPointListItem
                            title="P/E ratio"
                            value={spyAverages.average.PriceToEarningsRatio}
                        />
                        <DataPointListItem
                            title="Yield"
                            value={spyAverages.average.Yield}
                        />
                        <DataPointListItem
                            title="% of float shorted"
                            value={spyAverages.average.PercentOfFloatShorted}
                        />
                        <DataPointListItem
                            title="Annualized dividend"
                            value={spyAverages.average.AnnualizedDividend}
                        />
                        <DataPointListItem
                            title="Estimated P/E next year"
                            value={spyAverages.average.EstimatedPriceToEarningsRatioNextYear}
                        />
                        <DataPointListItem
                            title="Sales per employee"
                            value={spyAverages.average.SalesPerEmployee}
                        />
                        <DataPointListItem
                            title="Beta"
                            value={spyAverages.average.Beta}
                        />
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </>
    )
}

export default StockWizard;