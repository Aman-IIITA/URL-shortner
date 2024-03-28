const express=require('express');
const connectDb=require('./connection.js');
const urlRouter=require('./routes/url');
const URL=require('./models/url.js');
const app=express();
const PORT=8001;
connectDb("mongodb://127.0.0.1:27017/short-url");
app.use(express.json());

app.use('/url',urlRouter);
app.get("/:shortId", async (req, res) => {
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