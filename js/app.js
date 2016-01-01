window.onload = function(){
        
    window.onbeforeunload = function(){
              if(window.AdMob) AdMob.showInterstitial();
        };
}