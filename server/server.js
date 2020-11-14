const express = require("express");
const path = require("path");
const cors = require( "cors")
const imagesToPdf = require("images-to-pdf")


const app = express();

app.use(express.json());

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')))

app.post('/api/canvas/', async (req,res)=>{

  var base64Data = req.body.image_url.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile("out.png", base64Data, 'base64', async function(err) {
      await imagesToPdf(["out.png"], "./public/canvas.pdf")
      res.status(200).json({
        success:true,
        data: "canvas.pdf"
      })
    });

   

  });


const PORT=5000

const server = app.listen(
  PORT,
  console.log(`Server Running in mode on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Unhandled Rejection : ${err.message}`);
  server.close(() => process.exit(1));
});
