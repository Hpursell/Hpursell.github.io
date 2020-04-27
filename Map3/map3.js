var Map3 = L.map('map3').setView([29.969552, -90.109885], 4)
var statesLayer = L.layerGroup().addTo(Map3)
var grayBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(Map3)
var streetsBasemap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(Map3)
var demographics = 'https://geog4046.github.io/assignment-resources/data/us_state_demographics_ESRI_2010A.geojson'
jQuery.getJSON(demographics, function (data) {
  L.geoJSON(data, {
    style: states,
    onEachFeature: populationResults
  }).addTo(Map3)
var states = function (feature) {
  var statePopulation = feature.properties.POPULATION
  var stateColor = 'olive'
  if (statePopulation > 4000000) { stateColor = 'green' }
  return {
    color: stateColor,
    weight: 2,
    fillOpacity: 0.5
  }
var populationResults = function (feature, layer) {
  var stateName = feature.properties.STATE_NAME
  var statePop = feature.properties.POPULATION
  layer.bindPopup('Population of ' + stateName + ' is ' + statePop + '<br>Less Than: 1000000')
  statesLayer.addLayer(layer)
}
var basemaps = {
  'Streets': streetsBasemap,
}
var layers = {
  'Area of each state': statesLayer
}
L.control.layers(basemaps, layers).addto(Map3)
