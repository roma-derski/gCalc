export type Expression = {
    expression: string;
}

export type Result = {
    result: number;
    message?: string;
}

export function evaluateExpression(expression: string): number {
    expression = expression.replace(/\s+/g, "");
    checkOperators(expression);
    if (expression.length === 0) {
        return 0;
    }
    return evaluate(toRPN(tokenize(expression)));
}

// checking for consequtive operator symbols
function checkOperators(expression: string) {
    const invalidOperators = expression.match(/[+\-/*]{2,}/);
    if (invalidOperators) {
        throw new Error(`Invalid operator [${invalidOperators[0]}]. Only single operator symbols allowed inside expression.`);
    };
    if ((/^[+\-/*]|[+\-/*]$/).test(expression)) {
        throw new Error(`Expression should begin and start with a number.`);
    }
}

function tokenize(input: string) {
    let reader = 0;
    const tokens = [] as (string|number)[];
  
    while (reader < input.length) {
        const char = input[reader];
  
        if (/[0-9\.]/.test(char)) {
            let digits = '';
        
            // parse consequtive numbers as one
            while (reader < input.length && /[0-9\.]/.test(input[reader])) {
                digits += input[reader++];
            }

            if (/(\.)(?=.*?\1)/.test(digits)) {
                throw new Error(`Invalid number [${digits}]. Only a single dot delimiter allowed inside a number.`);
            };

            const number = parseFloat(digits);

            if (Number.isInteger(number) && !Number.isSafeInteger(number)) {
                throw new Error(`Number [${number}] is not a safe integer.`);
            }

            tokens.push(number);
            continue;
        }
        if (/[+\-/*]/.test(char)) {
            tokens.push(char);
            reader++;
            continue;
        }
        throw new Error(`Invalid character [${char}]. Only numbers with dot delimiter and [+-*/] operator symbols allowed.`);
    }
    return tokens;
}

// evaluating RPN (Reverse Polish Notation) stack
function evaluate(rpn: (string|number)[]): number {
    const stack = [];
  
    for (let reader = 0; reader < rpn.length; reader++) {
        const token = rpn[reader];
  
        if (/[+\-/*]/.test(token as string)) {
            stack.push(operate(token as string, stack));
            continue;
        }
  
        // token is a number
        stack.push(token);
    }
    return stack.pop();
}

function operate(operator: string, stack: (string|number)[]): number {
    const a = stack.pop() as number;
    const b = stack.pop() as number;
  
    switch (operator) {
        case '+':
            return b + a;
        case '-':
            return b - a;
        case '*':
            return b * a;
        case '/':
            return b / a;
    }
}

// converting stack to Reverse Polish Notation
function toRPN(tokens: (string|number)[]) {
    const operators = [];
    const rpn = [];
  
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
  
        if (typeof token === 'number') {
            rpn.push(token);
            continue;
        }
  
        if (/[+\-/*]/.test(token)) {
            while (shouldUnwindOperatorStack(operators, token)) {
                rpn.push(operators.pop());
            }
            operators.push(token);
            continue;
        }
    }
  
    for (let i = operators.length - 1; i >= 0; i--) {
        rpn.push(operators[i]);
    }
  
    return rpn;
  }
  
  const precedence = { '*': 1, '/': 1, '+': 0, '-': 0 };
  
  function shouldUnwindOperatorStack(operators: string[], nextToken: string|number): boolean {
    if (operators.length === 0) {
      return false;
    }
  
    const lastOperator = operators[operators.length - 1];
    return precedence[lastOperator] >= precedence[nextToken];
  }