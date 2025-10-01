import express from "express";
import { join } from "path";

const app = express();
const PORT = 62041;

app.set("trust proxy", true);


app.use("/assets", express.static(join(process.cwd(), "public/assets")));
app.get("/", (req, res) => {
	const realIp = req.headers["x-real-ip"] || req.ip;
    // console.log("Request received at / from", realIp);
    
    let event = GetRandomEvent();
    
    console.log("Request received at / from", realIp);
    console.log(`Request Result: ${event.type} - ${event.path}`);
    
    if(event.type === "file"){
        return res.sendFile(join(process.cwd(), event.path), (err) => {
            if (err) {
                console.error("sendFile error:", err);
                return res.sendFile(join(process.cwd(), "public/index.html"));
            }
        });
	}
	
	if(event.type === "redirect"){
		return res.redirect(event.path);
	}

	if(event.type === "err"){
		return res.json({
			ok: false,
			code: 403,
			error: "fuck you"
		});

	}
	
    return res.sendFile(join(process.cwd(), "public/index.html")); // fallback
});


const rickRollAddr = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

let lucNsfw = [
	"https://e621.net/posts/5821892",
	"https://e621.net/posts/5854588",
	"https://e621.net/posts/5779393",
	"https://e621.net/posts/5772345",
	"https://e621.net/posts/5747343"
]

let sonicFeet = [
	"https://www.reddit.com/r/MoonPissing/comments/1eeiqwa/official_sonic_feet/",
	"https://i1.sndcdn.com/artworks-ClzC0yWxf5XmWB8b-i8yrNw-t1080x1080.jpg",
	"https://i.imgflip.com/7qelpt.jpg?a488706"
]

const basedDeptGif = "https://i.kym-cdn.com/photos/images/original/002/447/167/24b.gif";

let tf2Gifs = [
	"https://media.tenor.com/EeyRHX8vzNQAAAAi/team-fortress-2-dance.gif",
	"https://media.tenor.com/U6CsNK6Qy7QAAAAi/tf2-spy.gif",
	"https://media.tenor.com/UdKRaguLkikAAAAi/mann.gif",
	"https://c.tenor.com/bhH8Aq-LuPgAAAAC/tenor.gif",
	"https://media.tenor.com/G_Y3U2j_iwkAAAAi/heavy-heavy-tf2.gif"
]

const whenTheLink = "https://reddit.com/r/whenthe";

const refPostLink = "https://www.reddit.com/r/whenthe/comments/1nvc2t4/i_wasted_25_on_this_joke_please_laugh/";

const staticGifLink = "https://i.kym-cdn.com/entries/icons/medium/000/040/630/Metal_Gear_Rising_-_Jetstream_Sam_DLC_S_Rank_-_Revengeance_Difficulty_1-58_screenshot.png";

const screamerLink = "https://www.youtube.com/watch?v=OL94hTjUX7c";

const errorEndpoint = "err";

function GetRandomEvent(){
	
	let eventDat = {
		path: "public/index.html",
		type: "file" // types: "file", "redirect"
	}
	
	let rickroll = GetRand(1, 1000); // chance to redirect to rickroll
	let lucnsfw = GetRand(1, 10000); // chance to show lucario nsfw
	let sonicfeet = GetRand(1, 5000); // chance to show sonic feet pics
	let baseddept = GetRand(1, 200); // chance to show based dept. gif
	let tf2gif = GetRand(1, 777); // chance to show any tf2 gif
	let whenthe = GetRand(1, 3000); // chance to serve whenthe
	let refpost = GetRand(1, 7777); // chance to redir to the ref post
	let staticGif = GetRand(1, 100); // chance to show static img of gif
	let screamer = GetRand(1, 400); // chance to get screamer
	let showErrorLol = GetRand(1, 404); // chance to serve error
	
	if(rickroll){
		eventDat.path = rickRollAddr;
		eventDat.type = "redirect";
	}
	
	if(lucnsfw){
		eventDat.path = pickRandom(lucNsfw);
		eventDat.type = "redirect";
	}

	if(sonicfeet){
		eventDat.path = pickRandom(sonicFeet);
		eventDat.type = "redirect";
	}

	if(baseddept){
		eventDat.path = basedDeptGif;
		eventDat.type = "redirect";
	}

	if(tf2gif){
		eventDat.path = pickRandom(tf2Gifs);
		eventDat.type = "redirect";
	}

	if(whenthe){
		eventDat.path = whenTheLink;
		eventDat.type = "redirect";
	}

	if(refpost){
		eventDat.path = refPostLink;
		eventDat.type = "redirect";
	}

	if(staticGif){
		eventDat.path = staticGifLink;
		eventDat.type = "redirect";
	}

	if(screamer){
		eventDat.path = screamerLink;
		eventDat.type = "redirect";
	}

	if(showErrorLol){
		eventDat.path = errorEndpoint
		eventDat.type = "err";
	}
	
	return eventDat;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function GetRand(success, total) {
    return Math.random() < success / total;
}


app.listen(PORT, () => console.log(`Server running @ http://localhost:${PORT}`));
