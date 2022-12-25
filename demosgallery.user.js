// ==UserScript==
// @name        DesmosGallery
// @namespace   https://github.com/FabriceNeyret/DesmosGallery
// @version     1.3.5
// @description Desmos Gallery generator
// @author      Fabrice Neyret
// @include     https://www.desmos.com/calculator*
// @match       https://*.desmos.com/calculator*
// @run-at      document-start
// @grant       GM_addStyle
// @downloadURL https://github.com/FabriceNeyret/DesmosGallery/raw/main/desmosgallery.user.js
// @updateURL   https://github.com/FabriceNeyret/DesmosGallery/raw/main/desmosgallery.user.js
// ==/UserScript==

// changelog:
//   1.3.5      rename script (i.e. fix name typo ) : demosgallery → desmosgallery
//   1.3        structure new place found. Independance back.
//   1.2        fix after Desmos Calc is now closured. Now rely on DesModder util.
//   1.1        also download the html file ( images directly link to Desmos website )
//   1.0        first version: open a new tab with the gallery
