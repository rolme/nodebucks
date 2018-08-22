import qs from 'query-string'

export function capitalize(string) {
  return string[ 0 ].toUpperCase() + string.slice(1);
}

export function numberFormatter(num) {
  if ( num >= 1000000000 ) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
  }
  if ( num >= 1000000 ) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if ( num >= 1000 ) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num;
}

export function valueFormat(number, decimalPointsAmount) {
  return (+number).toFixed(decimalPointsAmount).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

export function setReferer() {
  if (window.location.search) {
    const affiliateKey = qs.parse(window.location.search).ref
    if (affiliateKey) {
      if (localStorage.getItem('referrer') !== affiliateKey) {
        localStorage.setItem('referred_time', formatDate(new Date()))
      }
      localStorage.setItem('referrer', affiliateKey)
    }
  }
}

export function formatDate(date) {
  const yyyy = date.getUTCFullYear()
  const mm = date.getUTCMonth() + 1
  const dd = date.getUTCDate()
  const HH = date.getHours()
  const MM = date.getUTCMinutes()
  const SS = date.getUTCSeconds()
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}:${SS}`
}
