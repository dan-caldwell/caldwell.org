import { useEffect, useState } from "react";
import DataTransformer from './api/classes/DataTransformer';

const url = `https://d36rde6efmkp8.cloudfront.net`;

const StockWizard = () => {
    const [dailyPick, setDailyPick] = useState({
        name: null,
        ticker: null,
        sector: null,
        sharesToBuy: null,
        date: null
    });

    useEffect(() => {
        const today = DataTransformer.currentDate();
        fetch(`${url}/random_stock_picks/days/${today}.json`)
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
        <div>
            {dailyPick.ticker ? (
                <div>
                    You should buy {dailyPick.sharesToBuy} shares of {dailyPick.ticker} ({dailyPick.name})
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export default StockWizard;