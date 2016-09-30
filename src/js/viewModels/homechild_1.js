define(['ojs/ojcore', 'knockout', 'jquery', 'appController'],
    function(oj, ko, $, app) {
        function HomeChild1ViewModel() {
            var self = this;
            self.goBack = function() {
                window.history.back();
            };
            self.goHome = function() {
                app.router.go('home');
            }
            self.goHomeChild2 = function() {
                app.router.go('homechild_2');
            }
        }
    return new HomeChild1ViewModel();
    }
);