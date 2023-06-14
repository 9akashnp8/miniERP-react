
export function getCookie(name) {
    const cookieString = document.cookie;
    const match = cookieString.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return '';
}

export function deleteCookie(name) {
    document.cookie = name + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

/** 
 * returns a YYYY-MM-DD date string of current date 
 */
export function getCurrentDate(dateObject) {
  if (dateObject instanceof Date) {
    return dateObject.toISOString().split('T')[0]
  }
}