const stateToAbbrev = {
    Alabama: 'al',
    Alaska: 'ak',
    Arizona: 'az',
    Arkansas: 'ar',
    California: 'ca',
    Colorado: 'co',
    Connecticut: 'ct',
    Delaware: 'de',
    'District of Columbia': 'dc',
    Florida: 'fl',
    Georgia: 'ga',
    Hawaii: 'hi',
    Idaho: 'id',
    Illinois: 'il',
    Indiana: 'in',
    Iowa: 'ia',
    Kansas: 'ks',
    Kentucky: 'ky',
    Louisiana: 'la',
    Maine: 'me',
    Maryland: 'md',
    Massachusetts: 'ma',
    Michigan: 'mi',
    Minnesota: 'mn',
    Mississippi: 'ms',
    Missouri: 'mo',
    Montana: 'mt',
    Nebraska: 'ne',
    Nevada: 'nv',
    'New Hampshire': 'nh',
    'New Jersey': 'nj',
    'New Mexico': 'nm',
    'New York': 'ny',
    'North Carolina': 'nc',
    'North Dakota': 'nd',
    Ohio: 'oh',
    Oklahoma: 'ok',
    Oregon: 'or',
    Pennsylvania: 'pa',
    'Rhode Island': 'ri',
    'South Carolina': 'sc',
    'South Dakota': 'sd',
    Tennessee: 'tn',
    Texas: 'tx',
    Utah: 'ut',
    Vermont: 'vt',
    Virginia: 'va',
    Washington: 'wa',
    'West Virginia': 'wv',
    Wisconsin: 'wi',
    Wyoming: 'wy',
}

const wikiToScoutNames = {
    'Saint Paul': 'St. Paul'
}

const wikiToCensusNames = {
    'Nashville_TN': 'nashvilledavidsonmetropolitangovernmentbalancetennessee',
    'Indianapolis_IN': 'indianapoliscitybalanceindiana',
    'Honolulu_HI': 'honolulucountyhawaii',
    'Lexington_KY': 'lexingtonfayetteurbancountykentucky',
    'Anchorage_AK': 'anchoragemunicipalityalaska',
    'Gilbert_AZ': 'gilberttownarizona',
    'Boise_ID': 'boisecitycityidaho',
    'Augusta_GA': 'augustarichmondcountyconsolidatedgovernmentbalancegeorgia',
    'Cary_NC': 'carytownnorthcarolina',
    'Macon_GA': 'maconbibbcountygeorgia',
    'Lakewood_NJ': 'lakewoodtownshipoceancountynewjersey',
    'Athens_GA': 'athensclarkecountyunifiedgovernmentbalancegeorgia',
    'Ventura_CA': 'venturacountycalifornia',
    'Edison_NJ': 'edisontownshipmiddlesexcountynewjersey',
    'Davie_FL': 'davietownflorida',
    'Woodbridge_NJ': 'woodbridgetownshipmiddlesexcountynewjersey',
    'Clinton_MI': 'clintonchartertownshipmacombcountymichigan',
    'Louisville_KY': 'louisvillejeffersoncountymetrogovernmentbalancekentucky'
}

const censusFactIds = {
    per_capita_income: 'INC910219',
    median_rent: 'HSG860219',
    percent_with_bachelors: 'EDU685219'
}

module.exports = {
    stateToAbbrev,
    wikiToScoutNames,
    wikiToCensusNames,
    censusFactIds
}