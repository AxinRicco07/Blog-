import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
const posts=[];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Use express's built-in body-parser middleware

app.get('/', (req, res) => {
    res.render('index',{posts});
});

app.get('/about',(req,res)=>{
    res.render('about');
})
app.post('/submit', (req, res) => {
    const { "post-title": postTitle, "post-content": postContent, author_name: postAuthor } = req.body;
    posts.push({ title: postTitle, content: postContent, author: postAuthor });
    res.redirect('/');
});

app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { "post-title": postTitle, "post-content": postContent, author_name: postAuthor } = req.body;
    posts[id] = { title: postTitle, content: postContent, author: postAuthor };
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    posts.splice(id, 1);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
