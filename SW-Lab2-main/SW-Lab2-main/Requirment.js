/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/
//Mayar Ayman 1210085
//Yousef Rafat 1190292

class Point {
  constructor(coordinateX, coordinateY) {
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width or height");
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }

  
  
  calculatePerimeter() {
    return 2 *( this.width + this.height);
  }

  updateHeight(newHeight) {
    if (newHeight && newHeight > 0) {
      this.height = newHeight;
    }
  }


 
  updateRectParameters(startingPoint, width, height) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("Invalid width or height");
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  printEndPoints() {
    const topRight = this.startingPoint.coordinateX + this.width;
    const bottomLeft = this.startingPoint.coordinateY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function drawRectangle(width, ppointX, height, ppointY) {
  const mainPoint = new Point(ppointX, pointY);
  const rectangle = new Rectangle(mainPoint, width, height);
  return rectangle;
}


function construct_square(cordinate_x, CordinateY, SquareHeight) {
  let square;
  if (!SquareHeight || SquareHeight <= 0) {
    square = buildObject(SquareHeight, cordinate_x, SquareHeight, CordinateY);
  }
  const square_area = square.area();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", square_area);
  console.log("square Perimeter ", squarePerimeter);
}

const rectangle = construct_rectangle(2, 3, 5, 4);
const square = construct_Square();

console.log(sq.calculatePerimeter());
sq.endPoints();

rectnagle.updateMyHeight(3);
