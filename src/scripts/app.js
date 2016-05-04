// import MyShape from './main-public';
import MyShape from './main-private';

document.getElementById('heightBlock').style.display = 'none';
document.getElementById('radiousBlock').style.display = 'none';

let selectedShapes = document.querySelectorAll('input[type=radio]');
let selectedShape = selectedShapes[0].value, height = 0,
    width = 0,
    radious = 0;

for (let i = 0; i < selectedShapes.length; i++) {
    selectedShapes[i].onclick = () => {
        if (selectedShapes[i].checked) {
            selectedShape = selectedShapes[i].value;
            displayDimension(selectedShape);
            console.log('Shape', selectedShape);
        }
    }
}

let displayDimension = (selectedShape) => {
    console.log('selectedShape', selectedShape);
    switch (selectedShape) {
        case 'square':
            document.getElementById('widthBlock').style.display = 'block';
            document.getElementById('heightBlock').style.display = 'none';
            document.getElementById('radiousBlock').style.display = 'none';
            console.log('Shape', selectedShape);
            break;
        case 'rectangle':
            document.getElementById('widthBlock').style.display = 'block';
            document.getElementById('heightBlock').style.display = 'block';
            document.getElementById('radiousBlock').style.display = 'none';
            console.log('Shape', selectedShape);
            break;
        case 'circle':
            document.getElementById('widthBlock').style.display = 'none';
            document.getElementById('heightBlock').style.display = 'none';
            document.getElementById('radiousBlock').style.display = 'block';
            console.log('Shape', selectedShape);
            break;
    }

}

document.getElementById('calcArea').addEventListener('click', () => {
    let selectedShapeObject = new MyShape(selectedShape, [document.getElementById('height').value,document.getElementById('width').value, document.getElementById('radious').value]);
    // selectedShapeObject.shapeName = 'square';  // accessing outside by shapeName which is harmful of area calculation    
    document.getElementById('area').innerHTML = selectedShapeObject.area();
    selectedShapeObject.draw();
});
