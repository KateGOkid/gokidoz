/*! GOkidOZ — US states + major cities dataset (navigation scaffold).
 * City names are factual; each city's directory page is built with real
 * verified listings over time (the Providence model). LIVE maps a city to
 * an existing built page. */
window.GZ_LIVE = {
  "Boston, MA": "../index.html",
  "Providence, RI": "providence.html",
  "Austin, TX": "austin.html",
  "New Haven, CT": "new-haven.html",
  "Hartford, CT": "hartford.html",
  "Bridgeport, CT": "bridgeport.html",
  "Stamford, CT": "stamford.html",
  "Waterbury, CT": "waterbury.html",
  "Londonderry, NH": "londonderry.html"
};
/* States that have their own full hub site (like Boston/MA). Linked directly instead of the city-list page. */
window.GZ_STATE_HUB = {
  FL: "../fl/index.html"
};
window.US_STATES = {
  AL:{name:"Alabama",emoji:"🏈",cities:["Birmingham","Montgomery","Huntsville","Mobile","Tuscaloosa","Hoover","Auburn","Dothan","Decatur","Madison","Florence","Gadsden","Prattville","Vestavia Hills","Opelika","Enterprise","Bessemer","Homewood","Athens","Anniston"]},
  AK:{name:"Alaska",emoji:"🏔️",cities:["Anchorage","Fairbanks","Juneau","Wasilla","Sitka","Ketchikan","Kenai","Kodiak","Palmer","Soldotna"]},
  AZ:{name:"Arizona",emoji:"🌵",cities:["Phoenix","Tucson","Mesa","Chandler","Scottsdale","Gilbert","Glendale","Tempe","Peoria","Surprise","Goodyear","Flagstaff","Avondale","Yuma","Buckeye","Casa Grande","Maricopa","Oro Valley","Prescott","Sierra Vista"]},
  AR:{name:"Arkansas",emoji:"💎",cities:["Little Rock","Fayetteville","Fort Smith","Springdale","Jonesboro","Rogers","Conway","Bentonville","Pine Bluff","Hot Springs","Benton","Texarkana","Sherwood","Jacksonville","Russellville"]},
  CA:{name:"California",emoji:"🌅",cities:["Los Angeles","San Diego","San Jose","San Francisco","Fresno","Sacramento","Long Beach","Oakland","Bakersfield","Anaheim","Santa Ana","Riverside","Irvine","Stockton","Chula Vista","Fremont","Santa Clarita","San Bernardino","Modesto","Fontana","Oxnard","Glendale","Huntington Beach","Pasadena","Berkeley","Palo Alto","Santa Monica","Santa Barbara","Sacramento","Roseville"]},
  CO:{name:"Colorado",emoji:"🏔️",cities:["Denver","Colorado Springs","Aurora","Fort Collins","Lakewood","Boulder","Thornton","Arvada","Westminster","Pueblo","Centennial","Highlands Ranch","Greeley","Longmont","Loveland","Castle Rock","Broomfield","Littleton","Parker","Brighton"]},
  CT:{name:"Connecticut",emoji:"⚓",cities:["Bridgeport","New Haven","Hartford","Stamford","Waterbury","Norwalk","Danbury","New Britain","West Hartford","Greenwich","Fairfield","Hamden","Bristol","Manchester","Meriden","Milford","Stratford","East Hartford","Middletown","Wallingford"]},
  DE:{name:"Delaware",emoji:"🏖️",cities:["Wilmington","Dover","Newark","Middletown","Smyrna","Milford","Seaford","Georgetown","Elsmere","New Castle"]},
  FL:{name:"Florida",emoji:"🌴",cities:["Jacksonville","Miami","Tampa","Orlando","St. Petersburg","Hialeah","Tallahassee","Fort Lauderdale","Port St. Lucie","Cape Coral","Pembroke Pines","Hollywood","Gainesville","Coral Springs","Clearwater","Palm Bay","West Palm Beach","Pompano Beach","Boca Raton","Sarasota","Naples","Bradenton","Kissimmee","Fort Myers","Delray Beach"]},
  GA:{name:"Georgia",emoji:"🍑",cities:["Atlanta","Augusta","Columbus","Macon","Savannah","Athens","Sandy Springs","Roswell","Johns Creek","Albany","Warner Robins","Alpharetta","Marietta","Valdosta","Smyrna","Dunwoody","Brookhaven","Peachtree City","Gainesville","Newnan"]},
  HI:{name:"Hawaii",emoji:"🌺",cities:["Honolulu","Pearl City","Hilo","Kailua","Waipahu","Kaneohe","Kahului","Mililani","Ewa Beach","Kihei"]},
  ID:{name:"Idaho",emoji:"🥔",cities:["Boise","Meridian","Nampa","Idaho Falls","Caldwell","Pocatello","Coeur d'Alene","Twin Falls","Post Falls","Lewiston","Rexburg","Eagle","Moscow","Kuna","Ammon"]},
  IL:{name:"Illinois",emoji:"🌆",cities:["Chicago","Aurora","Naperville","Joliet","Rockford","Springfield","Elgin","Peoria","Champaign","Waukegan","Cicero","Bloomington","Arlington Heights","Evanston","Schaumburg","Bolingbrook","Palatine","Skokie","Des Plaines","Orland Park"]},
  IN:{name:"Indiana",emoji:"🏎️",cities:["Indianapolis","Fort Wayne","Evansville","South Bend","Carmel","Fishers","Bloomington","Hammond","Gary","Lafayette","Muncie","Terre Haute","Noblesville","Greenwood","Kokomo","Anderson","Elkhart","West Lafayette","Mishawaka","Columbus"]},
  IA:{name:"Iowa",emoji:"🌽",cities:["Des Moines","Cedar Rapids","Davenport","Sioux City","Iowa City","Waterloo","Ames","West Des Moines","Council Bluffs","Dubuque","Ankeny","Urbandale","Cedar Falls","Marion","Bettendorf"]},
  KS:{name:"Kansas",emoji:"🌾",cities:["Wichita","Overland Park","Kansas City","Olathe","Topeka","Lawrence","Shawnee","Manhattan","Lenexa","Salina","Hutchinson","Leavenworth","Leawood","Dodge City","Garden City"]},
  KY:{name:"Kentucky",emoji:"🐎",cities:["Louisville","Lexington","Bowling Green","Owensboro","Covington","Richmond","Georgetown","Florence","Hopkinsville","Nicholasville","Elizabethtown","Henderson","Frankfort","Jeffersontown","Paducah"]},
  LA:{name:"Louisiana",emoji:"🎷",cities:["New Orleans","Baton Rouge","Shreveport","Lafayette","Lake Charles","Kenner","Bossier City","Monroe","Alexandria","Houma","Marrero","New Iberia","Slidell","Central","Ruston"]},
  ME:{name:"Maine",emoji:"🦞",cities:["Portland","Lewiston","Bangor","South Portland","Auburn","Biddeford","Sanford","Augusta","Saco","Westbrook","Waterville","Brunswick","Scarborough","Gorham","Falmouth"]},
  MD:{name:"Maryland",emoji:"🦀",cities:["Baltimore","Columbia","Germantown","Silver Spring","Waldorf","Frederick","Ellicott City","Glen Burnie","Gaithersburg","Rockville","Bethesda","Dundalk","Bowie","Towson","Annapolis","College Park","Salisbury","Hagerstown","Bel Air","Severn"]},
  MA:{name:"Massachusetts",emoji:"🦞",cities:["Boston","Worcester","Springfield","Cambridge","Lowell","Brockton","Quincy","Newton","Somerville","Framingham","Wellesley","Needham","Natick","Brookline","Lexington","Arlington","Medford","Waltham","Lynn","Andover"]},
  MI:{name:"Michigan",emoji:"🚗",cities:["Detroit","Grand Rapids","Warren","Sterling Heights","Ann Arbor","Lansing","Flint","Dearborn","Livonia","Troy","Westland","Farmington Hills","Kalamazoo","Wyoming","Southfield","Rochester Hills","Royal Oak","Novi","St. Clair Shores","Pontiac"]},
  MN:{name:"Minnesota",emoji:"❄️",cities:["Minneapolis","St. Paul","Rochester","Bloomington","Duluth","Brooklyn Park","Plymouth","Maple Grove","Woodbury","St. Cloud","Eagan","Eden Prairie","Coon Rapids","Burnsville","Blaine","Lakeville","Minnetonka","Apple Valley","Edina","St. Louis Park"]},
  MS:{name:"Mississippi",emoji:"🎺",cities:["Jackson","Gulfport","Southaven","Biloxi","Hattiesburg","Olive Branch","Tupelo","Meridian","Greenville","Madison","Clinton","Pearl","Ridgeland","Starkville","Oxford"]},
  MO:{name:"Missouri",emoji:"🎷",cities:["Kansas City","St. Louis","Springfield","Columbia","Independence","Lee's Summit","O'Fallon","St. Joseph","St. Charles","St. Peters","Blue Springs","Florissant","Joplin","Chesterfield","Jefferson City","Cape Girardeau","Wildwood","Ballwin","Liberty","Kirkwood"]},
  MT:{name:"Montana",emoji:"🏔️",cities:["Billings","Missoula","Great Falls","Bozeman","Butte","Helena","Kalispell","Havre","Anaconda","Miles City"]},
  NE:{name:"Nebraska",emoji:"🌽",cities:["Omaha","Lincoln","Bellevue","Grand Island","Kearney","Fremont","Hastings","Norfolk","Columbus","North Platte","Papillion","La Vista","Scottsbluff","South Sioux City","Beatrice"]},
  NV:{name:"Nevada",emoji:"🎰",cities:["Las Vegas","Henderson","Reno","North Las Vegas","Sparks","Carson City","Fernley","Elko","Mesquite","Boulder City"]},
  NH:{name:"New Hampshire",emoji:"🍁",cities:["Manchester","Nashua","Concord","Derry","Dover","Rochester","Salem","Merrimack","Hudson","Londonderry","Keene","Bedford","Portsmouth","Goffstown","Laconia"]},
  NJ:{name:"New Jersey",emoji:"🏙️",cities:["Newark","Jersey City","Paterson","Elizabeth","Edison","Woodbridge","Lakewood","Toms River","Hamilton","Trenton","Clifton","Camden","Brick","Cherry Hill","Passaic","Princeton","Hoboken","Montclair","Morristown","Parsippany"]},
  NM:{name:"New Mexico",emoji:"🎈",cities:["Albuquerque","Las Cruces","Rio Rancho","Santa Fe","Roswell","Farmington","Clovis","Hobbs","Alamogordo","Carlsbad","Gallup","Los Lunas","Las Vegas","Deming","Los Alamos"]},
  NY:{name:"New York",emoji:"🗽",cities:["New York City","Buffalo","Rochester","Yonkers","Syracuse","Albany","New Rochelle","Mount Vernon","Schenectady","Utica","White Plains","Troy","Niagara Falls","Binghamton","Ithaca","Poughkeepsie","Saratoga Springs","Scarsdale","Hempstead","Long Beach"]},
  NC:{name:"North Carolina",emoji:"🌲",cities:["Charlotte","Raleigh","Greensboro","Durham","Winston-Salem","Fayetteville","Cary","Wilmington","High Point","Asheville","Concord","Greenville","Gastonia","Apex","Huntersville","Chapel Hill","Burlington","Kannapolis","Wake Forest","Mooresville"]},
  ND:{name:"North Dakota",emoji:"🌾",cities:["Fargo","Bismarck","Grand Forks","Minot","West Fargo","Williston","Dickinson","Mandan","Jamestown","Wahpeton"]},
  OH:{name:"Ohio",emoji:"🌰",cities:["Columbus","Cleveland","Cincinnati","Toledo","Akron","Dayton","Parma","Canton","Youngstown","Lorain","Hamilton","Springfield","Kettering","Elyria","Lakewood","Cuyahoga Falls","Dublin","Westerville","Mansfield","Beavercreek"]},
  OK:{name:"Oklahoma",emoji:"🤠",cities:["Oklahoma City","Tulsa","Norman","Broken Arrow","Edmond","Lawton","Moore","Midwest City","Stillwater","Enid","Owasso","Bartlesville","Muskogee","Shawnee","Bixby"]},
  OR:{name:"Oregon",emoji:"🌲",cities:["Portland","Salem","Eugene","Gresham","Hillsboro","Beaverton","Bend","Medford","Springfield","Corvallis","Albany","Tigard","Lake Oswego","Keizer","Grants Pass","Oregon City","McMinnville","Redmond","Tualatin","West Linn"]},
  PA:{name:"Pennsylvania",emoji:"🔔",cities:["Philadelphia","Pittsburgh","Allentown","Erie","Reading","Scranton","Bethlehem","Lancaster","Harrisburg","York","State College","Wilkes-Barre","Altoona","Chester","Norristown","Bensalem","King of Prussia","Doylestown","West Chester","Easton"]},
  RI:{name:"Rhode Island",emoji:"⚓",cities:["Providence","Warwick","Cranston","Pawtucket","East Providence","Woonsocket","Newport","Bristol","Westerly","Cumberland","North Providence","South Kingstown","Johnston","Lincoln","Barrington"]},
  SC:{name:"South Carolina",emoji:"🌴",cities:["Charleston","Columbia","North Charleston","Mount Pleasant","Rock Hill","Greenville","Summerville","Spartanburg","Goose Creek","Hilton Head","Florence","Myrtle Beach","Aiken","Greer","Anderson"]},
  SD:{name:"South Dakota",emoji:"🦬",cities:["Sioux Falls","Rapid City","Aberdeen","Brookings","Watertown","Mitchell","Yankton","Pierre","Huron","Vermillion"]},
  TN:{name:"Tennessee",emoji:"🎸",cities:["Nashville","Memphis","Knoxville","Chattanooga","Clarksville","Murfreesboro","Franklin","Jackson","Johnson City","Bartlett","Hendersonville","Kingsport","Collierville","Smyrna","Brentwood","Germantown","Columbia","Spring Hill","La Vergne","Gallatin"]},
  TX:{name:"Texas",emoji:"🤠",cities:["Houston","San Antonio","Dallas","Austin","Fort Worth","El Paso","Arlington","Corpus Christi","Plano","Laredo","Lubbock","Irving","Garland","Frisco","McKinney","Amarillo","Grand Prairie","Brownsville","Killeen","Pasadena","McAllen","Denton","Waco","Round Rock","Sugar Land","College Station","The Woodlands","Allen","League City","Richardson"]},
  UT:{name:"Utah",emoji:"🏔️",cities:["Salt Lake City","West Valley City","West Jordan","Provo","Orem","Sandy","St. George","Ogden","Layton","South Jordan","Lehi","Millcreek","Taylorsville","Logan","Murray","Draper","Bountiful","Riverton","Herriman","Spanish Fork"]},
  VT:{name:"Vermont",emoji:"🍁",cities:["Burlington","South Burlington","Rutland","Essex","Colchester","Bennington","Brattleboro","Montpelier","Williston","Barre"]},
  VA:{name:"Virginia",emoji:"🏛️",cities:["Virginia Beach","Norfolk","Chesapeake","Richmond","Arlington","Newport News","Alexandria","Hampton","Roanoke","Suffolk","Portsmouth","Lynchburg","Harrisonburg","Charlottesville","Danville","Blacksburg","Manassas","Leesburg","Reston","Fredericksburg"]},
  WA:{name:"Washington",emoji:"🌲",cities:["Seattle","Spokane","Tacoma","Vancouver","Bellevue","Kent","Everett","Renton","Federal Way","Yakima","Spokane Valley","Bellingham","Kennewick","Auburn","Pasco","Marysville","Redmond","Sammamish","Olympia","Kirkland"]},
  WV:{name:"West Virginia",emoji:"⛰️",cities:["Charleston","Huntington","Morgantown","Parkersburg","Wheeling","Martinsburg","Fairmont","Beckley","Clarksburg","Weirton"]},
  WI:{name:"Wisconsin",emoji:"🧀",cities:["Milwaukee","Madison","Green Bay","Kenosha","Racine","Appleton","Waukesha","Eau Claire","Oshkosh","Janesville","West Allis","La Crosse","Sheboygan","Wauwatosa","Fond du Lac","Brookfield","New Berlin","Wausau","Menomonee Falls","Beloit"]},
  WY:{name:"Wyoming",emoji:"🐎",cities:["Cheyenne","Casper","Laramie","Gillette","Rock Springs","Sheridan","Green River","Evanston","Riverton","Jackson"]}
};
