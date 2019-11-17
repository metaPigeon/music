

const getCount = count => {
    if(typeof count !== 'number'||count<10000){
        return count
    }
    if(count<100000000) {
        return parseInt(count/10000)+'万'
    }else{
        return parseInt(count/100000000) +'亿'
    }
}

const debounce = (func,delay) => {
    let timer;
     return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(null,args)   // this
        },delay)
     }
}

 const filterIndex = rankList => {
    for (let i = 0; i < rankList.length - 1; i++) {
        if (rankList[i].tracks.length && !rankList[i + 1].tracks.length) {
            return i + 1;
        }
    }
};
export {
    getCount,
    debounce,
    filterIndex
}

