export default class shapes {
	constructor(shapeName, dimensions){
		this.allowedShapes =['square','rectangle','circle'];
		this.shapeName = shapeName;
		this.dimensions = dimensions;
	}

    area(){
    	if(this.validateShape()){
    		if(this.shapeName === 'square'){
    			return this.dimensions[1]*this.dimensions[1];
    		}
    		else if(this.shapeName === 'rectangle'){
 				return this.dimensions[0]*this.dimensions[1];
    		}
    		else if(this.shapeName === 'circle'){
    			return Math.PI*this.dimensions[1]*this.dimensions[1];
    		}
    	}
    }
     
    validateShape(){
    	return (this.allowedShapes.indexOf(this.shapeName)> -1);
    }
}
