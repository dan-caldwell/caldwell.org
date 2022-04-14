const stripNewlines = string => string?.replace(/\n/g, '');

const getValueByCensusId = (document, censusId) => cleanSelection(document, censusSelector(censusId));

// Create a cleaned text selection from a selector
const cleanSelection = (document, selector) => {
    return (stripNewlines(
        document.querySelector(selector)?.innerText
    ) || 'N/A').replace(/&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/ig, '');
}

const createHeadersFromTableContent = tableContent => Object.values(tableContent).flat().map(item => item.header);

const getDataFromTableContent = (document, tableContentArray) => {
    const output = [];
    for (const contentItem of tableContentArray) {
        output.push(cleanSelection(document, contentItem.selector));
    }
    return output;
}

const censusSelector = censusId => `tr[data-mnemonic="${censusId}"] td[data-value]`;

module.exports = {
    stripNewlines,
    getValueByCensusId,
    cleanSelection,
    censusSelector,
    createHeadersFromTableContent,
    getDataFromTableContent,
}