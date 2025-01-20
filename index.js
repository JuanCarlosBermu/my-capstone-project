import express from 'express';
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
  });

app.get("/views/create-edit", (req, res) => {
    res.render("create-edit.ejs");
  });

app.get("/views/view-post.ejs", (req, res) => {
    res.render("view-post.ejs", { posts });
  });
 
let posts = [];

app.post("/submit" , (req, res) => {

    const id = posts.length + 1;   
    const title = req.body.title;
    const author = req.body.author;
    const date = req.body.date;
    const content = req.body.content;

    console.log( id, title, author, date, content);
     
    posts.push({ id, title, author, date, content });

    res.render("view-post.ejs", { posts });
});

app.post('/delete', (req, res) => {
  // const postId = parseInt(req.params.id, 10);
  // posts = posts.filter(post => post.id !== postId); // Elimina el blog por ID
  res.redirect('/');
});

// app.get("/delete/:index", (req, res) => {
//     const index = req.params.index;
//     posts.splice(index, 1);
//     res.render("view-post.ejs", { posts });
//   } 
// );


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });