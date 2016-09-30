define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
        'ojs/ojselectcombobox', 'ojs/ojtabs', 'ojs/ojconveyorbelt', 
        'ojs/ojinputtext',  'ojs/ojlistview', 'ojs/ojarraytabledatasource'],
function(oj, ko, $) {

function StarWarsViewModel() {
        var self = this;
        //self.handleActivated = function(info) { };
        //self.handleAttached = function(info) { };
        //self.handleBindingsApplied = function(info) { };
        //self.handleDetached = function(info) { };
        self.selectedVal = ko.observableArray();
        
        self.name = ko.observable(); 
        self.height = ko.observable(); 
        self.mass = ko.observable(); 
        self.birth_year = ko.observable(); 
        self.gender = ko.observable();
        self.speciesName = ko.observable();
        self.classification = ko.observable(); 
        self.designation = ko.observable(); 
        self.average_height = ko.observable();
      
        self.characters = ko.observableArray([
        {"value": "1", "label": "Luke Skywalker"},
        {"value": "4", "label": "Darth Vader"},
        {"value": "10", "label": "Obi-Wan Kenobi"},
        {"value": "11", "label": "Anakin Skywalker"},
        {"value": "13", "label": "Chewbacca"},
        {"value": "14", "label": "Han Solo"}
        ]);
        self.filmSelected = function(event, ui) { 
            console.log("filmSelected: "); 
            console.log(event); 
            console.log(ui); 

            if(ui.option === "currentItem" && ui.value !== null) { 
                console.log("selected film url: " + ui.value); 
            } 
        }
        self.films = ko.observableArray(); 
        self.filmDataSource=  
            new oj.ArrayTableDataSource(self.films, {idAttribute: "url"}); 
    
        self.characterSelected = function (event, data) {
        if(self.selectedVal() === undefined) {
            return;
        }
        
        var characterId = self.selectedVal()[0];
            if(characterId !== "") {
                var url = "https://swapi.co/api/people/" + characterId; 
                
                $.get(url, null, function(json, status) { 
                    //console.log(json); 
                    self.name(json.name); 
                    self.height(json.height); 
                    self.mass(json.mass); 
                    self.birth_year(json.birth_year); 
                    self.gender(json.gender); 
                        var speciesUrl = json.species[0]; 
                    //console.log("speciesUrl: " + speciesUrl);
                    
                    self.films([]); 
                    for(var idx in json.films) { 
                        var filmUrl = json.films[idx]; 
                        console.log(filmUrl);              
                        $.get(filmUrl, null, function(film, status) {
                            self.films.push({title: film.title,  
                                episode_id: film.episode_id, 
                                director: film.director, 
                                url: film.url, 
                                release_date: film.release_date}); 
                                // release_date 순으로 정렬 
                                self.films.sort(function(film1, film2) { 
                                    return new Date(film1.release_date).getTime() - 
                                            new Date(film2.release_date).getTime(); 
                                });
                            });   
                    }
                    $.get(speciesUrl, null, function(species, status) { 
                        self.speciesName(species.name); 
                        self.classification(species.classification); 
                        self.designation(species.designation); 
                        self.average_height(species.average_height); 
                        });
                });    
            }
        }
    }
    return new StarWarsViewModel();
}
);