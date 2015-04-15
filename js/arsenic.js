/*
 *      db                          w      
 *     dPYb   8d8b d88b .d88b 8d8b. w .d8b 
 *    dPwwYb  8P   `Yb. 8.dP' 8P Y8 8 8    
 *   dP    Yb 8    Y88P `Y88P 8   8 8 `Y8P 
 *                                         
 */
(function() {
  var api = 'http://localhost:8080/api/v0.1';
  var h_tp;
  var con;

  /*
   * Stateful Sydney
   */
  function ketchup() {
    console.log("Ketchup starting spray.");
    $.ajax(api + '/alerts', {
        accept: 'application/json'
      , method: 'GET'
      , processData: true
      , success: handleKetchup
      , failure: function(data, status, xhr) {
          console.error('shit broke.', data, status, xhr);
        }
    });
  }

  function handleKetchup(data, status, xhr) {
    // TODO: add data validation
    var by_box = {};
    async.each(data, function(alert, next) {
      if(! (alert['host'] in by_box)) {
        by_box[alert['host']] = {
            alerts: []
          , host: alert['host']
          , latest: 0
        };
      }
      by_box[alert['host']]['alerts'].push(alert);
      if (alert['lastchange'] > by_box[alert['host']]['latest']) {
        by_box[alert['host']]['latest'] = alert['lastchange']
      }
      next();
    }, function(error) {
      if(typeof error !== 'undefined') {
        console.error("Something went wrong mapping alerts to hosts. Check console.");
        console.error(error);
        console.error(by_box);
        return;
      }
      // Convert by_box to array so we can async iterate over it
      async.map(Object.keys(by_box), function(boxname, callback) {
        callback(null, by_box[boxname]);
      }, redrawBoxen); // Handoff to presentation layer
    });
  }

  function redrawBoxen(err, results) {
    var target = $('#alertarea');
    if(typeof err !== 'undefined') {
      console.error("Something went wrong in by_box map flatten. Check console.");
      return;
    }
    async.each(results, function(box, next) {
      target.append(h_tp(box));
      next();
    }, noop);
  }

  /*
   * Stateless Moxxy
   */
   /*
  con.on('connect', function() {
    console.log("arsenic operational");
  });

  con.on('alert', function(alert) {
    console.log(JSON.parse(alert));

  });
  */


  /*
   * Helpers
   */
  function noop() {}

  function prep_templates(callback) {
    h_tp = Handlebars.compile($("#hosttemplate").html());
    callback();
  }

  /*
   * Gogogogogo
   */
  $(document).ready(function() {
    console.log("arsenic.js is starting...");
    prep_templates(ketchup);
    //con = io.connect(api);
  });

}());
