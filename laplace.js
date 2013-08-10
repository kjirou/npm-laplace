;(function(){

  var laplace = {};


  laplace.VERSION = "0.0.2";


  // Notice:
  // execCount must be less than about 1000000.
  // If it is too larger, then it will malfunction by the cause of float calculation.
  laplace.createMock = function(execCount, roundCount){

    roundCount = roundCount || 1;

    var mock = function(){
      var self = arguments.callee;

      if (self._execIndex === self._execCount) {
        if (self._roundIndex + 1 === self._roundCount) {
          throw new Error("Execution count overflow");
        } else {
          self._execIndex = 0;
          self._roundIndex += 1;
        }
      }

      var result =  self._execIndex / self._execCount;
      self._execIndex += 1;

      // Modify result to assure the value to be greater than expected value.
      // But, I don't know details of the cause. I decide to secure it by test.
      // Also if you don't have this modifying, then it occur a bug in _.random.
      return result + 0.00000001;
    };

    mock._execCount = execCount;
    mock._roundCount = roundCount;
    mock._execIndex = 0;
    mock._roundIndex = 0;

    mock.isCompleted = function(){
      return this._execIndex === this._execCount &&
        this._roundIndex + 1 === this._roundCount;
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
