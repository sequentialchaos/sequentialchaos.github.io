function setup() {
  createCanvas(innerWidth, innerHeight)
    .parent('canvas-container')

  frameRate(20)
  background(30)
  stroke(30)

  shapes = []
  min_dimension = min(width, height)
  for (let i = 0; i < 100; i++) {
    r_min = map(min_dimension, 200, 2000, 2, 10)
    r_breadth = map(min_dimension, 200, 2000, 5, 20)
    shapes.push(new Shape({
        x: int(Math.random() * width),
        y: int(Math.random() * height),
        r: int(Math.random() * r_breadth) + int(r_min) 
    }))
  }
}

function draw() {
  for (let i = 0; i < shapes.length; i++) {
    shapes[i].draw()
  }
}

class Shape {
  constructor({x=0, y=0, r=1, fill_color='random'}={}) {
    this.x = x
    this.y = y
    this.r = r
    if (fill_color == 'random') {
      push()
      colorMode(HSB, 100, 100, 100)
      this.fill_color = color(Math.random() * 100, Math.random() * 40 + 45, Math.random() * 20 + 80)
      pop()
    } else {
      this.fill_color = fill_color
    }
  }

  draw() {
    noStroke()
    fill(this.fill_color)
    circle(this.x, this.y, this.r * 2)
  }
}