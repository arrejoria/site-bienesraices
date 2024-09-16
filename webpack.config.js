import path from 'path'

export default {
    mode: 'development',
    entry: {
        map: './src/js/map.js',
        main: './src/js/main.js',
        addImages: './src/js/addImages.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('public/js')
    }
}