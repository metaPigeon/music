import { axiosInstance } from './config'

export const getBannerRequest = () => {
    return axiosInstance.get('./banner')
}

export const getRecommendListRequest = () => {
    return axiosInstance.get('./personalized')
}

export const getHotSingerListRequest = (count) => {
    console.log(count,'coutncoujasdj')
    return axiosInstance.get(`./top/artists?offset=${count}`)
}

export const getSingerListRequest = (catergory, alpha, count) => {
    console.log(typeof alpha,'alphaalpahj')
    return axiosInstance.get(`./artist/list?cat=${catergory}&initial=${alpha.toLowerCase()}&offset=${count}`)
}

export const getRankListRequest = () => {
    return axiosInstance.get('/toplist/detail')
}