import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

const ALLOWED_ORIGINS = [
  'https://www.voiceoverguy.co.uk',
  'https://voiceoverguy.co.uk',
];

if (process.env.NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:22333');
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin) || (origin && origin.endsWith('.vercel.app')) || (origin && origin.endsWith('.picard.replit.dev'))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

export default app;
