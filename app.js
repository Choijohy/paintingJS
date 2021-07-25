const canvas =  document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColors");
const modes = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle ="white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
// context -> way to access pixel in canvas
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event){
    var x = event.offsetX;
    var y = event.offsetY;
   
    if (!painting){
        ctx.beginPath();
        ctx.moveTo(x,y)}
    else{
        ctx.lineTo(x,y);
        if (!filling){
            ctx.stroke();
            console.log("painting");
        }
    }
}
function startPainting(event){
    painting = true;
    if (filling){
        // x,y - start point , width , height 
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function stopPainting(event) {
    painting = false;
}

function handleColorClick(event){
    color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleModeChange(event){
    if (filling === true){
        filling = false;
        event.target.innerText = "FILL";
    }else{
        filling = true;
        event.target.innerText = "PAINT";
    }
}

function handleSave(event){
    var img = canvas.toDataURL();
    var link = document.createElement("a");
    link.href = img;
    link.download = "PaintJS";
    link.click();

}

function handelCM(event){
    event.preventDefault();
}

if (canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("contextmenu",handelCM);
}   

if (range){
    range.addEventListener("input",handleRangeChange);
}

if (colors){
    Array.from(colors).forEach(color=>
        color.addEventListener("click",handleColorClick));

}

if (modes){
    modes.addEventListener("click",handleModeChange);
}

if (saveBtn){
    saveBtn.addEventListener("click",handleSave);
}