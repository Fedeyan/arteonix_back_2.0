import express from 'express'
import morgan from 'morgan';
import cors from 'cors'

const app = express();

const origin = "https://5173-idx-arteonix-front-20-1717962073006.cluster-uf6urqn4lned4spwk4xorq6bpo.cloudworkstations.dev"


//middlewares
app.use(morgan("dev"))
app.use(cors({
    origin: origin
}))

export default app