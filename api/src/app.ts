import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from 'express';
import { evaluateExpression, Expression, Result } from "./evaluate.service";

const host = process.env.HOST || 'localhost';
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const app = express();
app.use(bodyParser.json());

const requestListener = function (req: Request<{}, {}, Expression>, res: Response<{}, {}, Result>) {
    const { expression } = req.body;

    if (expression === undefined) {
        return res.status(400).json({message: "[expression] is required"});
    }
    
    try {
        const calcResult = evaluateExpression(req.body.expression);
        return res.status(200).json({result: calcResult});
    } catch (e) {
        return res.status(400).json({result: e.message});
    }
    
};

app.post("/calculate", requestListener);
app.use("*", (req, res) => {
    res.status(404).json({
        message: "Wrong path. Please use [POST /calculate]"
    })
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
