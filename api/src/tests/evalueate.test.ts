import {describe, expect, test} from '@jest/globals';
import { evaluateExpression } from '../evaluate.service';

describe('evaluateExpression function', () => {

  test('evalueates "1+2" to equal 3', () => {
    expect(evaluateExpression("1+2")).toBe(3);
  });

});