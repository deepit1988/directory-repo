/* eslint no-extend-native: 0 */
'use strict';

import 'event-source-polyfill';
import 'core-js/features/symbol'; // fixes IE11 out of stack space errors - don't remove
import 'core-js/features/object/keys';
import 'core-js/features/object/freeze';
import 'core-js/features/object/assign';
import 'core-js/features/object/to-string';
import 'core-js/features/function/bind';
import 'core-js/features/function/name';
import 'core-js/features/parse-int';
import 'core-js/features/parse-float';
import 'core-js/features/number/constructor';
import 'core-js/features/number/to-fixed'; // throwing errors??
import 'core-js/features/number/to-precision';
import 'core-js/features/number/is-nan';
import 'core-js/features/number/parse-float';
import 'core-js/features/number/parse-int';
import 'core-js/features/string/trim';
import 'core-js/features/string/iterator';
import 'core-js/features/string/ends-with';
import 'core-js/features/string/includes';
import 'core-js/features/string/starts-with';
import 'core-js/features/date/now';
import 'core-js/features/date/to-json';
import 'core-js/features/date/to-iso-string';
import 'core-js/features/date/to-string';
import 'core-js/features/date/to-primitive';
import 'core-js/features/array/is-array';
import 'core-js/features/array/from';
import 'core-js/features/array/join';
import 'core-js/features/array/slice';
import 'core-js/features/array/sort';
import 'core-js/features/array/for-each';
import 'core-js/features/array/map';
import 'core-js/features/array/filter';
import 'core-js/features/array/some';
import 'core-js/features/array/every';
import 'core-js/features/array/reduce';
import 'core-js/features/array/index-of';
import 'core-js/features/array/last-index-of';
import 'core-js/features/array/find';
import 'core-js/features/array/find-index';
import 'core-js/features/array/iterator';
import 'core-js/features/promise';
import 'core-js/features/map';
import 'core-js/features/set';
import 'core-js/features/weak-map';
import 'core-js/features/weak-set';
import 'core-js/features/array/includes';
import 'core-js/features/string/pad-start';
import 'core-js/features/string/pad-end';
import 'core-js/features/string/trim-left';
import 'core-js/features/string/trim-right';
import 'core-js/features/string/match-all';
import 'core-js/features/object/values';
import 'core-js/features/object/entries';
import 'core-js/features/map/of';
import 'core-js/features/set/of';
import 'core-js/features/weak-map/of';
import 'core-js/features/weak-set/of';
import 'core-js/features/map/from';
import 'core-js/features/set/from';
import 'core-js/features/weak-map/from';
import 'core-js/features/weak-set/from';
import 'core-js/features/global-this';
import 'core-js/features/promise/finally';
import 'core-js/modules/web.timers';
import 'core-js/modules/web.immediate';
import 'core-js/modules/web.dom-collections.iterator';
import 'core-js/modules/web.dom-collections.for-each';
import 'object.getownpropertydescriptors';
import 'element-remove';

// Edge v15 has a buggy implementation of IntersectionObserver - force the polyfill
const forceIntersectionObserverPolyfill = /Edge\/15/.test( navigator.userAgent );

if ( forceIntersectionObserverPolyfill ) {

    delete window.IntersectionObserver;
    delete window.IntersectionObserverEntry;

}

import 'intersection-observer'; // used for react-intersection-observer
