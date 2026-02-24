/**
 * Parse departure date string like "1st - 21st April 2026" or "7th - 27th January 2027"
 * and return the start date as ISO string
 */
export function parseDepartureDate(dateString: string): string {
  // Extract the first date part (before the dash)
  const firstPart = dateString.split(' - ')[0].trim();
  
  // Extract month and year from the full string
  const parts = dateString.split(' ');
  let month = '';
  let year = '';
  
  // Find month (word that's not a number or ordinal)
  for (const part of parts) {
    if (isNaN(parseInt(part)) && !part.includes('st') && !part.includes('nd') && !part.includes('rd') && !part.includes('th') && part !== '-') {
      month = part;
      break;
    }
  }
  
  // Find year (4-digit number)
  for (const part of parts) {
    if (/^\d{4}$/.test(part)) {
      year = part;
      break;
    }
  }
  
  // Extract day number from first part (remove ordinal suffix and any trailing text)
  const dayMatch = firstPart.match(/(\d+)(st|nd|rd|th)/);
  const day = dayMatch ? dayMatch[1] : '1';
  
  // Convert month name to number
  const monthMap: { [key: string]: string } = {
    'January': '01', 'Jan': '01',
    'February': '02', 'Feb': '02',
    'March': '03', 'Mar': '03',
    'April': '04', 'Apr': '04',
    'May': '05',
    'June': '06', 'Jun': '06',
    'July': '07', 'Jul': '07',
    'August': '08', 'Aug': '08',
    'September': '09', 'Sep': '09',
    'October': '10', 'Oct': '10',
    'November': '11', 'Nov': '11',
    'December': '12', 'Dec': '12'
  };
  
  const monthNum = monthMap[month] || '01';
  const dayPadded = day.padStart(2, '0');
  
  return `${year}-${monthNum}-${dayPadded}`;
}

/**
 * Format price string like "£1,599" to number 1599
 */
export function parsePrice(priceString: string): number {
  return parseInt(priceString.replace(/[^0-9]/g, ''));
}
