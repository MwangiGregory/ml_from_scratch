class SketchPad {
    constructor(container, size=400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: white;
            box-shadow: 0px 0px 5px 3px black;
            `;
        container.appendChild(this.canvas);
        const br = document.createElement("br");
        container.appendChild(br);

        this.undoBtn = document.createElement("button");
        this.undoBtn.innerHTML = "UNDO";
        container.appendChild(this.undoBtn);

        this.clearBtn = document.createElement("button");
        this.clearBtn.innerText = "CLEAR";
        container.appendChild(this.clearBtn);

        
        this.ctx = this.canvas.getContext("2d");
        this.isDrawing = false;
        this.paths = [];
        
        this.#redraw(this.paths);
        this.#addEventListener();
    }

    #addEventListener() {
        this.canvas.onmousedown = (evt) => {
            const mouse = this.#getMouse(evt);
            this.isDrawing = true;
            this.paths.push([mouse]);
            this.ctx.moveTo(...mouse);
            // this.#redraw(this.paths); make it draw a point
        };

        this.canvas.onmousemove = (evt) => {
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                this.paths[this.paths.length - 1].push(mouse);
                this.#redraw(this.paths);
            }
        };

        this.canvas.onmouseup = () => {
            this.isDrawing = false;
        };

        this.canvas.ontouchstart = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove = (evt) => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        this.canvas.ontouchend = () => {
            this.canvas.onmouseup();
        }

        this.undoBtn.onclick = () => {
            this.paths.pop();
            this.#redraw(this.paths);
        }

        this.clearBtn.onclick = () => {
            this.paths = [];
            this.#redraw(this.paths);
        }
    }

    #redraw(paths) {
        this.ctx.clearRect(0, 0, 400, 400);
        draw.paths(this.ctx, paths);
        if (this.paths.length > 0) {
            this.undoBtn.disabled = false;
            this.clearBtn.disabled = false;
        } else {
            this.undoBtn.disabled = true;
            this.clearBtn.disabled = true;
        }
    }

    #getMouse(evt) {
        const rect = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rect.left),
            Math.round(evt.clientY - rect.top)
        ];
    }
}