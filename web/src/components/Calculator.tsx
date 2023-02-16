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
    const [error, setError] = useState("");

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        const target = event.target as HTMLTextAreaElement;

        setExpression(expression + target.value);
    };

    const handleEqual = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ expression: expression.toString() })
        };
        fetch('http://localhost:8000/calculate', requestOptions)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return response.json().then(error => {throw Error(error.result)});
            })
            .then(data => {
                setExpression(data.result);
                setError("");
            })
            .catch(e => {
                setError(e.toString())
            })

    };

    const handleClear = (): void => {
        setExpression("");
        setError("");
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleKeyDown = async (event: { key: string }): Promise<void> => {
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
                await handleEqual();
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
    console.log(error);
    return (
        <div className="App">

            <input type="text" value={expression} data-testid="result" />
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

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
