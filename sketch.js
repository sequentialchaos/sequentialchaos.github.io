function setup() {
  frameRate(6)
  looping = true

  createCanvas(innerWidth, innerHeight, P2D).parent('canvas-container')
  background_color = color(20)
  colorMode(HSB, 1000)

  hex_grid = new HexGrid({
    w: width, 
    h: height, 
    num_columns: 12,
    stroke_color: background_color
  })

  num_hexes = hex_grid.num_columns * hex_grid.num_rows
  rng_volatile_hexes = num_hexes * 0.23
  max_volatile_hexes = num_hexes * 0.25

  hex = new Hex()
}

function draw() {
  background(background_color)
  stroke(background_color)
  hex_grid.draw()
  if (frameCount % 12 == 0) {
    new_color = hex.generateRandomColor()
    num_volatile_hexes = max_volatile_hexes - Math.random() * rng_volatile_hexes + 1
    print(num_volatile_hexes)
    for (let i = 0; i < num_volatile_hexes; i++) {
      random_hex_index = int(Math.random() * hex_grid.hexes.length)
      random_hex = hex_grid.hexes[random_hex_index]
      random_hex.fill_color = new_color
    }
  }
}

function windowResized() {
  resizeCanvas(innerWidth, innerHeight)
  hex_grid = new HexGrid({
    w: width, 
    h: height, 
    num_columns: 12,
    stroke_color: background_color
  })
}

function mousePressed() {
  if (looping) {
    noLoop()
    looping = false
  } else {
    loop()
    looping = true
  }
}

class Hex {
  constructor({cx=0, cy=0, r=50, fill_color="random", stroke_color="none", stroke_weight="1"}={}) {
    this.cx = cx
    this.cy = cy
    this.r = r
    this.fill_color = fill_color
    if (this.fill_color == 'random') {
      this.fill_color = this.generateRandomColor()
    }
    this.stroke_color = stroke_color
    this.stroke_weight = stroke_weight
    this.points = this.calculatePoints()
    this.on = false
  }

  draw() {
    fill(this.fill_color)
    if (this.stroke_color != "none") {
      strokeWeight(this.stroke_weight)
      stroke(this.stroke_color)
    } else {
      noStroke()
    }
    beginShape()
    for (let i = 0; i < this.points.length; i++) {
      let p = this.points[i]
      vertex(p.x, p.y)
    }
    endShape()
  }

  calculatePoints() {
    let points = []
    let start_angle = PI / 6
    for (let i = 0; i < 6; i++) {
      let angle = start_angle + map(i, 0, 6, 0, TWO_PI)
      let x = this.cx + this.r * cos(angle)
      let y = this.cy + this.r * sin(angle)
      points.push(createVector(x, y))
    }
    return points
  }



  generateRandomColor() {
    push()
    colorMode(HSB, 1000, 1000, 1000)
    let random_color = color(
      int(Math.random() * 300) + 450,
      int(Math.random() * 100) + (1000 - 100 + 1),
      int(Math.random() * 250) + (900 - 250 + 1) 
    )
    pop()
    return random_color
  }
}

class HexGrid {
  constructor({x=0, y=0, w=100, h=100, num_columns=5}={}) {
    this.x_start = x
    this.y_start = y
    this.w = w
    this.h = h
    this.r = int(w / num_columns / 2)
    this.a = this.r * Math.cos(PI / 6)
    this.num_columns = num_columns + 2
    this.num_rows = int(h / (this.r * 1.5)) + 2 
    this.hexes = this.getHexes()
  }

  draw() {
    for (let i = 0; i < this.hexes.length; i++) {
      this.hexes[i].draw()
    }
  }

  getHexes() {
    let hexes = []
    let y = this.y_start
    for (let row = 0; row < this.num_rows; row++) {
      let x = row % 2 == 0 ? this.x_start : this.x_start - this.r
      for (let col = 0; col < this.num_columns; col++) {
        hexes.push(new Hex({
          cx: x,
          cy: y,
          r: this.r
        }))
        x += this.r * 2
      }
      y += this.a * 2
    }
    return hexes
  }
}