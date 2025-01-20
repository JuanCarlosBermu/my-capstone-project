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

app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(post => post.id === postId);
    if (post) {
      res.render('edit.ejs', { post });
  } else {
      res.redirect('/views/view-post.ejs');
  }
  });

  app.post('/update/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex].title = req.body.title;
        posts[postIndex].author = req.body.author;
        posts[postIndex].date = req.body.date;
        posts[postIndex].content = req.body.content;
    }
    res.redirect('/views/view-post.ejs');
});

app.post('/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  posts = posts.filter(post => post.id !== postId); 
  res.redirect('/views/view-post.ejs');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });