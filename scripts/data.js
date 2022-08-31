DATA = (()=>{
    const _CONTINENTS = { 	
        Africa: {
            Algeria: {colors: ["0, 99, 49", "247, 247, 247"], abbreviation: "ALG"},
            Angola: {colors: ["255, 0, 0", "0, 0, 0", "255, 255, 0"], abbreviation: "ANG"},
            Benin: {colors: ["247, 244, 9", "35, 158, 70", "190, 0, 39"], abbreviation: "BNN"},
            Botswana: {colors: ["110, 184, 237"], abbreviation: "BWA"},
            "Burkina Faso": {colors: ["35, 158, 70", "190, 0, 39"], abbreviation: "BKF"},
            Burundi: {colors: ["35, 158, 70", "190, 0, 39"], abbreviation: "BUR"},
            Cameroon: {colors: ["32, 145, 13", "239, 8, 0", "232, 197, 0"], abbreviation: "CMR"},
            "Cape Verde": {colors: ["59, 90, 163"], abbreviation: "CPV"},
            "Central African Republic": {colors: ["59, 90, 163"], abbreviation: "CAR"},
            Chad: {colors: ["0, 61, 123", "225, 221, 21", "226, 60, 57"], abbreviation: "CHD"},
            Comoros: {colors: ["35, 158, 70"], abbreviation: "CMS"},
            Congo: {colors: ["35, 158, 70", "247, 244, 9", "190, 0, 39"], abbreviation: "CNG"},
            "Congo DR": {colors: ["0, 174, 239", "210, 35, 42"], abbreviation: "CDR"},
            "Cote d Ivoire": {colors: ["255, 166, 0"], abbreviation: "CIV"},
            Djibouti: {colors: ["113, 144, 200", "45, 153, 69"], abbreviation: "DJI"},
            Egypt: {colors: ["190, 0, 39", "255, 255, 255", "0, 0, 0"], abbreviation: "EGY"},
            "Equatorial Guinea": {colors: ["204, 14, 25"], abbreviation: "EQG"},
            Eritrea: {colors: ["255, 255, 255", "190, 0, 39", "35, 158, 70", "180, 215, 244"], abbreviation: "ERI"},
            Ethiopia: {colors: ["0, 135, 34", "249, 251, 0", "251, 0, 0"], abbreviation: "ETP"},
            Gabon: {colors: ["253, 253, 0"], abbreviation: "GBN"},
            Gambia: {colors: ["253, 0, 0"], abbreviation: "GMB"},
            Ghana: {colors: ["247, 244, 9", "35, 158, 70", "190, 0, 39"], abbreviation: "GHN"},
            Guinea: {colors: ["253, 0, 0", "0, 130, 53", "240, 251, 0"], abbreviation: "GUI"},
            "Guinea Bissau": {colors: ["206, 17, 38"], abbreviation: "GBS"},
            Kenya: {colors: ["200, 0, 35"], abbreviation: "KNY"},
            Lesotho: {colors: ["255, 255, 255", "0, 51, 153", "0, 153, 51"], abbreviation: "LST"},
            Liberia: {colors: ["255, 10, 0", "255, 255, 255", "48, 58, 190"], abbreviation: "LIB"},
            Libya: {colors: ["231, 0, 19"], abbreviation: "LBY"},
            Madagascar: {colors: ["22, 174, 12", "239, 28, 0", "255, 255, 255"], abbreviation: "MDG"},
            Malawi: {colors: ["232, 27, 0", "48, 163, 0", "0, 0, 0"], abbreviation: "MWI"},
            Mali: {colors: ["56, 155, 32", "255, 241, 0", "247, 9, 0"], abbreviation: "MLI"},
            Mauritania: {colors: ["64, 154, 22", "250, 230, 0"], abbreviation: "MRT"},
            Mauritius: {colors: ["232, 1, 0"], abbreviation: "MRS"},
            Morocco: {colors: ["190, 0, 39", "32, 149, 65"], abbreviation: "MRC"},
            Mozambique: {colors: ["190, 0, 39","0, 0, 0"], abbreviation: "MZB"},
            Namibia: {colors: ["190, 0, 39"], abbreviation: "NMB"},
            Niger: {colors: ["254, 114, 17", "86, 180, 15"], abbreviation: "NGR"},
            Nigeria: {colors: ["255, 255, 255", "0, 170, 95"], abbreviation: "NGR"},
            Rwanda: {colors: ["251, 227, 29", "0, 160, 217"], abbreviation: "RWA"},
            "Sao Tome and Principe": {colors: ["247, 244, 9", "35, 158, 70"], abbreviation: "STP"},
            Senegal: {colors: ["255, 255, 255", "63, 174, 27", "255, 255, 0", "240, 28, 0"], abbreviation: "SGL"},
            Seychelles: {colors: ["255, 0, 0"], abbreviation: "SCH"},
            "Sierra Leone": {colors: ["0, 0, 255"], abbreviation: "SRL"},
            "South Africa": {colors: ["247, 244, 9", "35, 158, 70"], abbreviation: "SAF"},
            "South Sudan": {colors: ["255, 255, 255", "0, 153, 51", "0, 51, 153", "204, 0, 51"], abbreviation: "SSU"},
            Sudan: {colors: ["190, 0, 39"], abbreviation: "SDN"},
            Swaziland: {colors: ["0, 0, 255"], abbreviation: "SWZ"},
            Tanzania: {colors: ["0, 0, 0", "0, 136, 55", "255, 255, 0", "83, 126, 173"], abbreviation: "TNZ"},
            Togo: {colors: ["247, 244, 9", "190, 0, 39"], abbreviation: "TGO"},
            Tunisia: {colors: ["190, 0, 39"], abbreviation: "TNS"},
            Uganda: {colors: ["238, 41, 0", "1, 1, 1", "255, 255, 1"], abbreviation: "UGA"},
            Zambia: {colors: ["35, 158, 70"], abbreviation: "ZMB"},
            Zimbabwe: {colors: ["247, 244, 9", "190, 0, 39", "0, 0, 0", "35, 158, 70"], abbreviation: "ZBW"}
        },
        Asia: {
            Afghanistan: {colors: ["171, 1, 35"], abbreviation: "AFG"},
            Bahrain: {colors: ["194, 4, 17"], abbreviation: "BAH"},
            Bangladesh: {colors: ["5, 122, 44", "233, 40, 31"], abbreviation: "BNG"},
            Bhutan: {colors: ["245, 105, 83", "235, 215, 103"], abbreviation: "BHU"},
            "Brunei Darussalam": {colors: ["239, 240, 79", "0, 0, 0"], abbreviation: "BRD"},
            Cambodia: {colors: ["45, 47, 141", "234, 31, 46"], abbreviation: "CMB"},
            "China PR": {colors: ["234, 45, 45", "241, 236, 88"], abbreviation: "CHI"},
            "Chinese Taipei": {colors: ["78, 111, 203"], abbreviation: "CHT"},
            Guam: {colors: ["57, 110, 242", "255, 255, 255"], abbreviation: "GUA"},
            "Hong Kong": {colors: ["196, 30, 45"], abbreviation: "HKG"},
            India: {colors: ["28, 80, 201", "226, 74, 72"], abbreviation: "IND"},
            Indonesia: {colors: ["217, 7, 30"], abbreviation: "IND"},
            Iran: {colors: ["255, 255, 255"], abbreviation: "IRN"},
            Iraq: {colors: ["6, 116, 78", "255, 255, 255"], abbreviation: "IRQ"},
            Japan: {colors: ["22, 33, 59"], abbreviation: "JPN"},
            Jordan: {colors: ["255, 255, 255"], abbreviation: "JRD"},
            "Korea DPR": {colors: ["242, 44, 57", "255, 255, 255"], abbreviation: "NKR"},
            "Korea Republic": {colors: ["223, 34, 38", "0, 0, 0"], abbreviation: "KOR"},
            Kuwait: {colors: ["50, 109, 239"], abbreviation: "KUW"},
            Kyrgyzstan: {colors: ["227, 37, 51"], abbreviation: "KYZ"},
            Laos: {colors: ["238, 46, 54", "48, 72, 156"], abbreviation: "LAO"},
            Lebanon: {colors: ["231, 7, 16"], abbreviation: "LBN"},
            Macau: {colors: ["2, 161, 111", "255, 255, 255"], abbreviation: "MAC"},
            Malaysia: {colors: ["238, 232, 49", "0, 0, 0"], abbreviation: "MLY"},
            Maldives: {colors: ["195, 39, 48", "0, 147, 72"], abbreviation: "MDV"},
            Mongolia: {colors: ["13, 73, 169", "255, 255, 255", "242, 6, 16"], abbreviation: "MGL"},
            Myanmar: {colors: ["237, 57, 64"], abbreviation: "MMR"},
            Nepal: {colors: ["182, 9, 3"], abbreviation: "NPL"},
            "Northern Mariana Islands": {colors: ["125, 158, 217", "20, 30, 51"], abbreviation: "NMI"},
            Oman: {colors: ["195, 7, 31"], abbreviation: "OMA"},
            Pakistan: {colors: ["255, 255, 255", "46, 59, 34"], abbreviation: "PAK"},
            Palestine: {colors: ["239, 2, 31", "24, 103, 69"], abbreviation: "PAL"},
            Philippines: {colors: ["255, 255, 255"], abbreviation: "PHI"},
            Qatar: {colors: ["146, 52, 70"], abbreviation: "QTR"},
            "Saudi Arabia": {colors: ["19, 93, 32", "255, 255, 255"], abbreviation: "SAU"},
            Singapore: {colors: ["239, 32, 43"], abbreviation: "SGP"},
            "Sri Lanka": {colors: ["247, 208, 98", "2, 117, 214"], abbreviation: "SRI"},
            Syria: {colors: ["215, 25, 48"], abbreviation: "SYR"},
            Tajikistan: {colors: ["235, 20, 56"], abbreviation: "TJK"},
            Thailand: {colors: ["13, 27, 58"], abbreviation: "THA"},
            Turkmenistan: {colors: ["5, 97, 31", "255, 255, 255"], abbreviation: "TKM"},
            "United Arab Emirates": {colors: ["255, 255, 255", "196, 27, 50"], abbreviation: "UAE"},
            Uzbekistan: {colors: ["3, 32, 170", "255, 255, 255"], abbreviation: "UZB"},
            Vietnam: {colors: ["168, 19, 30", "233, 190, 76"], abbreviation: "VIE"},
            Yemen: {colors: ["228, 19, 47", "255, 255, 255", "0, 0, 0"], abbreviation: "YMN"}
        },
        Europe: {
            Albania: {colors: ["222, 26, 35", "0, 0, 0"], abbreviation: "ALB"},
            Andorra: {colors: ["165, 20, 26"], abbreviation: "AND"},
            Armenia: {colors: ["187, 4, 21"], abbreviation: "ARM"},
            Austria: {colors: ["201, 7, 42", "255, 255, 255"], abbreviation: "AUS"},
            Azerbaijan: {colors: ["52, 78, 184", "255, 255, 255"], abbreviation: "AZB"},
            Belarus: {colors: ["207, 16, 26"], abbreviation: "BLR"},
            Belgium: {colors: ["239, 48, 62", "253, 219, 32"], abbreviation: "BEL"},
            "Bosnia and Herzegovina": {colors: ["0, 30, 150"], abbreviation: "BHZ"},
            Bulgaria: {colors: ["255, 255, 255", "0, 151, 110", "215, 33, 10"], abbreviation: "BUL"},
            Croatia: {colors: ["255, 0, 0", "255, 255, 255"], abbreviation: "CRO"},
            Cyprus: {colors: ["44, 54, 200"], abbreviation: "CYP"},
            "Czech Republic": {colors: ["216, 12, 19", "8, 67, 127"], abbreviation: "CZR"},
            Denmark: {colors: ["201, 7, 42", "255, 255, 255"], abbreviation: "DMK"},
            England: {colors: ["255, 255, 255"], abbreviation: "ENG"},
            Estonia: {colors: ["0, 115, 207"], abbreviation: "EST"},
            "Faroe Islands": {colors: ["9, 69, 159"], abbreviation: "FRI"},
            Finland: {colors: ["255, 255, 255", "0, 43, 108"], abbreviation: "FIN"},
            France: {colors: ["0, 33, 83"], abbreviation: "FRA"},
            Georgia: {colors: ["255, 255, 255", "255, 0, 0"], abbreviation: "GRG"},
            Germany: {colors: ["255, 255, 255"], abbreviation: "GER"},
            Gibraltar: {colors: ["255, 0, 0"], abbreviation: "GIB"},
            Greece: {colors: ["5, 94, 177"], abbreviation: "GRE"},
            Hungary: {colors: ["207, 36, 54"], abbreviation: "HUN"},
            Iceland: {colors: ["0, 81, 157"], abbreviation: "ICE"},
            Ireland: {colors: ["6, 94, 52"], abbreviation: "IRE"},
            Israel: {colors: ["18, 116, 179"], abbreviation: "ISR"},
            Italy: {colors: ["2, 18, 48"], abbreviation: "ITA"},
            Kazakhstan: {colors: ["254, 198, 4", "0, 177, 203"], abbreviation: "KZK"},
            Kosovo: {colors: ["41, 71, 149"], abbreviation: "KSV"},
            Latvia: {colors: ["159, 44, 54"], abbreviation: "LTV"},
            Liechtenstein: {colors: ["19, 71, 189", "231, 6, 33"], abbreviation: "LCH"},
            Lithuania: {colors: ["253, 186, 11", "0, 106, 66"], abbreviation: "LIT"},
            Luxembourg: {colors: ["207, 9, 33"], abbreviation: "LUX"},
            Malta: {colors: ["208, 12, 39"], abbreviation: "MLT"},
            Moldova: {colors: ["0, 68, 176"], abbreviation: "MDV"},
            Montenegro: {colors: ["228, 1, 11", "228, 151, 24"], abbreviation: "MON"},
            Netherlands: {colors: ["241, 88, 11"], abbreviation: "NED"},
            "Northern Ireland": {colors: ["17, 91, 45"], abbreviation: "NIR"},
            "North Macedonia": {colors: ["244, 34, 47"], abbreviation: "NMC"},
            Norway: {colors: ["186, 12, 47"], abbreviation: "NOR"},
            Poland: {colors: ["255, 255, 255", "221, 12, 57"], abbreviation: "POL"},
            Portugal: {colors: ["255, 0, 0", "0, 102, 0"], abbreviation: "POR"},
            Romania: {colors: ["252, 210, 15"], abbreviation: "ROM"},
            Russia: {colors: ["225, 7, 7", "255, 255, 255"], abbreviation: "RUS"},
            "San Marino": {colors: ["94, 183, 229"], abbreviation: "SMR"},
            Scotland: {colors: ["35, 39, 65"], abbreviation: "SCO"},
            Serbia: {colors: ["255, 0, 0"], abbreviation: "SER"},
            Slovakia: {colors: ["3, 77, 163"], abbreviation: "SVK"},
            Slovenia: {colors: ["195, 217, 231", "5, 124, 178", "255, 255, 255"], abbreviation: "SVN"},
            Spain: {colors: ["174, 13, 18", "250, 190, 0"], abbreviation: "SPA"},
            Sweden: {colors: ["254, 204, 0"], abbreviation: "SWE"},
            Switzerland: {colors: ["255, 0, 0", "255, 255, 255"], abbreviation: "SWZ"},
            Turkey: {colors: ["255, 255, 255", "228, 3, 16"], abbreviation: "TKY"},
            Ukraine: {colors: ["255, 214, 0"], abbreviation: "UKR"},
            Wales: {colors: ["235, 0, 21"], abbreviation: "WLS"}
        },
        "North America": {
            Anguilla: {colors: ["255, 255, 255", "19, 167, 227", "213, 111, 53"], abbreviation: "AGL"},
            "Antigua and Barbuda": {colors: ["252, 210, 15", "0, 0, 0"], abbreviation: "AAB"},
            Aruba: {colors: ["63, 144, 223", "255, 210, 0"], abbreviation: "ARU"},
            Bahamas: {colors: ["255, 200, 40", "0, 0, 0", "0, 120, 140"], abbreviation: "BMA"},
            Barbados: {colors: ["255, 200, 33", "0, 33, 128"], abbreviation: "BRB"},
            Belize: {colors: ["255, 255, 255", "16, 14, 151", "218, 7, 18"], abbreviation: "BLZ"},
            Bermuda: {colors: ["232, 140, 172", "0, 26, 89"], abbreviation: "BER"},
            Bonaire: {colors: ["255, 216, 0", "255, 255, 255", "0, 44, 136"], abbreviation: "BON"},
            "British Virgin Islands": {colors: ["0, 97, 36", "218, 172, 36", "255, 255, 255"], abbreviation: "BVI"},
            Canada: {colors: ["214, 39, 24"], abbreviation: "CAN"},
            "Cayman Islands": {colors: ["201, 7, 42"], abbreviation: "CYI"},
            "Costa Rica": {colors: ["219, 36, 22"], abbreviation: "CRI"},
            Cuba: {colors: ["204, 13, 13"], abbreviation: "CUB"},
            Curacao: {colors: ["0, 39, 128"], abbreviation: "CUR"},
            Dominica: {colors: ["0, 107, 61", "252, 210, 15"], abbreviation: "DOM"},
            "Dominican Republic": {colors: ["255, 255, 255"], abbreviation: "DRP"},
            "El Salvador": {colors: ["0, 69, 173"], abbreviation: "SVR"},
            "French Guyana": {colors: ["2, 98, 59", "255, 191, 42"], abbreviation: "FGY"},
            Grenada: {colors: ["252, 210, 15", "0, 123, 94", "207, 9, 33"], abbreviation: "GDA"},
            Guadeloupe: {colors: ["213, 6, 31"], abbreviation: "GLP"},
            Guatemala: {colors: ["255, 255, 255", "71, 152, 209"], abbreviation: "GUA"},
            Guyana: {colors: ["255, 215, 27"], abbreviation: "GUY"},
            Haiti: {colors: ["0, 26, 160"], abbreviation: "HTI"},
            Honduras: {colors: ["30, 80, 160", "255, 255, 255"], abbreviation: "HON"},
            Jamaica: {colors: ["255, 185, 22", "0, 120, 71"], abbreviation: "JAM"},
            Martinique: {colors: ["33, 71, 175", "255, 255, 255"], abbreviation: "MTQ"},
            Mexico: {colors: ["0, 104, 69", "255, 255, 255", "207, 9, 33"], abbreviation: "MEX"},
            Montserrat: {colors: ["46, 191, 138"], abbreviation: "MST"},
            Nicaragua: {colors: ["255, 255, 255", "0, 103, 199"], abbreviation: "NGA"},
            Panama: {colors: ["255, 255, 255", "1, 30, 86"], abbreviation: "PAN"},
            "Puerto Rico": {colors: ["177, 0, 12", "255, 255, 255", "11, 27, 188"], abbreviation: "PRI"},
            "Saint Kitts and Nevis": {colors: ["201, 7, 42"], abbreviation: "SKN"},
            "Saint Lucia": {colors: ["36, 78, 241", "245, 219, 94"], abbreviation: "SLU"},
            "Saint Martin": {colors: ["255, 255, 255"], abbreviation: "SMT"},
            "Saint Vincent and The Grenadines": {colors: ["252, 209, 28"], abbreviation: "SVG"},
            "Sint Maarten": {colors: ["255, 255, 255", "220, 23, 29"], abbreviation: "SMT"},
            Suriname: {colors: ["255, 255, 255", "2, 131, 76", "242, 4, 7"], abbreviation: "SUR"},
            "Trinidad and Tobago": {colors: ["219, 19, 50", "0, 0, 0"], abbreviation: "TTB"},
            "Turks and Caicos": {colors: ["0, 35, 104"], abbreviation: "TKC"},
            "United States": {colors: ["255, 255, 255", "0, 38, 100"], abbreviation: "USA"},
            "US Virgin Islands": {colors: ["14, 33, 103", "241, 195, 57"], abbreviation: "USI"}
        },
        Oceania: {
            "American Samoa": {colors: ["255, 255, 255", "0, 0, 102"], abbreviation: "AMS"},
            Australia: {colors: ["255, 188, 67", "40, 68, 62"], abbreviation: "AUS"},
            "Cook Islands": {colors: ["43, 90, 78"], abbreviation: "CKI"},
            Fiji: {colors: ["105, 180, 232", "0, 27, 105"], abbreviation: "FJI"},
            "New Caledonia": {colors: ["0, 38, 84", "206, 17, 38"], abbreviation: "NWC"},
            "New Zealand": {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "NWZ"},
            "Papua New Guinea": {colors: ["207, 9, 33", "0, 0, 0"], abbreviation: "PNG"},
            Samoa: {colors: ["0, 39, 128"], abbreviation: "SAM"},
            "Solomon Islands": {colors: ["252, 210, 15"], abbreviation: "SLM"},
            Tahiti: {colors: ["228, 42, 62"], abbreviation: "TTI"},
            "Timor Leste": {colors: ["221, 59, 55", "0, 0, 0", "221, 208, 80"], abbreviation: "TMR"},
            Tonga: {colors: ["194, 0, 0", "255, 255, 255"], abbreviation: "TGA"},
            Tuvalu: {colors: ["0, 157, 223", "254, 222, 0"], abbreviation: "TVL"},
            Vanuatu: {colors: ["253, 207, 10", "0, 0, 0"], abbreviation: "VTU"}
        },
        "South America": {
            Argentina: {colors: ["116, 172, 223", "255, 255, 255"], abbreviation: "ARG"},
            Bolivia: {colors: ["0, 122, 49"], abbreviation: "BOL"},
            Brazil: {colors: ["254, 223, 0", "0, 155, 58"], abbreviation: "BRZ"},
            Chile: {colors: ["216, 39, 25"], abbreviation: "CHL"},
            Colombia: {colors: ["255, 205, 0"], abbreviation: "COL"},
            Ecuador: {colors: ["255, 222, 0", "0, 77, 163"], abbreviation: "ECU"},
            Paraguay: {colors: ["214, 39, 24", "255, 255, 255"], abbreviation: "PAR"},
            "Perú": {colors: ["255, 255, 255", "218, 7, 30"], abbreviation: "PER"},
            Uruguay: {colors: ["108, 170, 225"], abbreviation: "URU"},
            Venezuela: {colors: ["100, 16, 35"], abbreviation: "VZL"}
        }
    }
      
    const _LEAGUES = {
        Africa: {
            // "Botola Pro 1": {

            // },
            // "DStv Premiership": {

            // },
            "Egyptian Premier League": {
                "Bank El Ahly": {colors: ["233, 115, 54"], abbreviation: "BNK"},
                "Cleopatra FC": {colors: ["83, 14, 17", "234, 171, 29"], abbreviation: "CLE"},
                "Eastern Company": {colors: ["88, 183, 80"], abbreviation: "ECO"},
                "El Ahly": {colors: ["229, 31, 39"], abbreviation: "AHL"},
                "El Gouna": {colors: ["244, 203, 31"], abbreviation: "GOU"},
                "El Mahalla": {colors: ["79, 157, 184"], abbreviation: "MAH"},
                "El Makasa": {colors: ["0, 127, 61", "36, 57, 128"], abbreviation: "MAK"},
                "El Masry": {colors: ["255, 255, 255", "8, 96, 2"], abbreviation: "MAS"},
                "El Mokawloon": {colors: ["242, 220, 32", "0, 0, 0"], abbreviation: "MOK"},
                "Enppi SC": {colors: ["47, 59, 114"], abbreviation: "ENP"},
                "Future FC": {colors: ["188, 29, 47", "0, 0, 0"], abbreviation: "FUT"},
                Gaish: {colors: ["251, 31, 36", "0, 0, 0"], abbreviation: "GAI"},
                Ismaily: {colors: ["247, 209, 0", "13, 142, 203"], abbreviation: "ISM"},
                "Ittihad Alexandria": {colors: ["0, 101, 0"], abbreviation: "ALX"},
                "Pharco FC": {colors: ["245, 99, 26"], abbreviation: "PHA"},
                "Pyramids FC": {colors: ["28, 138, 203", "255, 255, 255"], abbreviation: "PYR"},
                Smouha: {colors: ["40, 47, 118"], abbreviation: "SMO"},
                Zamalek: {colors: ["255, 255, 255", "218, 0, 0"], abbreviation: "ZAM"}
            },
            // "Nigeria Professional Football League": {

            // }
        },
        Asia: {
            // "Chinese Super League": {

            // },
            "J1 League": {
                "Avispa Fukuoka": {colors: [""], abbreviation: "AVI"},
                "Cerezo Osaka": {colors: [""], abbreviation: "CZO"},
                "Consadole Sapporo": {colors: [""], abbreviation: "CON"},
                "FC Tokyo": {colors: [""], abbreviation: "TKY"},
                "Gamba Osaka": {colors: [""], abbreviation: "OSA"},
                "Jubilo Iwata": {colors: [""], abbreviation: "JIW"},
                "Kashima Antlers": {colors: [""], abbreviation: "KAN"},
                "Kashiwa Reysol": {colors: [""], abbreviation: "REY"},
                "Kawasaki Frontale": {colors: [""], abbreviation: "KAW"},
                "Kyoto Sanga FC": {colors: [""], abbreviation: "KYO"},
                "Nagoya Grampus": {colors: [""], abbreviation: "NAG"},
                "Sagan Tosu": {colors: [""], abbreviation: "SAG"},
                "Sanfrecce Hiroshima": {colors: [""], abbreviation: "SAN"},
                Shimizu: {colors: [""], abbreviation: "SHI"},
                "Shonan Bellmare": {colors: [""], abbreviation: "SHO"},
                "Urawa Reds": {colors: [""], abbreviation: "URA"},
                "Vissel Kobe": {colors: [""], abbreviation: "VIS"},
                Yokohama: {colors: [""], abbreviation: "YOK"}
            },
            // "K League 1": {

            // },
            // "Persian Gulf Pro League": {

            // },
            // "Qatar Stars League": {

            // },
            // "Saudi Professional League": {

            // },
            // "UAE Pro League": {

            // }
        },
        Europe: {
            "Bundesliga": {
                Augsburg: {colors: ["244, 74, 84", "255, 255, 255", "11, 154, 72"], abbreviation: "AUG"},
                "Bayer Leverkusen": {colors: ["239, 63, 47", "0, 0, 0"], abbreviation: "LVK"},
                "Bayern München": {colors: ["204, 13, 32"], abbreviation: "FCB"},
                "Bochum-1848": {colors: ["1, 38, 76", "255, 255, 255"], abbreviation: "BCH"},
                "Borussia Dortmund": {colors: ["232, 202, 0", "0, 0, 0"], abbreviation: "BVB"},
                "Borussia Mönchengladbach": {colors: ["255, 255, 255", "11, 86, 58"], abbreviation: "MCH"},
                "Eintracht Frankfurt": {colors: ["0, 0, 0", "190, 30, 41"], abbreviation: "EIN"},
                "FC Köln": {colors: ["255, 255, 255", "216, 57, 59"], abbreviation: "KOL"},
                "FC Union Berlin": {colors: ["241, 3, 35"], abbreviation: "BER"},
                Freiburg: {colors: ["198, 19, 44", "255, 255, 255"], abbreviation: "FRE"},
                "Hertha Berlin": {colors: ["3, 82, 182", "255, 255, 255"], abbreviation: "HBL"},
                Hoffenheim: {colors: ["2, 71, 152"], abbreviation: "HFF"},
                Mainz: {colors: ["186, 10, 22", "255, 255, 255"], abbreviation: "MNZ"},
                "RB Leipzig": {colors: ["172, 2, 2", "255, 255, 255"], abbreviation: "RBL"},
                "Schalke 04": {colors: ["16, 73, 143"], abbreviation: "S04"},
                Stuttgart: {colors: ["255, 255, 255", "231, 30, 57"], abbreviation: "STU"},
                "Werder Bremen": {colors: ["43, 186, 158", "255, 255, 255"], abbreviation: "WBR"},
                Wolfsburg: {colors: ["82, 227, 29", "31, 44, 53"], abbreviation: "WLF"}
            },
            "English Premier League": {
                Arsenal: {colors: ["195, 1, 28", "255, 255, 255"], abbreviation: "ARS"},
                "Aston Villa": {colors: ["137, 58, 98", "163, 197, 235"], abbreviation: "AVL"},
                Barnsley: {colors: ["213, 24, 48"], abbreviation: "BRN"},
                "Birmingham City": {colors: ["49, 71, 162", "255, 255, 255"], abbreviation: "BGH"},
                "Blackburn Rovers": {colors: ["255, 255, 255", "44, 88, 170"], abbreviation: "BRV"},
                Blackpool: {colors: ["248, 123, 42"], abbreviation: "BPL"},
                "Bolton Wanderers": {colors: ["255, 255, 255"], abbreviation: "BLW"},
                Bournemouth: {colors: ["207, 22, 43", "0, 0, 0"], abbreviation: "BOU"},
                "Bradford City": {colors: ["245, 199, 61", "177, 35, 86"], abbreviation: "BRD"},
                Brentford: {colors: ["221, 35, 59", "255, 255, 255"], abbreviation: "BFD"},
                "Brighton and Hove Albion": {colors: ["20, 95, 193", "255, 255, 255"], abbreviation: "BHA"},
                Burnley: {colors: ["160, 39, 71", "131, 179, 205"], abbreviation: "BRL"},
                "Cardiff City": {colors: ["51, 64, 169"], abbreviation: "CDF"},
                "Charlton Athletic": {colors: ["213, 35, 59"], abbreviation: "CHA"},
                Chelsea: {colors: ["54, 72, 174"], abbreviation: "CHL"},
                "Coventry City": {colors: ["139, 196, 230", "255, 255, 255"], abbreviation: "CVT"},
                "Crystal Palace": {colors: ["45, 60, 121", "248, 62, 43"], abbreviation: "CRY"},
                "Derby County": {colors: ["255, 255, 255"], abbreviation: "DBY"},
                Everton: {colors: ["38, 85, 162"], abbreviation: "EVE"},
                Fulham: {colors: ["255, 255, 255"], abbreviation: "FLH"},
                Huddersfield: {colors: ["0, 95, 193", "255, 255, 255"], abbreviation: "HDD"},
                "Hull City": {colors: ["244, 178, 76", "0, 0, 0"], abbreviation: "HLL"},
                "Ipswich Town": {colors: ["36, 94, 172"], abbreviation: "IPS"},
                "Leeds United": {colors: ["255, 255, 255"], abbreviation: "LEE"},
                "Leicester City": {colors: ["28, 90, 208"], abbreviation: "LCS"},
                Liverpool: {colors: ["194, 34, 50"], abbreviation: "LVP"},
                "Manchester City": {colors: ["134, 192, 238"], abbreviation: "MCI"},
                "Manchester United": {colors: ["218, 26, 45"], abbreviation: "MAN"},
                Middlesbrough: {colors: ["212, 32, 54"], abbreviation: "MBR"},
                Newcastle: {colors: ["0, 0, 0", "255, 255, 255"], abbreviation: "NWU"},
                "Norwich City": {colors: ["255, 243, 20", "22, 129, 61"], abbreviation: "NOR"},
                "Nottingham Forest": {colors: ["233, 31, 65"], abbreviation: "NFO"},
                "Oldham Athletic": {colors: ["31, 80, 157"], abbreviation: "OLD"},
                Portsmouth: {colors: ["17, 98, 168"], abbreviation: "PRM"},
                "Queens Park Rangers": {colors: ["45, 115, 176", "255, 255, 255"], abbreviation: "QPR"},
                Reading: {colors: ["0, 74, 174", "255, 255, 255"], abbreviation: "RDG"},
                "Sheffield United": {colors: ["236, 48, 49", "255, 255, 255"], abbreviation: "SHU"},
                "Sheffield Wednesday": {colors: ["35, 77, 176", "255, 255, 255"], abbreviation: "SHW"},
                Southampton: {colors: ["255, 255, 255", "222, 19, 51"], abbreviation: "STH"},
                "Stoke City": {colors: ["204, 12, 14", "255, 255, 255"], abbreviation: "STK"},
                Sunderland: {colors: ["230, 38, 55", "255, 255, 255"], abbreviation: "SUN"},
                "Swansea City": {colors: ["255, 255, 255"], abbreviation: "SWS"},
                "Swindon Town": {colors: ["226, 40, 60"], abbreviation: "SWT"},
                "Tottenham Hotspur": {colors: ["255, 255, 255"], abbreviation: "TOT"},
                Watford: {colors: ["253, 229, 14", "0, 0, 0"], abbreviation: "WAT"},
                "West Bromwich Albion": {colors: ["32, 52, 84", "255, 255, 255"], abbreviation: "WBA"},
                "West Ham": {colors: ["133, 42, 66", "165, 183, 199"], abbreviation: "WHA"},
                "Wigan Athletic": {colors: ["51, 94, 176", "255, 255, 255"], abbreviation: "WIG"},
                Wimbledon: {colors: ["34, 38, 82"], abbreviation: "WIM"},
                Wolverhampton: {colors: ["249, 160, 27", "0, 0, 0"], abbreviation: "WVH"}
            },
            // "Eredivise": {

            // },
            // "Greek Super League": {

            // },
            "La Liga": {
                "Almería": {colors: ["234, 59, 61", "255, 255, 255"], abbreviation: "ALM"},
                "Athletic Club": {colors: ["217, 7, 27", "255, 255, 255"], abbreviation: "ATH"},
                "Atlético de Madrid": {colors: ["206, 0, 12", "255, 255, 255"], abbreviation: "ATM"},
                Barcelona: {colors: ["0, 71, 148", "158, 3, 66", "228, 182, 0"], abbreviation: "FCB"},
                Betis: {colors: ["0, 143, 73", "255, 255, 255"], abbreviation: "BET"},
                "Cádiz": {colors: ["240, 223, 22"], abbreviation: "CAD"},
                "Celta de Vigo": {colors: ["49, 165, 214"], abbreviation: "CEL"},
                Elche: {colors: ["255, 255, 255", "32, 92, 66"], abbreviation: "ELC"},
                Espanyol: {colors: ["15, 104, 186", "255, 255, 255"], abbreviation: "ESP"},
                Getafe: {colors: ["7, 86, 144"], abbreviation: "GET"},
                Girona: {colors: ["188, 42, 49", "255, 255, 255"], abbreviation: "GIR"},
                Mallorca: {colors: ["196, 30, 16"], abbreviation: "MLL"},
                Osasuna: {colors: ["210, 25, 31", "9, 50, 107"], abbreviation: "OSS"},
                "Rayo Vallecano": {colors: ["255, 255, 255", "242, 50, 41"], abbreviation: "RYV"},
                "Real Madrid": {colors: ["255, 255, 255"], abbreviation: "RMA"},
                "Real Sociedad": {colors: ["5, 44, 128", "255, 255, 255"], abbreviation: "RSC"},
                Sevilla: {colors: ["255, 255, 255", "247, 4, 22"], abbreviation: "SEV"},
                Valencia: {colors: ["255, 255, 255"], abbreviation: "VAL"},
                Valladolid: {colors: ["125, 36, 137", "255, 255, 255"], abbreviation: "VLD"},
                Villareal: {colors: ["246, 213, 82"], abbreviation: "VLL"}
            },
            // "Ligue 1": {

            // },
            // "Primeira Liga": {

            // },
            // "Russian Premier League":{

            // },
            "Serie A": {
                Atalanta: {colors: ["0, 109, 181", "0, 0, 0"], abbreviation: "ATA"},
                Bologna: {colors: ["154, 45, 37", "14, 47, 88"], abbreviation: "BOL"},
                Cremonese: {colors: ["194, 6, 29", "85, 95, 86"], abbreviation: "CRE"},
                Empoli: {colors: ["0, 90, 165"], abbreviation: "EMP"},
                Fiorentina: {colors: ["64, 9, 141"], abbreviation: "FIO"},
                "Hellas Verona": {colors: ["247, 229, 0", "21, 40, 127"], abbreviation: "HLV"},
                Internazionale: {colors: ["1, 29, 155", "0, 0, 0"], abbreviation: "INT"},
                Juventus: {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "JUV"},
                Lazio: {colors: ["131, 209, 239"], abbreviation: "LAZ"},
                Lecce: {colors: ["247, 214, 32", "219, 37, 34"], abbreviation: "LEC"},
                Milan: {colors: ["188, 27, 43", "0, 0, 0"], abbreviation: "MIL"},
                Monza: {colors: ["230, 21, 55"], abbreviation: "MZA"},
                Napoli: {colors: ["24, 154, 207"], abbreviation: "NAP"},
                Roma: {colors: ["128, 33, 47", "240, 145, 39"], abbreviation: "ROM"},
                Salernitana: {colors: ["127, 27, 28"], abbreviation: "SAL"},
                Sampdoria: {colors: ["59, 82, 247"], abbreviation: "SAM"},
                Sassuolo: {colors: ["49, 176, 88", "0, 0, 0"], abbreviation: "SAS"},
                Spezia: {colors: ["255, 255, 255"], abbreviation: "SPZ"},
                Torino: {colors: ["131, 30, 23", "255, 255, 255"], abbreviation: "TOR"},
                Udinese: {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "UDI"}
            },
            // "Turkish Super League": {

            // },
            // "Ukranian Premier League": {

            // }
        },
        "North America": {
            // "Canadian Premier League": {

            // },
            // "Liga Panameña": {

            // },
            "Liga MX": {
                "América": {colors: ["239, 224, 34", "0, 21, 61"], abbreviation: "AME"},
                Atlas: {colors: ["229, 27, 35", "0, 0, 0"], abbreviation: "ATL"},
                "Atlético San Luis": {colors: ["182, 1, 26", "255, 255, 255", "2, 38, 118"], abbreviation: "ASL"},
                Chivas: {colors: ["225, 4, 0", "255, 255, 255", "7, 69, 181"], abbreviation: "CHV"},
                "Club León": {colors: ["12, 130, 65", "255, 255, 255"], abbreviation: "LEO"},
                "Cruz Azul": {colors: ["37, 36, 204"], abbreviation: "CRZ"},
                "Juárez": {colors: ["71, 229, 2", "0, 0, 0"], abbreviation: "JUA"},
                "Mazatlán": {colors: ["69, 29, 106"], abbreviation: "MZT"},
                Monterrey: {colors: ["0, 50, 99", "255, 255, 255"], abbreviation: "MTR"},
                Necaxa: {colors: ["218, 0, 29", "255, 255, 255"], abbreviation: "NCX"},
                Pachuca: {colors: ["1, 33, 128", "255, 255, 255"], abbreviation: "PCH"},
                Puebla: {colors: ["0, 42, 86", "255, 255, 255"], abbreviation: "PUE"},
                Pumas: {colors: ["227, 195, 0", "16, 26, 71"], abbreviation: "PUM"},
                "Querétaro": {colors: ["0, 77, 159", "0, 0, 0"], abbreviation: "QUE"},
                "Santos Laguna": {colors: ["21, 120, 96", "255, 255, 255"], abbreviation: "SAN"},
                Tigres: {colors: ["240, 173, 33", "6, 42, 156"], abbreviation: "TIG"},
                Toluca: {colors: ["227, 18, 16"], abbreviation: "TOL"},
                Xolos: {colors: ["221, 3, 21", "0, 0, 0"], abbreviation: "XOL"}
            },
            "Major League Soccer": {
                "Atlanta United": {colors: ["216, 46, 66", "0, 0, 0"], abbreviation: "ATL"},
                Austin: {colors: ["24, 172, 68", "0, 0, 0"], abbreviation: "AUS"},
                Charlotte: {colors: ["25, 129, 194", "255, 255, 255"], abbreviation: "CHT"},
                "Chicago Fire": {colors: ["17, 30, 70", "174, 39, 44"], abbreviation: "CHF"},
                Cincinnati: {colors: ["247, 78, 0", "3, 44, 139"], abbreviation: "CIN"},
                "Colorado Rapids": {colors: ["108, 12, 32", "151, 188, 227"], abbreviation: "COL"},
                "Columbus Crew": {colors: ["245, 234, 2", "0, 0, 0"], abbreviation: "CCW"},
                Dallas: {colors: ["185, 13, 60", "0, 60, 122"], abbreviation: "DLL"},
                "DC United": {colors: ["0, 0, 0", "185, 1, 26"], abbreviation: "DCU"},
                "Houston Dynamo FC": {colors: ["239, 106, 32", "0, 0, 0"], abbreviation: "HOU"},
                "Inter Miami CF": {colors: ["239, 175, 198", "0, 0, 0"], abbreviation: "MIA"},
                "LA Galaxy": {colors: ["255, 255, 255", "0, 30, 92", "247, 186, 0"], abbreviation: "LAG"},
                "Los Angeles FC": {colors: ["0, 0, 0", "192, 160, 99"], abbreviation: "LAN"},
                "Minnesota United": {colors: ["136, 203, 236", "0, 0, 0"], abbreviation: "MST"},
                Montreal: {colors: ["0, 58, 194", "0, 0, 0"], abbreviation: "MTR"},
                "Nashville SC": {colors: ["233, 230, 0", "30, 21, 68"], abbreviation: "NVL"},
                "New England Revolution": {colors: ["10, 32, 62", "202, 13, 43"], abbreviation: "NER"},
                "New York City": {colors: ["105, 169, 217", "0, 41, 95"], abbreviation: "NYC"},
                "New York Red Bulls": {colors: ["255, 255, 255", "230, 29, 52"], abbreviation: "NYR"},
                "Orlando City": {colors: ["78, 34, 115", "234, 207, 70"], abbreviation: "ORL"},
                "Philadelphia Union": {colors: ["8, 25, 45", "56, 140, 230", "192, 173, 70"], abbreviation: "PHI"},
                "Portland Timbers": {colors: ["13, 64, 28", "197, 146, 0"], abbreviation: "POR"},
                "Real Salt Lake": {colors: ["159, 0, 32", "49, 53, 79", "224, 176, 1"], abbreviation: "RSL"},
                "San Jose Earthquakes": {colors: ["1, 58, 161", "0, 0, 0"], abbreviation: "SJE"},
                "Seattle Sounders": {colors: ["112, 177, 87", "0, 82, 144"], abbreviation: "SEA"},
                "Sporting Kansas City": {colors: ["142, 171, 208", "11, 33, 62"], abbreviation: "SPO"},
                Toronto: {colors: ["178, 16, 53"], abbreviation: "TOR"},
                "Vancouver Whitecaps FC": {colors: ["0, 24, 65", "146, 186, 223"], abbreviation: "VCU"}
            },
            // "Primera División de Costa Rica": {

            // }
        },
        Oceania: {
            "Australian A League": {
                "Adelaide United": {colors: ["171, 25, 45"], abbreviation: "ADE"},
                "Brisbane Roar": {colors: ["255, 88, 0"], abbreviation: "BRI"},
                "Central Coast Mariners": {colors: ["0, 46, 92", "255, 197, 47"], abbreviation: "CCM"},
                "Macarthur FC": {colors: ["255, 255, 255", "0, 0, 0", "210, 177, 43"], abbreviation: "MAC"},
                "Melbourne City": {colors: ["108, 173, 223"], abbreviation: "MEL"},
                "Melbourne Victory": {colors: ["0, 45, 86", "255, 255, 255"], abbreviation: "VIC"},
                "Newcastle Jets": {colors: ["2, 76, 145", "184, 33, 51"], abbreviation: "NWJ"},
                "Perth Glory": {colors: ["71, 10, 104", "244, 128, 32"], abbreviation: "PER"},
                "Sydney FC": {colors: ["108, 170, 228"], abbreviation: "SYD"},
                "Wellington Phoenix": {colors: ["255, 221, 0", "0, 0, 0"], abbreviation: "WEL"},
                "Western Sydney Wanderers": {colors: ["198, 12, 48", "0, 0, 0"], abbreviation: "WSW"},
                "Western United": {colors: ["0, 0, 0", "0, 191, 111"], abbreviation: "WES"}
            },
            // "New Zealand National League": {

            // }
        },
        "South America": {
            "Campeonato Uruguayo": {
                Albion: {colors: ["214, 35, 41", "0, 43, 108"], abbreviation: "ALB"},
                "Boston River": {colors: ["31, 91, 48", "236, 29, 40"], abbreviation: "BRV"},
                Cerrito: {colors: ["247, 234, 2", "7, 69, 32"], abbreviation: "CRR"},
                "Cerro Largo": {colors: ["0, 0, 145", "255, 255, 255"], abbreviation: "CRL"},
                "City Torque": {colors: ["105, 169, 216"], abbreviation: "TOR"},
                Danubio: {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "DAN"},
                "Defensor Sporting": {colors: ["90, 44, 143"], abbreviation: "DSC"},
                "Deportivo Maldonado": {colors: ["1, 110, 0", "201, 2, 0"], abbreviation: "MAL"},
                Fenix: {colors: ["255, 255, 255", "106, 62, 150"], abbreviation: "FNX"},
                Liverpool: {colors: ["16, 84, 157", "0, 0, 0"], abbreviation: "LVP"},
                Nacional: {colors: ["0, 46, 124", "255, 255, 255", "184, 12, 47"], abbreviation: "NAC"},
                Peñarol: {colors: ["247, 208, 0", "0, 0, 0"], abbreviation: "PEÑ"},
                "Plaza Colonia": {colors: ["0, 141, 61", "255, 255, 255"], abbreviation: "PLA"},
                Rentistas: {colors: ["188, 3, 17"], abbreviation: "REN"},
                "River Plate": {colors: ["233, 23, 13", "255, 255, 255"], abbreviation: "RVP"},
                Wanderers: {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "WAN"}
            },
            // "Segunda División Uruguaya": {

            // },
            "Liga Profesional Argentina": {
                Aldosivi: {colors: ["69, 147, 84", "229, 198, 49"], abbreviation: "ALD"},
                "Argentinos Juniors": {colors: ["175, 44, 44", "255, 255, 255"], abbreviation: "ARG"},
                Arsenal: {colors: ["98, 189, 233", "206, 73, 49"], abbreviation: "ARS"},
                "Atlético Tucumán": {colors: ["106, 190, 241", "255, 255, 255"], abbreviation: "ATU"},
                Banfield: {colors: ["67, 145, 57", "255, 255, 255"], abbreviation: "BAN"},
                "Barracas Central": {colors: ["193, 29, 33", "255, 255, 255"], abbreviation: "BCE"},
                "Boca Juniors": {colors: ["11, 75, 147", "235, 208, 33"], abbreviation: "BOC"},
                "Central Córdoba": {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "CCO"},
                "Colón": {colors: ["169, 43, 43", "0, 0, 0"], abbreviation: "COL"},
                "Defensa y Justicia": {colors: ["25, 120, 51", "255, 224, 23"], abbreviation: "DYJ"},
                Estudiantes: {colors: ["193, 21, 20", "255, 255, 255"], abbreviation: "EST"},
                Gimnasia: {colors: ["255, 255, 255", "17, 42, 84"], abbreviation: "GIM"},
                "Godoy Cruz": {colors: ["0, 120, 209", "255, 255, 255"], abbreviation: "GCZ"},
                "Huracán": {colors: ["255, 255, 255", "238, 15, 15"], abbreviation: "HUR"},
                Independiente: {colors: ["195, 21, 23"], abbreviation: "IND"},
                "Lanús": {colors: ["102, 40, 47"], abbreviation: "LAN"},
                "Newell's": {colors: ["196, 19, 16", "0, 0, 0"], abbreviation: "NWL"},
                Patronato: {colors: ["177, 30, 29", "0, 0, 0"], abbreviation: "PAT"},
                Platense: {colors: ["255, 255, 255", "79, 51, 20"], abbreviation: "PLA"},
                Racing: {colors: ["81 162 208", "255, 255, 255"], abbreviation: "RAC"},
                "River Plate": {colors: ["255, 255, 255", "208, 44, 29"], abbreviation: "RVP"},
                "Rosario Central": {colors: ["238, 212, 82", "20, 62, 100"], abbreviation: "RCE"},
                "San Lorenzo": {colors: ["57, 65, 87", "181, 51, 57"], abbreviation: "SLZ"},
                Sarmiento: {colors: ["22, 95, 38", "255, 255, 255"], abbreviation: "SAR"},
                Talleres: {colors: ["14, 44, 95", "255, 255, 255"], abbreviation: "TAL"},
                Tigre: {colors: ["48, 46, 122", "202, 38, 38"], abbreviation: "TIG"},
                "Unión": {colors: ["193, 21, 20", "255, 255, 255"], abbreviation: "UNI"},
                "Vélez": {colors: ["255, 255, 255", "56, 100, 165"], abbreviation: "VEL"}
            },
            // "Primera Nacional Argentina": {

            // },
            // "Primera División Boliviana": {

            // },
            "Brasileirao Serie A": {
                "América Mineiro": {colors: ["0, 164, 65", "0, 0, 0"], abbreviation: "AMG"},
                "Atlético Mineiro": {colors: ["0, 0, 0", "255, 255, 255"], abbreviation: "ATM"},
                "Avaí": {colors: ["0, 99, 171", "255, 255, 255"], abbreviation: "AVA"},
                Botafogo: {colors: ["0, 0, 0", "255, 255, 255"], abbreviation: "BOT"},
                "Ceará": {colors: ["0, 0, 0", "255, 255, 255"], abbreviation: "CEA"},
                Corinthians: {colors: ["255, 255, 255", "0, 0, 0"], abbreviation: "COR"},
                Coritiba: {colors: ["0, 94, 77", "255, 255, 255"], abbreviation: "CTB"},
                "Cuiabá": {colors: ["255, 215, 1", "0, 101, 47"], abbreviation: "CUI"},
                Flamengo: {colors: ["223, 0, 9", "0, 0, 0"], abbreviation: "FLA"},
                Fluminense: {colors: ["0, 105, 59", "255, 255, 255", "168, 0, 35"], abbreviation: "FLU"},
                Fortaleza: {colors: ["15, 91, 164", "225, 32, 38"], abbreviation: "FTZ"},
                Goianiense: {colors: ["255, 0, 0", "0, 0, 0"], abbreviation: "GOI"},
                "Goiás": {colors: ["20, 60, 47"], abbreviation: "GOI"},
                Internacional: {colors: ["255, 39, 39"], abbreviation: "INT"},
                Juventude: {colors: ["255, 255, 255", "0, 143, 93"], abbreviation: "JUV"},
                Palmeiras: {colors: ["0, 110, 52"], abbreviation: "PAL"},
                Paranaense: {colors: ["237, 16, 48", "0, 0, 0"], abbreviation: "CAP"},
                "RB Bragantino": {colors: ["255, 255, 255"], abbreviation: "BRA"},
                Santos: {colors: ["255, 255, 255"], abbreviation: "SAN"},
                "São Paulo": {colors: ["255, 0, 0", "255, 255, 255", "0, 0, 0"], abbreviation: "SPA"}
            },
            // "Brasileirao Serie B": {

            // },
            // "Primera División Chilena": {

            // },
            // "Primera A Colombiana": {

            // },
            // "Serie A Ecuatoriana": {

            // },
            // "Primera División Paraguaya": {

            // },
            // "Liga 1 Peruana": {

            // },
            // "Primera División Venezolana" : {

            // }
        }
    }
      
    function getContinents(){
        return Object.keys(_CONTINENTS);
    }
       function getCountries(continent){
            console.log(continent);
            return Object.keys(_CONTINENTS[continent])
    }
    function getCountryInfo(continent, country){
        const abbreviation = _CONTINENTS[continent][country]["abbreviation"];
        const colors = _CONTINENTS[continent][country]["colors"];
        return {abbreviation, colors};
    }
    function getLeagues(continent){
        return Object.keys(_LEAGUES[continent]);
    }
    function getClubs(continent, league){
        return Object.keys(_LEAGUES[continent][league]);
    }
    function getClubInfo(continent, league, club){
        const abbreviation = _LEAGUES[continent][league][club]["abbreviation"];
        const colors = _LEAGUES[continent][league][club]["colors"];
        return {abbreviation, colors};
    }
    return {getContinents, getCountries, getCountryInfo, getLeagues, getClubs, getClubInfo};
})();