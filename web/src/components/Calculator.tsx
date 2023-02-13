import React, { useEffect, useState } from "react";

interface Button {
    value: number | string;
    type: "number" | "operator" | "equal" | "clear";
}

const buttons: Button[] = [
    { value: 1, type: "number" },
    { value: 2, type: "number" },
    { value: 3, type: "number" },
    { value: "+", type: "operator" },
    { value: 4, type: "number" },
    { value: 5, type: "number" },
    { value: 6, type: "number" },
    { value: "-", type: "operator" },
    { value: 7, type: "number" },
    { value: 8, type: "number" },
    { value: 9, type: "number" },
    { value: "*", type: "operator" },
    { value: ".", type: "operator" },
    { value: 0, type: "number" },
    { value: "=", type: "equal" },
    { value: "/", type: "operator" },
    { value: "Clear", type: "clear" },
];

function Calculator() {
    const [expression, setExpression] = useState<string>("");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const target = event.target as HTMLTextAreaElement;

        setExpression(expression + target.value);
    };

    const handleEqual = (): void => {

        // try {
        //     setExpression(eval(expression).toString());
        // } catch (e) {
        //     setExpression("error");
        // }
        fetch('http://localhost:8000/calculate')
            .then(response => response.json())
            .then(data => console.log(data));

    };

    const handleClear = (): void => {
        setExpression("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = (event: { key: string }): void => {
        const key = event.key;
        switch (key) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                setExpression(expression + key);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                setExpression(expression + key);
                break;
            case "Enter":
            case "=":
                handleEqual();
                break;
            case "Escape":
            case "Backspace":
                handleClear();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [expression]);

    return (
        <div className="App">

            <input type="text" value={expression} data-testid="result" />

            <div className="button-container">
                {buttons.map((button, index) => (
                    <button
                        key={index}
                        value={button.value}
                        data-testid={button.value}
                        onClick={
                            button.type === "equal"
                                ? handleEqual
                                : button.type === "clear"
                                    ? handleClear
                                    : handleClick
                        }
                    >
                        {button.value}
                    </button>
                )
                )}
            </div>

        </div>
    );
}

export default Calculator;
