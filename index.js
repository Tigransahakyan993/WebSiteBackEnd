const {db, sequelize} = require('./connection');
const Users = require('./models/user/User');
const Posts = require('./models/post/Post');
const app = require('./rout');
const auth = require('./auth');
const buf = new Buffer('password','base64');

//INSTANCES
Users.hasMany(Posts);
Posts.belongsTo(Users);

sequelize.authenticate()
    .then(() => {
        sequelize.sync()
    })
    .then(() => console.log('success'))
    .catch((err) => console.log(err))

//Get User
app.get('/users', (req,res) => {
    let sql = 'SELECT * FROM mynewdb.users';
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.status(200).json(result)
    })
});

//Get Posts
app.get('/posts', (req,res) => {
    let sql = 'SELECT * FROM mynewdb.posts';
    db.query(sql,(err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
});

//Get Posts/params
app.get('/post/:id', (req,res) => {
   Posts.findAll({
       where: {
           userId: req.params.id
       }
   })
       .then(post => res.status(200).json(post))

});

//Post User
app.post('/users', async (req,res) => {
    try {
        const user = await Users.create({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
        })
        res.status(200).json(user);
    } catch (e) {
        res.status(200).json(e)
    }
})

//Post Posts
app.post('/posts', async (req,res) => {
    try {
        const post = await Posts.create({
            userId: req.body.userId,
            post: req.body.post
        });
        console.log('bodyyyy',req.body);
        res.status(200).json(post)
    }catch (e) {
        console.log(req.body);
        res.status(200).json(e)
    }
})

//Delete User
app.delete('/users/:id', async (req,res) => {
    try {
       await Users.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(req.params.id)
    }  catch (e) {
        res.status(200).json(e)
    }
});

//Delete Posts
app.delete('/posts/:id', async (req,res) => {
    try {
        await Posts.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(req.params.id)
    }  catch (e) {
        res.status(200).json(e)
    }
});

//Update User
app.put('/users/:id', async (req,res) => {
        try{
           const data = await Users.update({
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: req.body.password
                }, {
                    where: {
                        id: req.params.id
                    }
                }
            );
            res.status(200).json(data)
        } catch (e) {
            res.status(200).json(e)
    }
});

//Update Post
app.put('/post/:id', async (req,res) => {
    try{
        const data = await Posts.update({
               post: req.body.post
            }, {
                where: {
                    id: req.params.id
                }
            }
        );
        res.status(200).json(data)
    } catch (e) {
        res.status(200).json(e)
    }
});

app.listen(4000, () => {
    console.log('Server has been started on port 4000/...')
});