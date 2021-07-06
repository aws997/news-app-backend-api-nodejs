router.get("/test", async (req, res) => {


    const pr=new Post();
     const posts = await Post.countDocuments({ userId: 'parameter' });
     console.log(posts)
     res.status(200).json(posts);
   });



   MONGO_URI = mongodb+srv://aws:eLHM5mHTKabF_qa@cluster0.3yjsw.mongodb.net/blog?retryWrites=true&w=majority
TOKEN_SECRET = asczxvcnbhbmhgirwrfsdfvzfxhfgkhjupo[l;kl'[]yuifghdftsdfsd]           