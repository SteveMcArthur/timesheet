const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

// POST /api/timesheet
app.post('/api/timesheet', (req, res) => {
    console.log(req);
    const data = req.body; // array of updated rows
    // Save to DB or file
    fs.writeFileSync('timesheet.json', JSON.stringify(data));
    res.send({ success: true });
  });
  
  // GET /api/timesheet
  app.get('/api/timesheet', (req, res) => {
    console.log("gett");
    const data = fs.existsSync('timesheet.json') 
      ? JSON.parse(fs.readFileSync('timesheet.json'))
      : generateEmptySheet();
    res.send(data);
  });
  
  function generateEmptySheet() {
    const hours = [];
      for (let h = 8; h <= 21; h++) {
        let hour = h;
        hours.push(`${hour}:00 - ${hour + 1}:00`);
      }
  
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days.map(day => {
      const row = { day };
      hours.forEach(h => row[h] = '');
      return row;
    });
  }
  



app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));