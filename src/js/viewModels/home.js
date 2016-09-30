define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
function(oj, ko, $, app) {
    function HomeViewModel() {
        var self = this;
        //self.handleActivated = function(info) { };
        //self.handleAttached = function(info) { };
        //self.handleBindingsApplied = function(info) { };
        //self.handleDetached = function(info) { };

        self.goChild1 = function() {
            app.router.go('homechild_1');
        };
        self.goChild2 = function() {
            app.router.go('homechild_2');
        };
    }
    return new HomeViewModel();
}
);