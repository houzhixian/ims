const { override, fixBabelImports } = require('customize-cra');

/* config-overrides.js */
module.exports = override(
    fixBabelImports('import', {
         libraryName: 'antd',
         libraryDirectory: 'es',
         style: 'css',
     }),
);



// 如何配置详见以下地址
// https://github.com/timarney/react-app-rewired/blob/master/README_zh.md