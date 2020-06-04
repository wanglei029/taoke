module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'stylus': '@/assets/stylus',
                'components': '@/components',
                'common': '@/common',
                'router': '@/router',
                'views': '@/views',
                'store': '@/store',
                'api': '@/api',

            }
        }
    },
}