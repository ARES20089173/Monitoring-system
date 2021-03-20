const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'a143843838',
    database:'CRUDDatabase',
});
app.use(cors());
app.use(express.json())

app.use(bodyParser.urlencoded({extended:true}))

app.post('/api/insert',(req,res)=>{
   const device_id=req.body.device_id
    const  nickname = req.body.nickname
    const sensor_type = req.body.sensor_type
    const last_updatetime = req.body.last_updatetime
    const sqlInsert = "INSERT INTO sensor_info (`device_id`, `nickname`,`type`,`last_update_time`) VALUES (?,?,?,?)"
    db.query(sqlInsert,[device_id,nickname,sensor_type,last_updatetime],(err,result)=>{
        console.log(result);
    })
})
app.get('/api/get',(req,res)=>{
    const sqlSelect = "SELECT device1,device2,device3 from (SELECT JSON_ARRAYAGG(JSON_OBJECT('nickname', nickname , 'type', type,'last_update_time',last_update_time,'sensor_id',sensor_id)) as 'device1' from CRUDDatabase.sensor_info where device_id=1) as a,(SELECT JSON_ARRAYAGG(JSON_OBJECT('nickname', nickname , 'type', type,'last_update_time',last_update_time,'sensor_id',sensor_id)) as 'device2' from CRUDDatabase.sensor_info where device_id=2) as b,(SELECT JSON_ARRAYAGG(JSON_OBJECT('nickname', nickname , 'type', type,'last_update_time',last_update_time,'sensor_id',sensor_id)) as 'device3' from CRUDDatabase.sensor_info where device_id=3) as c; "
    db.query(sqlSelect,(err,result)=>{
       res.send(result)
    })
})
app.listen(3001,() => {
    console.log("running on port 3001")
});