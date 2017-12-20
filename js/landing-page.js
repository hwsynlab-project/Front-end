const APPID     = 'HWSynLabProjectTest01';
const APPKEY    = 'VmfvpjCP4SeH7uV';
const APPSECRET = 'o9Lw1E8dFCaEMA0jC0PMcZiEx';
const ALIAS = "frontpage";
const thing = "NodeMCU1";
var audio = new Audio('alarm.wav');
var flag =true;
var microgear = Microgear.create({
            key: APPKEY,
            secret: APPSECRET,
			alias:ALIAS
        });
(function($) {
  "use strict"; // Start of use strict
  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });



})(jQuery); // End of use strict

  document.getElementById("findField")
      .addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13) {
          document.getElementById("searchbtn").click();
      }
  });
      window.onscroll = function() {scrollFunction()};
      function topFunction() {
    document.documentElement.scrollTop = 0;
}
      $('#noti').change(function(){
      	if ($('#noti').is(":checked")) {
      		$('#ActLog').html($('#ActLog').html()+'<br>'+"turn the notfiication on at " + new Date());
      		flag=true;
      	}
      	else {
      		var date = new Date();
      		$('#ActLog').html($('#ActLog').html()+'<br>'+"turn the notification off at " + new Date());
      		flag=false;
      		

      	}
      });
      $('#sett').change(function(){
      	if ($('#sett').is(":checked")) {
      		$('#ActLog').html($('#ActLog').html()+'<br>'+"turn the alert on at "+new Date());
      		microgear.chat(thing,"ON");
      	}
      	else {
      		$('#ActLog').html($('#ActLog').html()+'<br>'+"turn the alert off at "+new Date());
      		microgear.chat(thing,"OFF");

      	}
      });
      microgear.on('message',function(topic,msg){
      	if (msg == "alert") {
      		$('#ActLog').html($('#ActLog').html()+'<br>'+"Someone is around at "+new Date());
      		if(flag) {
      			audio.play();
      			alert("Someone is around at "+new Date());
      		}
      	}
      });
      microgear.on('connected', function() {
			microgear.setAlias(ALIAS);
        });
      microgear.connect(APPID);

function scrollFunction() {
    if (document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
}


function FindNext () {
      var str = document.getElementById ("findField").value;
      if (str == "") {
          alert ("Please enter some text to search!");
          return;
      }

      var supported = false;
      var found = false;
      if (window.find) {        // Firefox, Google Chrome, Safari
          supported = true;
              // if some content is selected, the start position of the search
              // will be the end position of the selection
          found = window.find (str);
      }
      else {
          if (document.selection && document.selection.createRange) { // Internet Explorer, Opera before version 10.5
              var textRange = document.selection.createRange ();
              if (textRange.findText) {   // Internet Explorer
                  supported = true;
                      // if some content is selected, the start position of the search
                      // will be the position after the start position of the selection
                  if (textRange.text.length > 0) {
                      textRange.collapse (true);
                      textRange.move ("character", 1);
                  }

                  found = textRange.findText (str);
                  if (found) {
                      textRange.select ();
                  }
              }
          }
      }

      if (supported) {
          if (!found) {
              alert ("The following text was not found:\n" + str);
          }
      }
      else {
          alert ("Your browser does not support this example!");
      }
  }
