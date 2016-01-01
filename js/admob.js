//admob
    function onLoad() {
        if(( /(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent) )) {
            document.addEventListener('deviceready', initApp, false);
        } else {
            initApp();
        }
    }

    var admobid = {};
    if( /(android)/i.test(navigator.userAgent) ) {
        admobid = {
            banner: 'ca-app-pub-4457719262099261/1476962432',
            interstitial: 'ca-app-pub-4457719262099261/2953695637'
        };
    } else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
        admobid = {
            banner: 'ca-app-pub-6869992474017983/4806197152',
            interstitial: 'ca-app-pub-6869992474017983/7563979554'
        };
    } else {
        admobid = {
            banner: 'ca-app-pub-6869992474017983/8878394753',
            interstitial: 'ca-app-pub-6869992474017983/1355127956'
        };
    }        
    function initApp() {
  if (! AdMob ) { console.log( 'admob plugin not ready' ); return; }
  initAd();
        // display a banner at startup
        createSelectedBanner();
    }
    function initAd(){
        var defaultOptions = {
            // bannerId: admobid.banner,
            // interstitialId: admobid.interstitial,
            // adSize: 'SMART_BANNER',
            // width: integer, // valid when set adSize 'CUSTOM'
            // height: integer, // valid when set adSize 'CUSTOM'
            position: AdMob.AD_POSITION.BOTTOM_CENTER,
            // offsetTopBar: false, // avoid overlapped by status bar, for iOS7+
            bgColor: '#3498DB', // color name, or '#RRGGBB'
            // x: integer,    // valid when set position to 0 / POS_XY
            // y: integer,    // valid when set position to 0 / POS_XY
            // isTesting: false, // set to true, to receiving test ad for testing purpose
            autoShow: true // auto show interstitial ad when loaded, set to false if prepare/show
        };
        AdMob.setOptions( defaultOptions );
        registerAdEvents();
    }
    // optional, in case respond to events or handle error
    function registerAdEvents() {
        // new events, with variable to differentiate: adNetwork, adType, adEvent
        document.addEventListener('onAdFailLoad', function(data){ 
          console.log('error: ' + data.error + 
              ', reason: ' + data.reason + 
              ', adNetwork:' + data.adNetwork + 
              ', adType:' + data.adType + 
              ', adEvent:' + data.adEvent); // adType: 'banner' or 'interstitial'
        });
        document.addEventListener('onAdLoaded', function(data){});
        document.addEventListener('onAdPresent', function(data){});
        document.addEventListener('onAdLeaveApp', function(data){});
        document.addEventListener('onAdDismiss', function(data){});
    }
    
    // click button to call following functions
    function getSelectedAdSize() {
        var i = document.getElementById("adSize").selectedIndex;
        var items = document.getElementById("adSize").options;
        return items[i].value;
    }
    function getSelectedPosition() {
        var i = document.getElementById("adPosition").selectedIndex;
        var items = document.getElementById("adPosition").options;
        return parseInt( items[i].value );
    }
    function createSelectedBanner() {
      var overlap = document.getElementById('overlap').checked;
        var offsetTopBar = document.getElementById('offsetTopBar').checked;
        AdMob.createBanner( {adId:admobid.banner, overlap:overlap, offsetTopBar:offsetTopBar, adSize: getSelectedAdSize(), position:getSelectedPosition()} );
    }
    function createBannerOfGivenSize() {
        var w = document.getElementById('w').value;
        var h = document.getElementById('h').value;
        
        AdMob.createBanner( {adId:admobid.banner,
                           adSize:'CUSTOM', width:w, height:h,
                           position:getSelectedPosition()} );
    }
    function showBannerAtSelectedPosition() {
        AdMob.showBanner( getSelectedPosition() );
    }
    function showBannerAtGivenXY() {
        var x = document.getElementById('x').value;
        var y = document.getElementById('y').value;
        AdMob.showBannerAtXY(x, y);
    }
    function prepareInterstitial() {
        var autoshow = document.getElementById('autoshow').checked;
        AdMob.prepareInterstitial({adId:admobid.interstitial, autoShow:autoshow});
    }
    function onResize(){
        var s = document.getElementById('sizeinfo');
        s.innerHTML = "web view: " + window.innerWidth + " x " + window.innerHeight;
    }
