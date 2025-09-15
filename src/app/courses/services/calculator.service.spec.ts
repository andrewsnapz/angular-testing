import { TestBed } from "@angular/core/testing";

import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

/*
  jasmine spies
  - keep track of times a function was called
  - provide a fake implementation of a function and define what values it should return
  - spy existing object or complete mock implementation of our dependencies
*/

/* 
  xdescribe - skip all tests in the describe
  xit - skip individual test
  fdescribe - only this test suite will be executed
  fit - only this test will be executed
*/
describe("CalculatorService", () => {
  let loggerSpy: any;
  let calculator: CalculatorService;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
    // uses dependency injection
    TestBed.configureTestingModule({
      providers: [
        CalculatorService, // using real instance of calculator service
        { provide: LoggerService, useValue: loggerSpy }, // using mocked dependcies
      ],
    });
    calculator = TestBed.inject(CalculatorService);
  });

  it("should add two numbers", () => {
    // pending skips the test
    // pending();

    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const result = calculator.subtract(2, 2);
    expect(result).toBe(0, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });
});
