/* map */
var map;
/* Btns */
const btnReset = $('#reset');
const divMode = $('.mode');
const validBtn = $('#valid');
const suivantBtn = $('#suivant');
/* tableau contenant les énoncés suivant le mode*/
var regions = new Array();
var departements = new Array();
var communes = new Array();
/*Tirage en cours pour comparer avec la reponse de la personne*/
var tableauTirage;
var currentTirage;
/* layer au moment de la creation et du click*/
var marker;
var markerTirage;
var chemin;
var newZone;
/* Group en fonction du mode*/
var RegionLayerGroup;
var DepartementLayerGroup;
var CommuneLayerGroup;
/* variable partie*/
var scoreTotal = 0;
var tour =0 ;
var nbTour=1;


class Zone {
    constructor(nom, centre, surface) {
        this.nom = nom;
        this.centre = centre;
        this.surface = surface;
      }
}

/*Initialisation du la page*/
    $(document).ready(function() {
        
    /*Create group of layers*/
        RegionLayerGroup = new L.LayerGroup();
        DepartementLayerGroup = new L.LayerGroup();
        CommuneLayerGroup = new L.LayerGroup();
    /*Create map*/
    
        let osmLayer = newMap();
        map = L.map('map',{
            layers : osmLayer
        });
        map.setView(new L.LatLng(46.85, 2.3518),6);
        /*Create layer market when answer and newZone when creating a zone*/
        marker = L.geoJSON();
        markerTirage = L.geoJSON();
        chemin = L.geoJSON();
        newZone = L.geoJSON();
                /*Initialising modes and btn*/
        initMode();
        initBtn(); 
    });

function newMap(){
    var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    });
    return Stadia_AlidadeSmoothDark;
}

function initMode() {
    $.getJSON("http://localhost/GuessWhere/controle/region.geojson",
        function(data) {
            newZone = L.geoJson(data, {style: {"weight": 2, "opacity": 0.65}, onEachFeature:onEachRegion});
            RegionLayerGroup.addLayer(newZone);  //map.fitBounds(newZone.getBounds());
            newZone.on('click', function(e) {
                map.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(map); 
                validBtn.text("Valider la réponse");
                validBtn.show();
            });
        });           
    $.getJSON("http://localhost/GuessWhere/controle/departement.geojson",
        function(data) {
            newZone = L.geoJson(data, {style: {"weight": 2, "opacity": 0.65}, onEachFeature:onEachDepartement});
            DepartementLayerGroup.addLayer(newZone);  //map.fitBounds(newZone.getBounds());
            newZone.on('click', function(e){
                map.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(map);
                validBtn.text("Valider la réponse");
                validBtn.show();
            });
        }); 
    $.getJSON("http://localhost/GuessWhere/controle/communes_ile-de-France.geojson",
        function(data) {
            newZone = L.geoJson(data, {style: {"weight": 2, "opacity": 0.65}, onEachFeature:onEachCommune});
            CommuneLayerGroup.addLayer(newZone); //map.fitBounds(newZone.getBounds());
            newZone.on('click', function(e) { 
                map.removeLayer(marker);
                marker = L.marker(e.latlng).addTo(map);
                validBtn.text("Valider la réponse");
                validBtn.show();
            });
        });
    $('#playRegion').on('click', playRegion);
    $('#playDepartement').on('click', playDepartement);
    $('#playCommune').on('click', playCommune);
}

function modeSelected() {
    btnReset.show();
    divMode.hide();
}

function playRegion(){
    modeSelected();
    map.setView(new L.LatLng(46.85, 2.3518),6);
    $('#textEnoncé').text('Où se situe la région ');
    RegionLayerGroup.addTo(map);
    regionTirage();
}

function playDepartement(){
    modeSelected();
    map.setView(new L.LatLng(46.85, 2.3518),6);
    $('#textEnoncé').text('Où se situe le département ');
    DepartementLayerGroup.addTo(map);
    departementTirage();
}

