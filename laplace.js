;(function(){

  var laplace = {};


  laplace.VERSION = "0.0.0";


  laplace.createMock = function(resultCount, setCount){
    setCount = setCount || 1;

    var mock = function(){
      var self = arguments.callee;
      var result =  self._results.shift();
      if (result === undefined) {
        throw new Error("Execution count overflow");
      }
      return result;
    };

    mock._results = [];

    var setIndex, resultIndex;
    for (setIndex = 0; setIndex < setCount; setIndex += 1) {
      for (resultIndex = 0; resultIndex < resultCount; resultIndex += 1) {
        mock._results.push(resultIndex / resultCount);
      }
    }

    mock.isCompleted = function(){
      return this._results.length === 0;
    };

    return mock;
  };


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
