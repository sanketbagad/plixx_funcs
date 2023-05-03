import functions from 'firebase-functions';
// import admin from 'firebase-admin';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRouter from './Routes/UserRoutes.js';
import movieRouter from './Routes/MoviesRoutes.js';
import categoryRouter from './Routes/CategoriesRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import uploadRouter from "./Controllers/UploadFile.js";
import movRouter from "./Routes/movieroutes2.js";
import paymentRouter from './middleware/stripeMiddleware.js';
import trailerRouter from './Controllers/UploadTrailer.js';
import loginMovieRouter from './Routes/LoginMovieRoutes.js';
import bunnyRouter from './Controllers/BunnyUploader.js';
import { createProxyMiddleware } from 'http-proxy-middleware';
import PornRouter from './Controllers/PornController.js';
dotenv.config();

// initializeApp({
//     credential: admin.credential.cert(serviceAcc),
//     databaseURL: "https://plixx-72d54-default-rtdb.firebaseio.com"
// });


const api = express();

api.use(cors());
api.use(express.json({
    limit: '500mb',
    verify: function (req, res, buf) {
        if (req.originalUrl.startsWith('/webhook')) {
            req.rawBody = buf.toString();
        }
    },
}));

api.use(express.urlencoded({
    limit: '500mb',
    extended: true
}));

connectDB();

api.get('/', (req, res) => {
    res.send('Pallu, A Gift for you');
});

api.use('/api/users', userRouter);
api.use('/api/movies', movieRouter);
api.use('/api/categories', categoryRouter);
api.use('/api/upload', uploadRouter);
api.use('/api/mov', movRouter);
api.use('/api/payment', paymentRouter);
api.use('/api/trailer', trailerRouter);
api.use('/api/loginMovies', loginMovieRouter);
api.use('/api/bunny', bunnyRouter);
api.use('/api/bunnycdn', createProxyMiddleware({
    target: 'https://storage.bunnycdn.com',
    changeOrigin: true,
    headers: { 'Access-Control-Allow-Origin': 'https://plixx.co.in', 'AccessKey': "a0c10732-5ac0-49af-a2fc3fca8d22-57d5-43d6" },
    pathRewrite: {
        '^/bunnycdn': ''
    }
}));
api.use('/api/porn', PornRouter)



api.use(errorHandler);

// let PORT = process.env.PORT || 5000;

// api.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//     }
// );

export const app = functions.https.onRequest(api);