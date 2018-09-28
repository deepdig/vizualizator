//var_dump for js
function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    alert(out);    

    var pre = document.createElement('pre');
    pre.innerHTML = out;
    document.body.appendChild(pre)
}

Vue.component('vizualizator', {
        template: '#vizualizator-template',
        data() {
            return {
                Image: new Image(),                
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
                            points: [
                                49,222, 
                                162,217, 
                                475,320, 
                                475,347, 
                                252,398, 
                                49,234, 
                                49,222
                            ],
                            tension: 0,
                            opacity: 0,
                            //stroke: 'red',
                            closed: true,
                            dashEnabled: false,//флаг активного цвета
                            isActive: false//флаг активного полигона
                        },                        
                    },
                    {
                        id: 2,                        
                        config: {
                            name: 'Полигон 2',
                            x: 0,
                            y: 0,
                            points: [
                                162,216, 
                                475,322, 
                                476,329, 
                                634,294, 
                                634,287, 
                                262,210,
                                257,210,
                                258,222,
                                256,234,
                                233,235,
                                227,227,
                                226,222,
                                223,229,
                                210,229,
                                202,226,
                                200,222,
                                199,214,
                                175,215,
                            ],
                            tension: 0.2,//сглаживание линий
                            bezier: false,
                            opacity: 1,
                            stroke: 'red',
                            strokeWidth: 2,//толщина границы выделения
                            closed: true,                                                        
                            dashEnabled: false,
                            isActive: false                            
                        },                        
                    }
                ], //end poligonsArr
                imagesArr: [
                    {
                        id: 1,                        
                        config: {
                            name: 'Image 01',
                            x: 0,
                            y: 0,                                             
                            opacity: 1,                            
                            isActive: false                            
                        }, 
                    },
                    {
                        id: 2,                        
                        config: {
                            name: 'Image 02',
                            x: 0,
                            y: 0,                                             
                            opacity: 1,                            
                            isActive: false                            
                        },  
                    }
                ], //end imagesArr
            }
        },
        computed: {
            //построение фоновой картинки
            backgroundImg: function () {
                this.Image.src = 'assets/img/background/kitchen-background.png';
                return {
                    x: 0,
                    y: 0,
                    image: this.Image,
                    width: 800,
                    height: 477,
                }
            },
        },

        methods: {
            //мышь над объектом
            handleMouseOver(event) {
                const shape = event.getStage();
                if (shape.attrs.isActive != true && shape.attrs.dashEnabled == false) {                    
                    shape.setOpacity(0.2).setStroke('red').setFill('red');
                    shape.getStage().draw();
                }
                document.body.style.cursor = 'pointer';
            },
            //мышь покидает объект
            handleMouseOut: function (event) {
                const shape = event.getStage();
                if (shape.attrs.isActive != true && shape.attrs.dashEnabled == false) {
                    shape.setOpacity(0).setStroke(false);
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
                    polygonArr[key].setStroke(false);
                    if (polygonArr[key].attrs.dashEnabled == false) {
                        polygonArr[key].setOpacity(0).setFill();
                    }                    
                    //устанавливаем флаг и выделение активного полигона                                
                    shape.setOpacity(0.3).setFill('red').setStroke('red');                    
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
            //изменение материала (текстуры) полигона
            changeMaterial(e) {
                const stage = this.$refs.stage.getStage();
                //получаем слой
                const layer = this.$refs.layer.getStage();
                //создаем массив из объектов в слое
                polygonArr = layer.children;

                //перебираем полигоны, если активный то применяем материал
                var key;
                for (key = 0; key < polygonArr.length; ++key) {
                    var activePolygon = polygonArr[key];
                    var activeFlag = activePolygon.attrs.isActive;                    
                    
                    if (activeFlag == true) {
                        //получаем фон элемента
                        var computedStyle = getComputedStyle(e.target);                    
                        var backgroundUrl = computedStyle.backgroundImage.slice(4, -1).replace(/"/g, "");                        
                        //создаем image (текстуру, паттерн)
                        var imageObj = new Image();
                        imageObj.src = backgroundUrl;                        
                        //применяем параметры к паттернам
                        activePolygon.setFill(false).setOpacity(0.5);
                        activePolygon.setFillPatternImage(imageObj);
                        //activePolygon.setFillPatternY(80);//смещение паттерна для скрытия швов
                        //activePolygon.setFillPatternScaleX(1).setFillPatternScaleY(1);//масштабирование
                        //activePolygon.setFillPatternRotation(0);//вращение
                        //Устанавливаем флаг активного цвета
                        activePolygon.setDashEnabled(true);
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
    