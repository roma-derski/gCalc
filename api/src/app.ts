import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Request, Response } from 'express';
import { evaluateExpression, Expression, Result } from "./evaluate.service";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './../swagger.json';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const requestListener = function (req: Request<{}, {}, Expression>, res: Response<Result>) {
    const { expression } = req.body;
    try {
        if (expression === undefined) {
            throw new Error("[expression] is required");
        }
        if (typeof expression !== 'string') {
            throw new Error("[expression] should be a string");
        }
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
