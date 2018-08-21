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
      localStorage.setItem('referrer', affiliateKey)
    }
  }
}
