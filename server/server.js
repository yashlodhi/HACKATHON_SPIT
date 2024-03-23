const express = require('express') ; 
const app = express() ; 
const cors = require('cors') ; 

const Port = 9000; 

app.use(cors({
    origin: '*'
})) ; 

app.get( '/getDashboardData', async(req, res) => {
    let data = []; 
    
    res.status(200).json(data) ;  
}) ; 

app.listen( Port, () => console.log(`SERVER IS RUNNING ON PORT ${Port}`)) ; 