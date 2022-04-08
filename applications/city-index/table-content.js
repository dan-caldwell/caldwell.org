const censusSelector = censusId => `tr[data-mnemonic="${censusId}"] td[data-value]`;

const tableContent = {
    wikipedia: [
        {
            header: 'Population rank',
        },
        {
            header: 'City',
        },
        {
            header: 'State',
        },
        {
            header: '2020 census',
        },
        {
            header: '2010 census',
        },
        {
            header: 'Change',
        },
        {
            header: '2020 land area (mi)',
        },
        {
            header: '2020 population density (mi)',
        },
    ],
    crime: [
        {
            header: 'Violent crime (per 1000)',
            selector: '.crime-data-container table tr:nth-child(2) td:nth-child(2)'
        },
        {
            header: 'Property crime (per 1000)',
            selector: '.crime-data-container table tr:nth-child(2) td:nth-child(3)'
        },
        {
            header: 'US city crime percentile',
            selector: '.crime-data-container .score'
        },
    ],
    census: [
        {
            header: 'Per capita income',
            selector: censusSelector('INC910220')
        },
        {
            header: 'Median rent',
            selector: censusSelector('HSG860220')
        },
        {
            header: `Bachelor's degree holders`,
            selector: censusSelector('EDU685220')
        },
        {
            header: 'Avg. commute time (mins)',
            selector: censusSelector('LFE305220')
        },
        {
            header: 'Percent in poverty',
            selector: censusSelector('IPE120220')
        }
    ]
}

module.exports = tableContent;