function playCommune(){
    modeSelected();
    map.setView(new L.LatLng(48.731964, 2.485521),9);
    $('#textEnoncé').text('Où se situe la commune ');
    CommuneLayerGroup.addTo(map);
    communeTirage();
}
function initBtn(){
    /* Btn leave the game */
    btnReset.hide();
    btnReset.on('click', function(){confirm('Etes vous sur de vouloir quitter ?')});
    btnReset.on('click', reset);
    /* Btn valid */
    validBtn.hide();
    validBtn.on('click', function(){confirm("c'est votre dernier mot ?")});
    validBtn.on('click', answer);
    /* Btn suivant */
    suivantBtn.hide();
    suivantBtn.on('click', tourSuivant);
}
    
function reset() {
    $('#tirage').text("");
    $('#tour').text("");
    $('#enoncé').hide();
    divMode.show();
    map.setView([46.227, 2.213], 6);
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    map.addLayer(newMap());
    scoreTotal=0;
    tour = 0;
    tableauTirage =[];
    currentTirage =null;
    btnReset.hide();
    suivantBtn.hide();
}

function tourSuivant(){
    if(tour!=0){
        cleanMap();
        suivantBtn.hide();
    }
    currentTirage = tableauTirage[tour];    
    $('#tirage').text(" "+currentTirage.nom);
    tour = tour+1;
    $('#tour').text("Tour n°"+tour+" : ");
    validBtn.hide();
}

function cleanMap(){
    map.removeLayer(markerTirage);
    map.removeLayer(marker);
    map.removeLayer(chemin);
}


/* Answering */
function answer() {
    //poly = zone.getLatLng();
    markerTirage = new L.marker(currentTirage.centre).addTo(map);
    let latlngs = new Array();
    latlngs.push(markerTirage.getLatLng());
    latlngs.push(marker.getLatLng());
    chemin = L.polyline(latlngs, {color: 'red'}).addTo(map);
    calculerScore();
    validBtn.hide();
    suivantBtn.show();
    if(tour ==nbTour){
        suivantBtn.text("Voir les résultats")
        suivantBtn.off('click');
        suivantBtn.on('click', finDePartie);
    }
}

function finDePartie(){
    $('#jeu').hide();
    $('#map').hide();
    $('#nb_score').text(scoreTotal);
    $('#nb').val(scoreTotal);
    $('#score').show();
}


function calculerScore(){
    markerLat = distance(marker.getLatLng().lat);
    markerLng = distance(marker.getLatLng().lng);
    reponseLng = distance(currentTirage.centre.lng);
    reponseLat = distance(currentTirage.centre.lat);
    diffLat = Math.abs(markerLat - reponseLng);
    diffLng = Math.abs(markerLng - reponseLat);
    scoreReponse = diffLat + diffLng;
    scoreTotal += scoreReponse;
}

function distance(nombre){
    nombre = Math.round(nombre * 100);
    return nombre;
}


function onEachRegion(feature, layer) {
    let prop = feature.properties;
    layer.setStyle({color :prop.style});
    var bounds = layer.getBounds();
    var center = bounds.getCenter();
    let region = new Zone(prop.nom, center, layer);
    regions.push(region); 
}

function onEachDepartement(feature, layer) {
    let prop = feature.properties;
    layer.setStyle({color :prop.style}) 
    var bounds = layer.getBounds();
    var latLng = bounds.getCenter();
    let departement = new Zone(prop.nom, latLng, bounds); 
    departements.push(departement); 
}

function onEachCommune(feature, layer) {
    let prop = feature.properties;
    layer.setStyle({color :prop.style}) 
    var bounds = layer.getBounds();
    var latLng = bounds.getCenter();
    let commune = new Zone(prop.nom, latLng, bounds); 
    communes.push(commune); 
}


function randomInt(max){
    let coma = Math.random(max);
    let int = Math.floor(coma*max);
    return int;
}

function regionTirage(){
    tableauTirage = new Array();
    for (let pas = 0; pas < nbTour; pas++) {
        let int = randomInt(regions.length);
        tableauTirage.push(regions[int]);
    }
    tourSuivant();
}

function departementTirage(){
    tableauTirage = new Array();
    for (let pas = 0; pas < nbTour; pas++) {
        let int = randomInt(departements.length);
        tableauTirage.push(departements[int]);
    }
    tourSuivant();
}

function communeTirage(){
    tableauTirage = new Array();
    for (let pas = 0; pas < nbTour; pas++) {
        let int = randomInt(communes.length);
        tableauTirage.push(communes[int]);
    }
    tourSuivant();
}