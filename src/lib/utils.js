
export function getCookie(name) {
    const cookieString = document.cookie;
    const match = cookieString.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return '';
}