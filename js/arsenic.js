/*
 *      db                          w      
 *     dPYb   8d8b d88b .d88b 8d8b. w .d8b 
 *    dPwwYb  8P   `Yb. 8.dP' 8P Y8 8 8    
 *   dP    Yb 8    Y88P `Y88P 8   8 8 `Y8P 
 *                                         
 */
(function() {
  var api = 'http://localhost:8081';
  var con;

  // TODO: Ask sydney for catchup data.

  /*
   * Stateful Sydney
   */

  /*
   * Stateless Moxxy
   */
  con.on('connect', function() {
    console.log("arsenic operational");
  });

  con.on('alert', function(alert) {
    console.log(JSON.parse(alert));

  });


  /*
   * Helpers
   */

  /*
   * Gogogogogo
   */
  $(document).ready(function() {
    console.log("arsenic.js is starting...");
    con = io.connect(api);
  });

}());
