'use strict';

const path = require( 'path' );
const { IgnorePlugin, NormalModuleReplacementPlugin } = require( 'webpack' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ExtractCssChunks = require( 'extract-css-chunks-webpack-plugin' );
const findUp = require( 'find-up' );
const fs = require( 'fs' );

const BundleAnalyzerPlugin = process.env.ANALYZE && require( 'webpack-bundle-analyzer' ).BundleAnalyzerPlugin;

const scriptPaths = {
    messenger: './static/scripts/messenger.js',
    business: './static/scripts/business.js',
};


let extractCssInitialized = false;

const createReplacer = ( searchvalue ) => ( newvalue ) => ( content ) => {

    const replaced = content.toString().replace( searchvalue, newvalue );

    return replaced;

};

const transformScript = ( searchvalue ) => ( filepath ) => {

    const script = fs.readFileSync( filepath );
    const transformer = createReplacer( searchvalue )( script );


    return transformer;

};

const transformBuildId = ( buildId ) => createReplacer( /NEXT_BUILD_ID/g )( buildId );


module.exports = {

    useFileSystemPublicRoutes: false,
    pageExtensions: [ 'jsx', 'js' ],
    distDir: 'bin',

    // https://github.com/zeit/next.js#configuring-the-ondemandentries
    onDemandEntries: {
        pagesBufferLength: 2,
        maxInactiveAge: 5 * 60 * 1000,
    },

    //setupFiles: [ '<rootDir>/jest.setup.js' ],
    testPathIgnorePatterns: [ '<rootDir>/.next/', '<rootDir>/node_modules/' ],

    webpack: ( config, options ) => {

        if ( !options.defaultLoaders ) {

            throw new Error(
                'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
            );

        }

        const { dev, isServer, buildId } = options;
        const originalEntry = config.entry;

        config.entry = async () => {

            const entries = await originalEntry();

            const mainJsLibraries = entries['main.js'];
            const polyfillsPath = path.resolve( './library/js/modules/polyfills.js' );

            if ( mainJsLibraries && mainJsLibraries.indexOf( polyfillsPath ) === -1 ) {

                mainJsLibraries.unshift( polyfillsPath );

            }

            return entries;

        };

        config.module.rules.push(

            // Handles processing external CSS with PostCSS.
            // Ignores files named "variables.css" since those
            // are only imported for use in <style jsx>.

            // ToDo - Removed to make it work here
            /*{
                test: /\.css$/,
                use: [
                    'raw-loader',
                    'postcss-loader',
                ],
                exclude: /variables\.css$/,
            },*/

            // Handles transforming the css variables into
            // an object for use in <style jsx>
            {
                test: /variables\.css$/,
                use: [
                    {
                        loader: 'cssobjects-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require( 'postcss-mixins' )(),
                                require( 'postcss-custom-properties' )( {
                                    preserve: false,
                                } ),
                            ],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true,
                            svgo: {
                                plugins: [
                                    {
                                        removeDoctype: true,
                                    },
                                    {
                                        removeXMLProcInst: true,
                                    },
                                    {
                                        removeComments: true,
                                    },
                                    {
                                        removeMetadata: true,
                                    },
                                    {
                                        removeXMLNS: true,
                                    },
                                    {
                                        removeEditorsNSData: true,
                                    },
                                    {
                                        cleanupAttrs: false,
                                    },
                                    {
                                        inlineStyles: true,
                                    },
                                    {
                                        minifyStyles: true,
                                    },
                                    {
                                        convertStyleToAttrs: true,
                                    },
                                    {
                                        cleanupIDs: true,
                                    },
                                    {
                                        removeUselessDefs: true,
                                    },
                                    {
                                        cleanupNumericValues: true,
                                    },
                                    {
                                        convertColors: true,
                                    },
                                    {
                                        removeUnknownsAndDefaults: true,
                                    },
                                    {
                                        removeNonInheritableGroupAttrs: true,
                                    },
                                    {
                                        removeUselessStrokeAndFill: true,
                                    },
                                    {
                                        removeViewBox: false,
                                    },
                                    {
                                        cleanupEnableBackground: true,
                                    },
                                    {
                                        removeHiddenElems: true,
                                    },
                                    {
                                        removeEmptyText: true,
                                    },
                                    {
                                        convertShapeToPath: true,
                                    },
                                    {
                                        moveElemsAttrsToGroup: true,
                                    },
                                    {
                                        moveGroupAttrsToElems: true,
                                    },
                                    {
                                        collapseGroups: true,
                                    },
                                    {
                                        convertPathData: true,
                                    },
                                    {
                                        convertTransform: true,
                                    },
                                    {
                                        removeEmptyAttrs: true,
                                    },
                                    {
                                        removeEmptyContainers: true,
                                    },
                                    {
                                        mergePaths: true,
                                    },
                                    {
                                        removeUnusedNS: true,
                                    },
                                    {
                                        removeTitle: true,
                                    },
                                    {
                                        removeDesc: true,
                                    },
                                    {
                                        removeDimensions: true,
                                    },
                                    {
                                        removeStyleElement: true,
                                    },
                                    {
                                        removeAttrs: { attrs: '(fill|fill-rule|width|height)' },
                                    },
                                ],
                                floatPrecision: 2,
                            },
                        },
                    },
                ],
            }
        );

        if ( BundleAnalyzerPlugin ) {

            config.plugins.push( new BundleAnalyzerPlugin( {
                analyzerMode: 'static',
                analyzerPort: 8888,
                openAnalyzer: true,
            } ) );

        }        

        
        if ( !isServer && !extractCssInitialized ) {

            config.plugins.push(
                new ExtractCssChunks( {
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                    filename: dev
                        ? 'static/chunks/[name].css'
                        : 'static/chunks/[name].[contenthash:8].css',
                    chunkFilename: dev
                        ? 'static/chunks/[name].chunk.css'
                        : 'static/chunks/[name].[contenthash:8].chunk.css',
                    orderWarning: false,
                    reloadAll: true,
                } )
            );
            extractCssInitialized = true;

        }

        const cssLoader = {
            loader: isServer ? 'css-loader/locals' : 'css-loader',
            options: {
                localIdentName: '[hash:base64:5]',
                modules: true,
                sourceMap: dev,
                importLoaders: 1,
            },
        };

        const postcssConfig = findUp.sync( 'postcss.config.js', {
            cwd: config.context,
        } );
        let postcssLoader;

        const { postcssLoaderOptions = {} } = options;

        if ( postcssConfig ) {

            // Copy the postcss-loader config options first.
            const postcssOptionsConfig = Object.assign(
                {},
                postcssLoaderOptions.config,
                { path: postcssConfig }
            );

            postcssLoader = {
                loader: 'postcss-loader',
                options: Object.assign( {}, postcssLoaderOptions, {
                    config: postcssOptionsConfig,
                } ),
            };

        }

        const pcssLoaders = [
            !isServer && dev && 'extracted-loader',
            !isServer && ExtractCssChunks.loader,
            cssLoader,
            postcssLoader,
        ].filter( ( x ) => x );

        const pcssRule = {
            test: /\.pcss$/,
            use: pcssLoaders,
        };

        options.defaultLoaders.pcss = pcssLoaders;

        config.module.rules.push( pcssRule );

        /*config.plugins.push( new CopyWebpackPlugin( [ {
            from: path.join( __dirname, 'static', 'service-worker.js' ),
            to: path.join( __dirname, 'bin', 'service-worker.js' ),
            transform: function applyTransformers( content ) {

                const transformed = [
                    transformScript( '$BUSINESS$' )( scriptPaths.business ),
                    transformScript( '$MESSENGER$' )( scriptPaths.messenger ),
                    transformBuildId( buildId ),
                ].reduce( ( memo, transformer ) => transformer( memo ), content );

                return transformed;

            },
        } ],

        ) ); */


        return config;

    },
};