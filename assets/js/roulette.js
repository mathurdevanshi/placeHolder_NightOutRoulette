////////////////////////////////////////////////////////OUR VARIABLES AND ARRAYS//////////////////////////////////
//---------------------------------------------------------------------------------------------changing arrays
function setArrayChillNight(){
    console.log("YOU ARE IN THE Chill Night");
    options=["quiet restaurant","wine bar", "play pool", "coffee shop", "sip and paint", "axe throwing", "hooka bar", "tabletop games", "drive inn"];
  }
  function setArrayFamilyNight(){
    console.log("YOU ARE IN THE family night");
    options=["moives","pizza night","swap meet","roller skating","mini golf","ice cream","arcades","amusement park","karaoke"];
  }
  function setArrayFriendsNight(){
    console.log("YOU ARE IN THE friends night");
    options=["bowling","esacpe rooms","arcades","clubbing","sip and paint","karaoke","dueling piano bar","bar hopping","dance lessons"];
  }
  function setArrayColleaugeNight(){
    console.log("YOU ARE IN THE colleagues night");
    options=["paint and sip","arcades","brewery","winery","lazer tag","sushi","dinner and drinks","happy hour","axe throwing"];
  }
  function setArrayCouplesNight(){
    console.log("YOU ARE IN THE couples night");
    options=["pizza and beer","bowling","esacpe rooms","arcades","sip and paint","karaoke","dueling piano bar","bar hopping","dance lessons"];
  }
  function setArrayDateNight(){
    console.log("YOU ARE IN THE date night");
    options=["bowling","axe throwing","coffee shop","arcades","sip and paint","karaoke","dueling piano bar","bar hopping","dance lessons"];
  }
  //---------------------------------------------------------------------------------------------VARIABLES
  var options = ["  ","  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "];
  var resultName;
  var resultImageURL;
  var resultAddressLine1;
  var resultAddressLine2;
  var resultPhone;
  var resultRating;
  var resultURL;
  var resulttext;
  var cityName;
  var stateName;
  var string;
  var text;
  ////////////////////////////////////////////////////////ROULETTE CODE//////////////////////////////////
  var startAngle = 0;
  var arc = Math.PI / (options.length / 2);
  var spinTimeout = null;
  
  var spinArcStart = 10;
  var spinTime = 0;
  var spinTimeTotal = 0;
  var placeholder;
  var ctx;
  
  
  
  document.getElementById("spin").addEventListener("click", function (event){
    event.preventDefault();
    
    spin();
  });
  
  function byte2Hex(n) {
    var nybHexString = "0123456789ABCDEF";
    return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
  }
  
  function RGB2Color(r,g,b) {
      return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
  }
  
  function getColor(item, maxitem) {
    var phase = 0;////////////0These affect the hue and stuff like that of the colors in the wheel
    var center = 128;////////128
    //var width = 200;/////////127
    var frequency = Math.PI*2/maxitem;
    
    //red   = Math.sin(frequency*item+2+phase) * width + center;//The 2, 0, and 4 affect the colors of the wheel
    //green = Math.sin(frequency*item+2+phase) * width + center;//
    //blue  = Math.sin(frequency*item+1+phase) * width + center;//
    red   = Math.sin(frequency*item+2+phase) * center;//The 2, 0, and 4 affect the colors of the wheel
    green = Math.sin(frequency*item+0+phase) * center;//
    blue  = Math.sin(frequency*item+4+phase) * center;//
    
    return RGB2Color(red,green,blue);
  }
  
  function drawRouletteWheel() {
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      var outsideRadius = 240;//////////Makes outside wheel radius bigger if number increases
      var textRadius = 160;/////////////Makes Text move towards the exterior the higher the number
      var insideRadius = 100;///////////Makes inside radius bigger if number decreases
  
      ctx = canvas.getContext("2d");
      ctx.clearRect(0,0,500,500);
  
      ctx.strokeStyle = "black";//////////This is the color of the Outline
      ctx.lineWidth = 5;////////////////This is the width of the outside,inside and one line of the radius.
  
      ctx.font = 'bold 12px Helvetica, Arial';///////This is the style for the font in the wheel
  
      for(var i = 0; i < options.length; i++) {
        var angle = startAngle + i * arc;
        //ctx.fillStyle = colors[i];
        ctx.fillStyle = getColor(i, options.length);
  
        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
  
        ctx.save();
        //ctx.shadowOffsetX = -1;
        //ctx.shadowOffsetY = -1;
        //ctx.shadowBlur    = 20; /////////////////////////////////////use to be 0This affects how sparse the shadow is. So the more negative the number the bolder it will become.
        //ctx.shadowColor   = "rgb(220,220,220)"; ////////////////////This is the shadow color of the fonts in the wheel.
        ctx.fillStyle = "white";///////////////////////////////////font in wheel color.
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius, 
                      250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        var text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      } 
      
      //Arrow
      ctx.fillStyle = "#85275b";///////////Arrow color
      ctx.beginPath();
      ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
      ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
      ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
      ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
      ctx.fill();
    }
  }
  
  function spin() {
    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1300;//////////If want to change the time of the spin then change the last number on this line.
    rotateWheel();
  }
  
  function rotateWheel() {
    spinTime += 30;
    if(spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout('rotateWheel()', 30);
  }
  
  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    var degrees = startAngle * 180 / Math.PI + 90;
    var arcd = arc * 180 / Math.PI;
    var index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();
    ctx.font = 'bold 30px Helvetica, Arial';/////////////////////Font style of the results that appear in the middle of wheel
    text = options[index];
        console.log("HERE IS TEXT", text, " HERE IS options[index]", options[index]);
    string=text;
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();
    ////////////////////////////////////////////////////////OUR CODE//////////////////////////////////////////
    //---------------------------------------------------------------------------------------------VARIABLES
    var area="location=" + cityName+stateName;
    
    stringLength=string.length;
        console.log(stringLength);
    for (i=0; i<stringLength;i++){
      string=string.replace(" ","_");
    }
    console.log(string);
    var term="term="+ string;
    //---------------------------------------------------------------------------------------------AJAX CALL
    queryURL = "https://yelp-test-beast-coders.herokuapp.com/business/search/" + area + "&" + term;
    var apiKey="OZpDFQVOqnln_GHOPgCydUdo3Ce1IzKxvdzL7qXezxZhjATA2kC3Kw72LE_Vntan_m0mU70rj0KZ0ptxv3vE2wqUMCt2ID_wjXTFF1Tamrd6ASEdFJM5p1v2LCCHXHYx"
      $.ajax({
        url: queryURL,
        dataType: 'json',
        contentType: 'json',
        headers: {
          'Authorization':'Bearer OZpDFQVOqnln_GHOPgCydUdo3Ce1IzKxvdzL7qXezxZhjATA2kC3Kw72LE_Vntan_m0mU70rj0KZ0ptxv3vE2wqUMCt2ID_wjXTFF1Tamrd6ASEdFJM5p1v2LCCHXHYx',
      },
        method: 'GET',
        dataType: 'json',
      })
      .then(function(response){
        console.log(response);
        displayResults(response);
      }); 
  }
  
  function easeOut(t, b, c, d) {
    var ts = (t/=d)*t;
    var tc = ts*t;
    return b+c*(tc + -3*ts + 3*t);
  }
  
  drawRouletteWheel();
  //---------------------------------------------------------------------------------------------DISPLAY RESULTS
  function displayResults(results){
    $("#results").empty();
//
    console.log(results.businesses.length);
    if(results.businesses.length==0){
        console.log("THE ARRAY IS EMPTY");
        resulttext=$("<p>").text("Oops! It seems like there is nothing for "+ text+" in your area. Let's spin again.");
        $("#results").append(resulttext);
    }
    else if (results.businesses.length<5){
        console.log("ARRAY IS LESS THAN 5");
        resulttext=$("<p>").text("HERE ARE YOUR RESULTS");
        $("#results").append(resulttext);
        for (i=0; i<results.businesses.length; i++){
        resulttext=$("<p>").text("OPTION "+(i+1));
        $("#results").append(resulttext);
      resultName=results.businesses[i].name;
        resulttext=$("<p>").text("Name of the place: "+resultName);
        $("#results").append(resulttext);
      resultAddressLine1=results.businesses[i].location.display_address[0];
        resulttext=$("<p>").text("Address: "+resultAddressLine1);
        $("#results").append(resulttext);
      resultAddressLine2=results.businesses[i].location.display_address[1];
        resulttext=$("<p>").text(resultAddressLine2);
        $("#results").append(resulttext);
      resultPhone=results.businesses[i].phone;
        resulttext=$("<p>").text("Phone Number: "+resultPhone);
        $("#results").append(resulttext);
      resultRating=results.businesses[i].rating;
        resulttext=$("<p>").text("Rating: "+resultRating+"/5");
        $("#results").append(resulttext);
      resultURL=results.businesses[i].url;
        resulttext=$("<p>").text("Link to their website: "+resultURL);
        $("#results").append(resulttext);
        resulttext=$("<p>").text("");
        $("#results").append(resulttext);
        }
    }
    else{
      resulttext=$("<p>").text("HERE ARE YOUR RESULTS");
        $("#results").append(resulttext);
        for (i=0; i<5; i++){
        resulttext=$("<p>").text("OPTION "+(i+1));
        $("#results").append(resulttext);
      resultName=results.businesses[i].name;
        resulttext=$("<p>").text("Name of the place: "+resultName);
        $("#results").append(resulttext);
      resultAddressLine1=results.businesses[i].location.display_address[0];
        resulttext=$("<p>").text("Address: "+resultAddressLine1);
        $("#results").append(resulttext);
      resultAddressLine2=results.businesses[i].location.display_address[1];
        resulttext=$("<p>").text(resultAddressLine2);
        $("#results").append(resulttext);
      resultPhone=results.businesses[i].phone;
        resulttext=$("<p>").text("Phone Number: "+resultPhone);
        $("#results").append(resulttext);
      resultRating=results.businesses[i].rating;
        resulttext=$("<p>").text("Rating: "+resultRating+"/5");
        $("#results").append(resulttext);
      resultURL=results.businesses[i].url;
        resulttext=$("<p>").text("Link to their website: "+resultURL);
        $("#results").append(resulttext);
        resulttext=$("<p>").text("");
        $("#results").append(resulttext);
    }
  };
}
  //---------------------------------------------------------------------------------------------LOCATION FORM
  $('form').on('submit', function (event) {
    event.preventDefault();
    cityName=$("#city").val();
    stateName=$("#state").val();
    var thisForm = $(this);
    var thisAlert = thisForm.data('alert');
    var canSubmit = true;
    thisForm.find('input[type=text]').each(function(i) {
        var thisInput = $(this);
        if ( !$.trim(thisInput.val()) ) {
            thisAlert += '\n' + thisInput.data('alert');
            canSubmit = false;
        };
    });
    if( !canSubmit ) {
        alert( thisAlert );
        return false;
    }
  });