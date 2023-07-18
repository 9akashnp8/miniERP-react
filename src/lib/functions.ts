
export function getFiveMinsFromNow() {
    let now = new Date().getTime();
    let fiveMinsFromNow = now + (5 * 60 * 1000);
    return new Date(fiveMinsFromNow);
}

export function getOneDayFromNow() {
    let now = new Date();
    now.setDate(now.getDate() + 1);
    return new Date(now);
}