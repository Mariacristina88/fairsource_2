var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

function createMap() {
    var width = 2000,
        height = 800; 

    var projection = d3.geo.mercator()
        .center([-20, 59])
        .scale(400)
        .rotate([-10,0]);

    var zoom = d3.behavior.zoom().scaleExtent([0.6, 1.5]).on("zoom", zoomed);

    var svg = d3.select(".container").append("svg")
        .attr("class", "map")
        .attr("cursor", "move")
        .attr("width", width)
        .attr("height", height);

    var g = svg.append("g")
              .call(zoom)
              .append("g");

    g.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height);

    var path = d3.geo.path()
        .projection(projection);

    d3.json("world.json", function(error, topology) {
        g.selectAll("path")
          .data(topojson.object(topology, topology.objects.countries)
              .geometries)
        .enter()
          .append("g")
          .attr("id","pathmap")
          .append("path")
          .attr("class", "map-path")
          .attr("d", path)

      var textName = [
                     { "x_axis": 550, "y_axis": 160, "name": "EUROPE" },
                     { "x_axis": 1000, "y_axis": 250, "name": "ASIA" },
                     { "x_axis": 1300, "y_axis": 740, "name": "OCEANIA" },
                     { "x_axis": 500, "y_axis": 450, "name": "AFRICA" },
                     { "x_axis": -375, "y_axis": 150, "name": "NORTH AMERICA" },
                     { "x_axis": -90, "y_axis": 650, "name": "SOUTH AMERICA" }];
      
      //Names of the countries
      var label = g.selectAll("text")
                    .data(textName)
                    .enter()
                    .append("text")
                    .attr("transform", "translate(140,210)");

      var labelAttribute = label
                  .attr("dx",function (d) { return d.x_axis; })
                  .attr("dy",function (d) { return d.y_axis; })
                  .text(function (d) {return d.name;});

      var mainCircles = [
                   { "x_axis": 447, "y_axis": 125, "radius": 4, "color" : "orange", "country":"The Netherlands", "image":"../img/den-haag-rotterdam-thumbnail.png", "city":["The Hague", " Rotterdam"] },
                   //{ "x_axis": 449, "y_axis": 120, "radius": 4, "color" : "brown", "country":"The Netherlands", "image":"../img/rotterdam-thumbnail.jpg", "city":"Rotterdam" }, //brown
                   { "x_axis": 475, "y_axis": 200, "radius": 4, "color" : "red", "country":"Italy","image":"../img/milan-thumbnail.jpg", "city":"Milan"},     //red
                   { "x_axis": 485, "y_axis": 130, "radius": 4, "color" : "#006838", "country":"Germany","image":"../img/bonn-thumbnail.jpg","city":"Bonn"}, //green
                   { "x_axis": 390, "y_axis": 120, "radius": 4, "color" : "#27AAE1", "country":"England","image":"../img/manchester-thumbnail.jpg","city":"Manchester"}, //blue
                   { "x_axis": 673, "y_axis": 550, "radius": 4, "color" : "#805CAC", "country":"Kenya","image":"../img/nairobi-thumbnail.jpg", "city":"Nairobi"}, //purple
                   { "x_axis": 1140, "y_axis": 472, "radius": 4, "color" : "#fde601", "country":"Cambodia","image":"../img/phnom-penh-thumbnail.jpg", "city":"Phnom Penh"}]; //yellow

        var circles = g.selectAll("circle")
                      .data(mainCircles)
                      .enter()
                      .append("circle")
                      .attr("class", "circleAnim")
                      .attr("transform", "translate(140,210)");


     //   svg.call(tip);
        var myTool = d3.select("body")
                      .data(mainCircles)
                      .append("div")
                      .attr("class", "mytooltip")
                      .style("opacity", "0")
                      .style("display", "none");

        var circleAttributes = circles
                              .data(mainCircles)
                              .attr("cx", function (d) { return d.x_axis; })
                              .attr("cy", function (d) { return d.y_axis; })
                              .attr("r", function (d) { return d.radius; })
                              .style("fill", function(d) { return d.color; })
                              .attr("transform", "translate(140,210)")
                              .attr("cursor","pointer")
                              .on("mouseover", function(d){
                               
                                myTool
                                  .transition()
                                  .duration(500)
                                  .style("opacity", "1")                           
                                  .style("display", "block")

                                myTool
                                  .html(
                                  "<div id='thumbnail'><span>" + d.country + "</span><img src='" + d.image + "'/><span style='color:#8DC63F'>" + d.city + "</span></div>"
                                  )
                                  .style("left", (d3.event.pageX - 113) + "px")   
                                  .style("top", (d3.event.pageY - 220) + "px")      
                              })
                            
                              .on("mouseout", function(d) {       
                                myTool.transition()
                                    .duration(500)
                                    .style("opacity", "0")            
                                    .style("display", "none")
                              });


        var linecircles = g.append("g")
                          .selectAll("circle")
                          .data(mainCircles)
                          .enter()
                          .append("circle")
                          .attr("transform", "translate(140,210)")
                          .attr("cursor","pointer")
                          
                            .on("mouseover", function(d){
                               
                                myTool
                                  .transition()
                                  .duration(500)
                                  .style("opacity", "1")                           
                                  .style("display", "block")

                                myTool
                                  .html(
                                  "<div id='thumbnail'><span>" + d.country + "</span><img src='" + d.image + "'/><span style='color:#8DC63F'>" + d.city + "</span></div>"
                                  )
                                  .style("left", (d3.event.pageX - 110) + "px")   
                                  .style("top", (d3.event.pageY - 220) + "px")      
                              })
                            
                              .on("mouseout", function(d) {       
                                myTool.transition()
                                    .duration(500)
                                    .style("opacity", "0")            
                                    .style("display", "none")
                              });
                             
                          

        var linecircleAttributes = linecircles
                                  .attr("cx", function (d) { return d.x_axis; })
                                  .attr("cy", function (d) { return d.y_axis; })
                                  .attr("r", 8)
                                  .style("stroke", "#8DC63F")
                                  .style("stroke-width", "2px")
                                  .style("fill", "rgba(0,0,0,0)");

        line1 = [{"x":445, "y":132},{"x":470, "y":350},{"x":670, "y":544}]; //To Kenya
        line2 = [{"x":443, "y":118},{"x":420, "y":110},{"x":398, "y":117}]; //To Manchester
        line3 = [{"x":452, "y":130},{"x":470, "y":165},{"x":473, "y":193}]; //To Milan
        line4 = [{"x":455, "y":123},{"x":478, "y":127},{"x":478, "y":127}]; // To Germany
        line5 = [{"x":455, "y":127},{"x":700, "y":300},{"x":1133, "y":468}]; // To Cambodia


        var lineFunction = d3.svg.line()
                          .x(function(d){return d.x;})
                          .y(function(d){return d.y;})
                          .interpolate("basis");

        var line = g.append("g");
                    
        var lineAttributes = function(f) { 
                            line
                            .append("path")
                            .attr("transform", "translate(140,210)")
                            .attr("d", lineFunction(f))
                            .style("stroke", "#8DC63F")
                            .style("stroke-width","2px") 
                            .style("fill","none") };

      var lineOne = lineAttributes(line1);
      var lineTwo = lineAttributes(line2);
      var lineThree = lineAttributes(line3);
      var lineFour = lineAttributes(line4);
      var lineFive = lineAttributes(line5);


      decorations = [
                      {"img":"../img/wave.png", "width":80, "height":50, "x":110, "y":100, "dataP":0.1},
                      {"img":"../img/wave.png", "width":60, "height":60, "x":80, "y":130, "dataP":0.2},
                      {"img":"../img/wave.png", "width":80, "height":50, "x":140, "y":450, "dataP":0.1},  //atlantic ocean
                     {"img":"../img/wave.png", "width":60, "height":60, "x":110, "y":480, "dataP":0.2},

                     {"img":"../img/wave.png", "width":80, "height":50, "x":930, "y":600, "dataP":0.1}, //indian ocean
                     {"img":"../img/wave.png", "width":60, "height":60, "x":900, "y":630, "dataP":0.2},

                     {"img":"../img/wave.png", "width":80, "height":50, "x":1500, "y":300, "dataP":0.1}, //pacific ocean - right
                     {"img":"../img/wave.png", "width":60, "height":60, "x":1500, "y":330, "dataP":0.2},

                     {"img":"../img/wave.png", "width":80, "height":50, "x":-630, "y":500, "dataP":0.1}, //pacific ocean - left
                     {"img":"../img/wave.png", "width":60, "height":60, "x":-630, "y":530, "dataP":0.2},

                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":-20, "y":280, "dataP":0.2},
                     {"img":"../img/quietwave.png", "width":70, "height":50, "x":-40, "y":310, "dataP":0.1}, //atlantic ocean
                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":-20, "y":340, "dataP":0.2},

                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":-700, "y":100, "dataP":0.2},
                     {"img":"../img/quietwave.png", "width":70, "height":50, "x":-730, "y":130, "dataP":0.1}, //pacific ocean - left
                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":-700, "y":160, "dataP":0.2},

                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":340, "y":-150, "dataP":0.2},
                     {"img":"../img/quietwave.png", "width":70, "height":50, "x":370, "y":-190, "dataP":0.1}, //artic 
                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":340, "y":-230, "dataP":0.2},

                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":430, "y":850, "dataP":0.2},
                     {"img":"../img/quietwave.png", "width":70, "height":50, "x":400, "y":890, "dataP":0.1}, //artic 
                     {"img":"../img/quietwave.png", "width":50, "height":60, "x":430, "y":930, "dataP":0.2},
                    ];

      clouds = [
               {"img":"../img/cloud.png", "width":120, "height":120, "x":220, "y":300, "dataP":0.5},
               {"img":"../img/cloud.png", "width":170, "height":170, "x":1000, "y":20, "dataP":0.4},
               {"img":"../img/cloud.png", "width":100, "height":100, "x":190, "y":180, "dataP":0.3},
               {"img":"../img/cloud.png", "width":170, "height":170, "x":-580, "y":180, "dataP":0.3},
               {"img":"../img/cloud.png", "width":120, "height":120, "x":700, "y":400, "dataP":0.2},
               ];

      var sceneParallax = g.append("g")
                  .attr("id", "scene")
                  .attr("width", width)
                  .attr("height", height);


      var deco = sceneParallax.append("g")
                  .attr("transform", "translate(140,210)")
                  .selectAll("image")
                  .data(decorations)
                  .enter()
                  .append("svg:image")
                  .attr("class", "layer")
                  .attr("data-depth", function (d) { return d.dataP; })
                  .attr("xlink:href", function (d) { return d.img; })
                  .attr("width", function (d) { return d.width; })
                  .attr("height", function (d) { return d.height; })
                  .attr("x", function (d) { return d.x; })
                  .attr("y", function (d) { return d.y; });

      var clo = sceneParallax.append("g")
                  .attr("transform", "translate(140,210)")
                  .selectAll("image")
                  .data(clouds)
                  .enter()
                  .append("svg:image")
                  .attr("class", "layer")
                  .attr("data-depth", function (d) { return d.dataP; })
                  .attr("xlink:href", function (d) { return d.img; })
                  .attr("width", function (d) { return d.width; })
                  .attr("height", function (d) { return d.height; })
                  .attr("x", function (d) { return d.x; })
                  .attr("y", function (d) { return d.y; })
                  .attr("cursor","pointer")
                  .on("click", function(){
                    var a = d3.select(this);
                    if (a.attr("class") == "layer cloudanim") {         
                          a.attr("class", "layer");
                    } else {
                          a.attr("class", "layer cloudanim");
                          setTimeout(function(){
                              a.attr("class", "layer");
                          },5000);
                          console.log("a");
                    }
                  });

      var scene = document.getElementById('scene');
      var parallax = new Parallax(scene);

                
    });


    var arrows = [{"arrow":"../img/arrow_1.png", "width": 200, "height": 200, "x": -500, "y": 700},
                  {"arrow":"../img/arrow_2.png", "width": 200, "height": 200, "x": 200, "y": 700},
                  {"arrow":"../img/arrow_3.png", "width": 200, "height": 300, "x": 900, "y": 700},
                  {"arrow":"../img/arrow_4.png", "width": 200, "height": 200, "x": 1600, "y": 80}
                  ];

    var oceanArrows = g.append("g")
                      .selectAll("image")
                      .data(arrows)
                      .enter()
                      .append("svg:image")
                      .attr("transform", "translate(140,210)")
                      .attr("xlink:href", function (d) { return d.arrow})
                      .attr("width", function (d) { return d.width})
                      .attr("height", function (d) { return d.height})
                      .attr("x", function (d) { return d.x})
                      .attr("y", function (d) { return d.y});

    var gradients = [{"gradient": "../img/sea-gradient.png", "width": 1000, "height": 1000, "x": -200, "y": -50},
                     {"gradient": "../img/sea-gradient.png", "width": 800, "height": 800, "x": 700, "y": 500},
                     {"gradient": "../img/gradient-america.png", "width": 800, "height": 800, "x": -650, "y": -200},
                     {"gradient": "../img/gradient-southamerica.png", "width": 600, "height": 900, "x": -300, "y": 300},
                     {"gradient": "../img/europe.png", "width": 3000, "height": 2500, "x": -500, "y": -1200},
                     {"gradient": "../img/oceania.png", "width": 500, "height": 500, "x": 1100, "y": 500}];

    var gradientsAttributes = g.append("g")
                              .selectAll("image")
                              .data(gradients)
                              .enter()
                              .append("svg:image")
                              .attr("transform", "translate(140,210)")
                              .attr("xlink:href", function (d) { return d.gradient})
                              .attr("width", function (d) { return d.width})
                              .attr("height", function (d) { return d.height})
                              .attr("x", function (d) { return d.x})
                              .attr("y", function (d) { return d.y});

     
    var oceanText = [{"text": "../img/pacificocean.png", "width": 200, "height": 100, "x": -550, "y": 500},
                     {"text": "../img/atlanticocean.png", "width": 200, "height": 150, "x": 80, "y": 250},
                     {"text": "../img/indianocean.png", "width": 120, "height": 30, "x": 800, "y": 550},
                     {"text": "../img/pacificocean-right.png", "width": 120, "height": 120, "x": 1500, "y": 350}
                      ];

    var textAttributes = g.append("g").selectAll("image")
                          .data(oceanText)
                          .enter()
                          .append("svg:image")
                          .attr("transform", "translate(140,210)")
                          .attr("xlink:href", function (d) { return d.text})
                          .attr("width", function (d) { return d.width})
                          .attr("height", function (d) { return d.height})
                          .attr("x", function (d) { return d.x})
                          .attr("y", function (d) { return d.y});

    /*g.attr("transform", "translate(70,70)");*/


    function zoomed() {

          var t = zoom.translate();
            var s = zoom.scale();

            //those 2 values ajust the limits of the drag, so the map dont exit completly the visible zone.
            var h = height / 1.3;
            var w = width / 1.4;

            //to calculate the zoom and the limits the map can be dragged around.
            t[0] = Math.min(width / 2 * (s - 1) + w * s, Math.max(width / 2 * (1 - s) - w * s, t[0]));
            t[1] = Math.min(height / 2 * (s - 1) + h * s, Math.max(height / 2 * (1 - s) - h * s, t[1]));

            //apply new zoom
            g.attr("transform", "translate(" + t + ")scale(" + s + ")");
    }

    function interpolateZoom (translate, scale) {
        var self = this;
        return d3.transition().duration(350).tween("zoom", function () {
            var iTranslate = d3.interpolate(zoom.translate(), translate),
                iScale = d3.interpolate(zoom.scale(), scale);
            return function (t) {
                zoom
                    .scale(iScale(t))
                    .translate(iTranslate(t));
                zoomed();
            };
        });
    }

    function zoomClick() {
        var clicked = d3.event.target,
            direction = 1,
            factor = 0.2,
            target_zoom = 1,
            center = [width / 2, height / 2],
            extent = zoom.scaleExtent(),
            translate = zoom.translate(),
            translate0 = [],
            l = [],
            view = {x: translate[0], y: translate[1], k: zoom.scale()};

        d3.event.preventDefault();
        direction = (this.id === 'zoom_in') ? 1 : -1;
        target_zoom = zoom.scale() * (1 + factor * direction);

        if (target_zoom < extent[0] || target_zoom > extent[1]) { return false; }

        translate0 = [(center[0] - view.x) / view.k, (center[1] - view.y) / view.k];
        view.k = target_zoom;
        l = [translate0[0] * view.k + view.x, translate0[1] * view.k + view.y];

        view.x += center[0] - l[0];
        view.y += center[1] - l[1];

        interpolateZoom([view.x, view.y], view.k);
    }


    d3.selectAll('button').on('click', zoomClick);
}

if(isMobile === false)
{
  createMap();
}