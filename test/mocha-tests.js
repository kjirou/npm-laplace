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
      expect(mock()).to.be(i / 100);
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
});
