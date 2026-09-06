const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    console.log("MT5 DATA:", req.body);

    res.status(200).json({
        success: true
    });
});

module.exports = router;