const db=require('./db');
const fs = require('fs');
const XLSX = require('xlsx');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); 

const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('My Personal Portfolio Backend is Working!');
});

app.post('/contact', (req, res) => {
    console.log('CONTACT ROUTE REACHED');
    console.log(req.body);
    const { name, email, message } = req.body;
    db.query(
        "INSERT INTO contact_message(name,email,message)VALUES(?, ?, ?)",
        [name,email,message]
    );

    const filePath = 'contacts.xlsx';

    let workbook;
    let worksheet;

    if (fs.existsSync(filePath)) {
        workbook = XLSX.readFile(filePath);
        worksheet = workbook.Sheets['Contacts'];
        if(!worksheet){
            worksheet=XLSX.utils.aoa_to_sheet([
                ['Name','Email','Message']
            ]);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
        }
    } else {
        workbook = XLSX.utils.book_new();
        worksheet=XLSX.utils.aoa_to_sheet([
                ['Name','Email','Message']
            ]);
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Contacts');
    }

    XLSX.utils.sheet_add_aoa(worksheet,[[name,email,message]],{origin: -1});
    XLSX.writeFile(workbook, filePath);

    res.send('Message received and saved!');
});

const server=app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
server.on('close', () =>{
    console.log('Server closed');
});
server.on('error', (err) => {
    console.log('Server error:',err);
});
console.log("FILE IS RUNNING");