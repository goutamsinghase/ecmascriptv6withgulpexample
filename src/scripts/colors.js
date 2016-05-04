export default (() => {
    class myColor {
        getRandomColor() {
            let colors = ['red', 'green', 'blue', 'yellow', 'pink', 'black'];
            return colors[Math.floor(Math.random()*6)];
        }
    }
    return myColor;
})();
