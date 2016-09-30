define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
    function(oj, ko, $, app) {
        function HomeChild2ViewModel() {
        var self = this;
        self.goBack = function() {
            window.history.back();
        };
        self.goHome = function() {
            app.router.go('home');
        }
        self.goHomeChild1 = function() {
            app.router.go('homechild_1');
        }
    }
    return new HomeChild2ViewModel();
    }
);

