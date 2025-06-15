import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/connectDB.js'
import authRouter from './routes/auth/auth-route.js'
import adminProductsRouter from './routes/admin/product-route.js'
import shopProductsRouter from './routes/shop/products-route.js'
import shopCartRouter from './routes/shop/cart-route.js'
import shopAddressRouter from './routes/shop/address-route.js'
import shopOrderRouter from './routes/shop/order-route.js'
import shopSearchRouter from './routes/shop/search-route.js'
import shopReviewRouter from './routes/shop/review-route.js'
import adminOrderRouter from './routes/admin/order-route.js'
import featureRouter from './routes/common/feature-route.js'
const app=express()

const PORT=process.env.PORT || 5000
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:[
        'Content-Type',
        "Authorization",
        "Cache-control",
        "Expires",
        "Pragma"
    ],
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth",authRouter)
app.use('/api/admin/products',adminProductsRouter)
app.use('/api/admin/orders',adminOrderRouter)
app.use('/api/shop/products',shopProductsRouter)
app.use('/api/shop/cart',shopCartRouter)
app.use('/api/shop/address',shopAddressRouter)
app.use('/api/shop/order',shopOrderRouter)
app.use('/api/shop/search',shopSearchRouter)
app.use('/api/shop/review',shopReviewRouter)
app.use('/api/common/feature',featureRouter)






app.listen(PORT,()=>{
    connectDB()
    console.log(`Server is running on port ${PORT}`)
})


