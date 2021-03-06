/**
 * Copyright (c) 2014, 2016, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
'use strict';

/**
 * Example of Require.js boostrap javascript
 */

requirejs.config(
{
  baseUrl: 'js',

  // Path mappings for the logical module names
  paths:
  //injector:mainReleasePaths
  {
    'knockout': 'libs/knockout/knockout-3.4.0.debug',
    'jquery': 'libs/jquery/jquery-3.1.0',
    'jqueryui-amd': 'libs/jquery/jqueryui-amd-1.12.0',
    'promise': 'libs/es6-promise/es6-promise',
    'hammerjs': 'libs/hammer/hammer-2.0.8',
    'ojdnd': 'libs/dnd-polyfill/dnd-polyfill-1.0.0',
    'ojs': 'libs/oj/v2.1.0/debug',
    'ojL10n': 'libs/oj/v2.1.0/ojL10n',
    'ojtranslations': 'libs/oj/v2.1.0/resources',
    'text': 'libs/require/text',
    'signals': 'libs/js-signals/signals'
  }
  //endinjector
  ,
  // Shim configurations for modules that do not expose AMD
  shim:
  {
    'jquery':
    {
      exports: ['jQuery', '$']
    }
  }
}
);

/**
 * A top-level require call executed by the Application.
 * Although 'ojcore' and 'knockout' would be loaded in any case (they are specified as dependencies
 * by the modules themselves), we are listing them explicitly to get the references to the 'oj' and 'ko'
 * objects in the callback
 */
require(['ojs/ojcore', 'knockout', 'appController', 'ojs/ojknockout',
'ojs/ojbutton', 'ojs/ojmodule', 'ojs/ojrouter'],
  function (oj, ko, app) { // this callback gets executed when all required modules are loaded

    function MainViewModel() {
      var self = this;
      self.toolbarButtons = app.toolbarButtonDataSource;
      self.router = app.router; // 이거는 index.html 중간에 moduleConfig를 만들어놨는데 그거 자체가 main안에 라우터가 있어야 한다는 것이다.
    }
    
    $(function() {
      
      function init() {
        // Bind your ViewModel for the content of the whole page body.
        oj.Router.sync().then(function () {
        ko.applyBindings(new MainViewModel(), document.getElementById('globalBody'));
        // Adjust the content top and bottom paddings after the header and footer
        // bindings have been applied.
        app.adjustContentPadding();
        },
        function (error) {
            oj.Logger.error('Error in root start: ' + error.message);
            }
        );
      }

      // If running in a hybrid (e.g. Cordova) environment, we need to wait for the deviceready 
      // event before executing any code that might interact with Cordova APIs or plugins.
      if ($(document.body).hasClass('oj-hybrid')) {
        document.addEventListener("deviceready", init);
      } else {
        init();
      }

    });
  }
);
