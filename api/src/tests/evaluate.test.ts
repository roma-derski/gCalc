import {describe, expect, test} from '@jest/globals';
import { evaluateExpression } from '../evaluate.service';

describe('evaluateExpression function', () => {

  test('evaluates empty expression to 0', () => {
    expect(evaluateExpression("")).toBe(0);
  });

  test('evaluates "1+2" to equal 3', () => {
    expect(evaluateExpression("1+2")).toBe(3);
  });

  test('evalueates 0.1+0.2" to equal 0.3', () => {
    expect(evaluateExpression("0.1+0.2")).toBeCloseTo(0.3);
  });

  test('evaluates "1+2*3/4-1" to equal 1.5', () => {
    expect(evaluateExpression("1+2*3/4-1")).toBe(1.5);
  });

  test('evaluates "1++2" to throw Error', () => {
    const expectedError = "Invalid operator [++]. Only single operator symbols allowed inside expression."
    expect(() => evaluateExpression("1++2")).toThrow(new Error(expectedError));
  });

  test('evaluates "+1+2" to throw Error', () => {
    const expectedError = "Expression should begin and start with a number."
    expect(() => evaluateExpression("+1+2")).toThrow(new Error(expectedError));
  });

  test('evaluates "+1+2" to throw Error', () => {
    const expectedError = "Expression should begin and start with a number."
    expect(() => evaluateExpression("+1+2")).toThrow(new Error(expectedError));
  });

  test('evaluates "1+2.0.5" to throw Error', () => {
    const expectedError = "Invalid number [2.0.5]. Only a single dot delimiter allowed inside a number."
    expect(() => evaluateExpression("1+2.0.5")).toThrow(new Error(expectedError));
  });

  test('evaluates "1+9007199254740992" to throw Error', () => {
    const expectedError = "Number [9007199254740992] is not a safe integer."
    expect(() => evaluateExpression("1+9007199254740992")).toThrow(new Error(expectedError));
  });

  test('evaluates "1^2" to throw Error', () => {
    const expectedError = "Invalid character [^]. Only numbers with dot delimiter and [+-*/] operator symbols allowed."
    expect(() => evaluateExpression("1^2")).toThrow(new Error(expectedError));
  });

});