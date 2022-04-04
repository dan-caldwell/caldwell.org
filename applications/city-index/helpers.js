const stripNewlines = string => string?.replace(/\n/g, '');

const getValueByCensusId = (document, censusId) => {
    return stripNewlines(document.querySelector(
        `tr[data-mnemonic="${censusId}"] td[data-value]`
    )?.innerText || 'N/A');
}

module.exports = {
    stripNewlines,
    getValueByCensusId
}