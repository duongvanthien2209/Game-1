function MyGame() {
    this.canvas = null;
    this.context = null;
    this.width = 500;
    this.height = 600;
    this.color = '#f1f1f1f1';

    this.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    this.pause = function() {
        clearInterval(this.interval);
    }

    this.init = function() {
        //  Bind function
        this.clear = this.clear.bind(this);
        this.pause = this.pause.bind(this);

        //  Create Canvas
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.height = this.height;
        this.canvas.width = this.width;
        this.canvas.style.backgroundColor = this.color;
        this.canvas.style.border = '1px solid black';
        document.body.appendChild(this.canvas);

        //  Create Component
        var piece = new Component(0, 300, 30, 30, 'red', this.context);
        var block1 = new Component(this.width, 0, 30, 150, 'blue', this.context);
        var block2 = new Component(this.width, this.height-150, 30, 150, 'blue', this.context);
        var block3 = new Component(this.width, 0, 30, 170, 'blue', this.context);
        var block4 = new Component(this.width, this.height-150, 30, 150, 'blue', this.context);
        this.interval = setInterval(() => {
            this.clear();
            piece.createStaticComponent();
            block1.x -= 1;
            block2.x -= 1;
            block1.createComponent();
            block2.createComponent1();
            if(block1.x <= 250 || block3.x < this.width)
            {
                block3.x -= 1;
                block4.x -= 1;
                block3.createComponent();
                block4.createComponent1();
            }
            
            if((piece.x + piece.width >= block1.x) && (piece.y <= block1.height || piece.y + piece.height >= block2.y))
            {
                this.pause();
            }
            if((piece.x + piece.width >= block3.x) && (piece.y <= block3.height || piece.y + piece.height >= block4.y))
            {
                this.pause();
            }
        }, 20);

        //  Button Event
        var buttons = document.getElementById('buttons');
        var pauseButton = document.getElementById('pause');
        buttons.addEventListener('click', event => {
            var x = parseInt(event.target.dataset.x);
            var y = parseInt(event.target.dataset.y);
            if(event.target.dataset.x && event.target.dataset.y)
            {
                piece.x += x*5;
                piece.y += y*5;
            }
        });
        pauseButton.addEventListener('click', this.pause);
    }
}

function Component(x, y, width, height, color, context) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.context = context;
    this.context.fillStyle = color;
    this.speed = 10;
    this.createStaticComponent = function() {
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
    this.createComponent = function() {
        if(this.x === -this.width)
        {
            this.x = 500;
            this.height = 150 + Math.round(parseFloat(Math.random()).toFixed(3)*1000/9);
        } 
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }
    this.createComponent1 = function() {
        if(this.x === -this.width)
        {
            this.x = 500;
            this.height = 150 + Math.round(parseFloat(Math.random()).toFixed(3)*1000/9);
        } 
        this.context.fillRect(this.x, 600-this.height, this.width, this.height);
    }
}

var game = new MyGame();
game.init();