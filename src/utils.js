export const todayToTommorowDiff=()=>{
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayUTC =  Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(),today.getUTCHours(), today.getUTCMinutes(), today.getUTCSeconds());
    const tommorowUtC =  Date.UTC(tomorrow.getUTCFullYear(), tomorrow.getUTCMonth(), tomorrow.getUTCDate(),tomorrow.getUTCHours(), tomorrow.getUTCMinutes(), tomorrow.getUTCSeconds());

    console.log('hoje',todayUTC)
    console.log('manha',tommorowUtC)
    console.log('diff',tommorowUtC - todayUTC)
    console.log('isso',Math.abs(tommorowUtC - todayUTC))
    console.log(tommorowUtC - todayUTC)
    return tommorowUtC - todayUTC;
}

export const todayUTC= ()=>{
    const today = new Date()
    return Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
}