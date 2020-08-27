




function checkHttps(request, response, next) {
    // Check the protocol — if http, redirect to https.
    if (request.get("X-Forwarded-Proto").indexOf("https") != -1) {
      return next();
    } else {
      response.redirect("https://" + request.hostname + request.url);
    }
  }
  
  app.all("*", checkHttps)
const express = require("express");
const fs = require("fs").promises;
const app = express();


app.use(express.json());

app.get("/api/tickets/", async (req, res) => {
  const content = await fs.readFile("./data.json");
  const tickets = JSON.parse(content);
if(!req.query.searchText){
  res.send(tickets);
}
else {
    const filterText = tickets.filter((text) => 
    text.title.toLowerCase().includes(req.query.searchText))
    res.send(filterText)
}
});

app.post('/api/tickets/:ticketId/done', async(req,res)=>{
    const content = await fs.readFile('./data.json')
    let tickets = JSON.parse(content);
    try {
        const newTicket = tickets.map((item)=>{
            if(item.id === req.params.ticketId){
                item.done = true;
            }
            return item;
        });
    tickets = JSON.stringify(newTicket);
    await fs.writeFile('./data.json', tickets);
    res.send( ` ${req.params.ticketId} has done`);
    }
    catch (error) { res.send(`Got error:${error.message}`); }
    });
    
    
    app.post('/api/tickets/:ticketId/undone', async(req,res)=>{
        const content = await fs.readFile('./data.json')
        let tickets = JSON.parse(content);
        try {
            const newTicket = tickets.map((item)=>{
                if(item.id === req.params.ticketId){
                    item.done = false;
                }
                return item;
            });
        tickets = JSON.stringify(newTicket);
        await fs.writeFile('./data.json', tickets);
        res.send( ` ${req.params.ticketId} has done`);
        }
        catch (error) { res.send(`Got error:${error.message}`); }
        });
        
    
    
    

        let port;
        console.log("❇️ NODE_ENV is", process.env.NODE_ENV);
        if (process.env.NODE_ENV === "production") {
          port = process.env.PORT || 3000;
          app.use(express.static(path.join(__dirname, "../build")));
          app.get("*", (request, response) => {
            response.sendFile(path.join(__dirname, "../build", "index.html"));
          });
        } else {
          port = 3001;
          console.log("⚠️ Not seeing your changes as you develop?");
          console.log(
            "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
          );
        }
        
        // Start the listener!
        const listener = app.listen(port, () => {
          console.log("❇️ Express server is running on port", listener.address().port);
        });