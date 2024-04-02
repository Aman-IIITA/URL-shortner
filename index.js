const express=require('express');
const cookieParser=require('cookie-parser');
const {restrictToLoggedInUserOnly,checkAuth}=require('./middlewares/auth.js')
const connectDb=require('./connection.js');
const path=require('path');
const URL=require('./models/url.js');
const app=express();
const PORT=8001;
connectDb("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser());




//routes
const urlRouter=require('./routes/url');
const staticRouter= require('./routes/staticRouter.js');
const userRouter=require('./routes/user.js');


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
// app.get('/test',async (req,res)=>{
//   const allUrls= await URL.find({});
//   // res.json({urls: allUrls.length})
//   res.render("home",
//     {urls: allUrls,}
//   );
// });

app.use('/',checkAuth,staticRouter);

app.use('/url',restrictToLoggedInUserOnly,urlRouter);

app.use('/user',userRouter);
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    console.log(shortId);
    const entry = await URL.findOneAndUpdate(
      {
        shortID: shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    // console.log(entry);
    return res.redirect(entry.redirectUrl);
  });
app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));