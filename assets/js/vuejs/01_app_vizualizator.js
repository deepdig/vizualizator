//var_dump for js
function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);

    // or, if you wanted to avoid alerts...

    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre)
}

Vue.component('vizualizator', {
        template: '#vizualizator-template',
        data() {
            return {
                backgroundImg: new Image(100, 100),                
                configKonva: {
                    width: 800,
                    height: 450
                },                
                poligonsArr: [
                    {
                        id: 1,                        
                        config: {
                            name: 'Полигон 1',
                            x: 0,
                            y: 0,
                            points: [49,210, 170,205, 475,300, 475,330, 250,375, 49,224, 49,210],
                            tension: 0,
                            opacity: 0,                            
                            closed: true,
                            dashEnabled: false,
                            isActive: false                           
                        },                        
                    },
                    {
                        id: 2,                        
                        config: {
                            name: 'Полигон 2',
                            x: 0,
                            y: 0,
                            points: [170,205, 475,300, 475,308, 633,280, 633,275, 262,200],
                            tension: 0,
                            opacity: 0,                            
                            closed: true,
                            dashEnabled: false,
                            isActive: false                            
                        },                        
                    }
                ] //end poligonsArr
            }
        },
        computed: {
            //построение фоновой картинки
            configImg: function () {
                this.backgroundImg.src = 'assets/img/background/kitchen-background.jpg';
                return {
                    x: 0,
                    y: 0,
                    image: this.backgroundImg,
                    width: 800,
                    height: 450,
                }
            },
        },

        methods: {
            //мышь над объектом
            handleMouseOver(event) {
                const shape = event.getStage();
                //dump(shape);
                //alert(shape._id);
                if (shape.attrs.isActive != true && shape.attrs.dashEnabled == false) {                    
                    shape.setOpacity(0.5).setStroke('red').setFill('#fff');
                    shape.getStage().draw();
                }
                document.body.style.cursor = 'pointer';
            },
            //мышь покидает объект
            handleMouseOut: function (event) {
                const shape = event.getStage();
                if (shape.attrs.isActive != true && shape.attrs.dashEnabled == false) {
                    shape.setOpacity(0);
                    shape.getStage().draw();
                }
                document.body.style.cursor = 'default';
            },
            //выбор активного объекта
            handleMouseClick(event) {

                const layer = this.$refs.layer.getStage();                
                const polygonArr = layer.children;                
                const shape = event.getStage();                
                //перебираем полигоны
                var key;
                for (key = 0; key < polygonArr.length; ++key) {
                    //сбрасываем флаг и выделение у всех полигонов                    
                    polygonArr[key].attrs.isActive = false;
                    if (polygonArr[key].attrs.dashEnabled == false) {
                        polygonArr[key].setOpacity(0).setFill();
                    }                    
                    //устанавливаем флаг и выделение активного полигона                                
                    shape.setOpacity(0.3).setFill('red');                    
                    shape.attrs.isActive = true;                    
                    shape.getStage().draw();
                }                
            },
            //изменение цвета полигона
            changeColor(e) {
                //получаем слой
                const layer = this.$refs.layer.getStage();
                //создаем массив из объектов в слое
                polygonArr = layer.children;

                //перебираем полигоны, если активный то применяем цвет
                var key;
                for (key = 0; key < polygonArr.length; ++key) {
                    var activePolygon = polygonArr[key];
                    var activeFlag = activePolygon.attrs.isActive;
                    if (activeFlag == true) {
                        //получаем цвет элемента
                        var computedStyle = getComputedStyle(e.target);                    
                        var color = computedStyle.backgroundColor;
                        //применяем цвет на полигоне    
                        activePolygon.setOpacity(0.6).setFill(color);
                        //Устанавливаем флаг активного цвета
                        activePolygon.setDashEnabled(true),
                        layer.draw();
                    }
                }                
            },
            //сброс цвета полигона
            resetColor(e) {
                const layer = this.$refs.layer.getStage();                
                polygonArr = layer.children;
                //перебираем полигоны, делаем сброс параметров
                var key;
                for (key = 0; key < polygonArr.length; ++key) {
                    polygonArr[key].setOpacity(0).setFill();
                    //сбрасываем флаг
                    polygonArr[key].attrs.isActive = false;
                    polygonArr[key].setDashEnabled(false);
                    layer.draw();
                }
            },
        }
    }),

    new Vue({
        el: '#app',

    })