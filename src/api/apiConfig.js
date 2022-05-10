const apiConfig = {

    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: '6dad9152900cb7d0406f767bdb35da16',
    originalImage: (imagePath) => `https://image.tmdb.org/t/p/original/${imagePath}`,
    w500Image: (imagePath) => `https://image.tmdb.org/t/p/w500/${imagePath}`

}

export default apiConfig;