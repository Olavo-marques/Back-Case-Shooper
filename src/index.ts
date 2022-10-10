import express from "express";
import cors from "cors";
import { productRouter } from "./router/ProductRouter";

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log('Server rodando...')
})

app.use('/user', productRouter)