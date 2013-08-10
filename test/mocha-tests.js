describe("laplace module", function(){

  it("Module definition", function(){
    expect(laplace).to.be.a("object");
  });

  it("VERSION", function(){
    expect(laplace.VERSION).to.match(/^\d+\.\d+.\d+(?:\.\d+)?$/);
  });

  it("createMock", function(){
    var mock = laplace.createMock(100);
    expect(mock).to.be.a("function");

    for (var i = 0; i < 100; i += 1) {
      result = mock();
      expect(result).to.be.greaterThan(i / 100);
      expect(result).to.be.lessThan((i + 1) / 100);

      if (i === 99) {
        expect(mock.isCompleted()).to.ok();
      } else {
        expect(mock.isCompleted()).not.to.ok();
      }
    }

    expect(function(){
      mock();
    }).throwError(/^Execution/);
  });

  it("Assign roundCount at to use createMock", function(){
    var mock = laplace.createMock(10, 3);

    for (var i = 0; i < 30; i += 1) {
      var rate = i % 10;
      var result = mock();
      expect(result).to.be.greaterThan(rate / 10);
      expect(result).to.be.lessThan((rate + 1) / 10);

      if (i === 29) {
        expect(mock.isCompleted()).to.ok();
      } else {
        expect(mock.isCompleted()).not.to.ok();
      }
    }

    expect(function(){
      mock();
    }).throwError(/^Execution/);
  });

  it("Check float's accuracy", function(){
    var mock = laplace.createMock(1000000);
    var success = true;

    for (var i = 0; i < 1000000; i += 1) {
      var result = mock();
      success = result >= i / 1000000;
      if (success === false) break;
      success = result < (i + 1) / 1000000;
      if (success === false) break;
    }

    expect(success).to.ok();
  });

  it("Use with Sinon.js", function(){
    var mock = laplace.createMock(100);
    var stub = sinon.stub(Math, "random", mock);

    for (var i = 0; i < 100; i += 1) {
      // _.random uses Math.random() once
      expect(_.random(0, 99)).to.be(i);
    }

    expect(function(){
      _.random();
    }).throwError(/^Execution/);

    stub.restore();
  });
});
