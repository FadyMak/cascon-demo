App = {}
App.socket = io.connect()

var drawTools = {
    PENCIL: "pencil",
    PAINTBRUSH: "paintbrush",
    ERASER: "eraser"
};
    

var clr = "#000000";
var brs = "1";
var drawType = drawTools.PENCIL;

// Draw Function
App.draw = function(data) {
    App.ctx.strokeStyle = data.color;
    App.ctx.lineWidth = data.size;

    if (data.type == "dragstart") {
        App.ctx.beginPath()
        App.ctx.moveTo(data.x,data.y)
    } else if (data.type == "drag") {
        App.ctx.lineTo(data.x,data.y)
        App.ctx.stroke()
    } else {
        App.ctx.stroke()
        App.ctx.closePath()
    }   

    console.log(data);
}

function colorChange()
{
    if(drawType != drawTools.ERASER){
        clr = "#" + document.getElementById('colorIn').value;
    }
}

function pencil()
{
    clr = "#" + document.getElementById('colorIn').value;
    brs = brs/10;
    drawType = drawTools.PENCIL;

    //change cursor to paintbrush
    document.getElementById("canvas").style.cursor = "url('icons/pencil.png') 5 100, auto";
}

function paintBrush()
{
    clr = "#" + document.getElementById('colorIn').value;
    brs = document.getElementById('resizeIn').value;
    drawType = drawTools.PAINTBRUSH;

    //change cursor to paintbrush
    document.getElementById("canvas").style.cursor = "url('icons/paintbrush.png') 4 100, auto";
}

function eraser()
{
    clr = "#FFFFFF";
    brs = document.getElementById('resizeIn').value;
    drawType = drawTools.ERASER;

    //change cursor to eraser
    document.getElementById("canvas").style.cursor = "url('icons/eraser.png') 6 100, auto";
}

function resize()
{
    brs = document.getElementById('resizeIn').value;
    if (drawType == drawTools.PENCIL)
    {
        brs = brs/10;
    }
}

// Draw from other sockets
App.socket.on('draw', App.draw)

// Bind click and drag events to drawing and sockets.
$(function() {
    App.ctx = $('canvas')[0].getContext("2d")
    $('canvas').live('drag dragstart dragend', function(e) {
        offset = $(this).offset()
        data = {
            x: (e.clientX - offset.left),
            y: (e.clientY - offset.top),
            type: e.handleObj.type,
            color: clr,
            size: brs,
            tool: drawType
        }
        App.draw(data) // Draw yourself.
        App.socket.emit('drawClick', data) // Broadcast draw.
    })
})