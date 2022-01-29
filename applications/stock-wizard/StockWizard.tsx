import { useEffect, useState } from "react";
import DataTransformer from './api/classes/DataTransformer';

const url = `https://d36rde6efmkp8.cloudfront.net`;
const today = DataTransformer.currentDate();

const StockWizard = () => {
    const [dailyPick, setDailyPick] = useState({
        name: null,
        ticker: null,
        sector: null,
        sharesToBuy: null,
        date: null
    });

    useEffect(() => {
        fetch(`${url}/random_stock_picks/data/latest.json`)
            .then(res => res.json())
            .then(data => setDailyPick(data))
            .catch(err => {
                console.error(err);
                setDailyPick({
                    name: 'Tesla Inc.',
                    ticker: 'TSLA',
                    sector: 'Technology',
                    sharesToBuy: '50',
                    date: today
                })
            });
    }, []);

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-4 text-center">
            <div className="italic mb-2">
                Stock pick for {today}
            </div>
            {dailyPick.ticker ? (
                <div>
                    You should buy <strong>{dailyPick.sharesToBuy} shares</strong> of <strong>{dailyPick.ticker}</strong> ({dailyPick.name}).
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default StockWizard;