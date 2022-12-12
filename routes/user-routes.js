const express = require('express');
const router = express.Router();

const { login, createUser, updateUser, updateUserCardInfo, updateBillingAddress } = require('../../controllers/user-controller');


// import middleware
const { authMiddleware } = require('../../libs/auth');





// login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const { token, user } = await login(req.body);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json(error);
    }
})

// Signup
router.post('/', async (req, res) => {
    try {
        const { token, user } = await createUser(req.body);
        res.json({ token, user });
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/', async (req, res) => {
    try {
        console.log("Update Route req.body", req.body);
        let response = await updateUser(req.body)
        res.json({ message: "Success" });
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put('/cardinfo/:username', async (req, res) => {
    try {
        console.log("Update cardinfo Route req.body", req.body);
        console.log("Update Route username", req.params.username);
        let response = await updateUserCardInfo(req.body, req.params.username)
        res.json({ message: "Success" });
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put(`/billingAddress/:userId`, async (req, res) => {
    try {
        let response = await updateBillingAddress(req.body, req.params.userId);
        res.json({ message: "Success", response });
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;