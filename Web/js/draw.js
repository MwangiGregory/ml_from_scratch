draw = {};

draw.path = (ctx, path, color="black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);
    for (let xy of path) {
        ctx.lineTo(...xy);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

draw.paths = (ctx, paths, color="black") => {
    for (let path of paths) {
        draw.path(ctx, path, color);
    }
}