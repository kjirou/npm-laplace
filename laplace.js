;(function(){

  var laplace = function(){};


  laplace.VERSION = "0.0.0";


  // Exports
  if (typeof module !== "undefined" && module.exports) {
    module.exports = laplace;
  }
  if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
    define("laplace", function(){
      return laplace;
    });
  }
  if (typeof window !== "undefined") {
    window.laplace = laplace;
  }

}).call(this);
