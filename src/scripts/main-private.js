import MyColor from './colors';
export default (() => {

    let allowedShapes = new WeakMap();
    let shapeName = new WeakMap();
    let dimensions = new WeakMap();

    class shapes extends MyColor {

        constructor(MyShapeName, MyDimensions) {
            super();
            allowedShapes.set(this, ['square', 'rectangle', 'circle']);
            shapeName.set(this, MyShapeName);
            dimensions.set(this, MyDimensions);
        }

        area() {
            if (this.validateShape()) {
                if (shapeName.get(this) === 'square') {
                    return dimensions.get(this)[1] * dimensions.get(this)[1];
                } else if (shapeName.get(this) === 'rectangle') {
                    return dimensions.get(this)[0] * dimensions.get(this)[1];
                } else if (shapeName.get(this) === 'circle') {
                    return Math.PI * dimensions.get(this)[1] * dimensions.get(this)[1];
                }
            }
        }

        validateShape() {
            return (allowedShapes.get(this).indexOf(shapeName.get(this)) > -1);
        }

        draw() {
            if (shapeName.get(this) === 'square') {
                document.getElementById('shape-area').innerHTML = '<div style="width:' + dimensions.get(this)[1] + 'px;height:' + dimensions.get(this)[1] + 'px; background-color:'+super.getRandomColor()+';">';
            } else if (shapeName.get(this) === 'rectangle') {
                document.getElementById('shape-area').innerHTML = '<div style="width:' + dimensions.get(this)[1] + 'px;height:' + dimensions.get(this)[0] + 'px; background-color:'+super.getRandomColor()+';">';
            } else if (shapeName.get(this) === 'circle') {
                document.getElementById('shape-area').innerHTML = '<div style="width:' + dimensions.get(this)[2] + 'px;height:' + dimensions.get(this)[2] + 'px; border-radius:50%; background-color:'+super.getRandomColor()+';">';
            }
        }
    }

    return shapes;
})();
