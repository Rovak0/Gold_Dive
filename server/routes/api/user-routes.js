const router = require('express').Router();
const {User} = require('../../models')
//needs a get to get user data based on who is logged in
    //gets for each of the user data forms
//needs a post and a put to manage data
    //post to create new users and new financial data
    //puts to update finances
//a delete to clear data

//needs a post for login that returns a token
    //need to feed that token 

//get general user data
router.get('/', async (req, res) => {
    // const user = await User.
});

module.exports = router;