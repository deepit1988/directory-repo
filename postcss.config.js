module.exports = {
    plugins: {
        'postcss-url': {
            url: 'rebase'
        },
        'postcss-import': {},
        'postcss-preset-env': {
            preserve: false,
            warnForDuplicates: false
        },
        'postcss-mixins': {},
        'postcss-nesting': {},
        'postcss-custom-properties': {
            preserve: false
        },
        'postcss-custom-media': {},
        'postcss-flexbugs-fixes': {},
        'postcss-flexibility': {},
        'postcss-focus': {},
        'postcss-pxtorem': {},
        'postcss-merge-rules': {},
        'postcss-discard-duplicates': {},
        'postcss-discard-empty': {},
        'postcss-discard-unused': {},
        cssnano: {
            zindex: false,
            filterPlugins: false
        }
    }
};
