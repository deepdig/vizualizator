<!DOCTYPE html>
<html lang="ru">
<head>
    <title>Визуализатор</title>
    <link rel="stylesheet" href="assets/css/vizualizator.css">
</head>

<body>

    <div id="app">
        <vizualizator></vizualizator>
    </div>

    <template id="vizualizator-template">
        <div id="vizualizator-app">
            <h1>Визуализатор</h1>
            <div class="main-canvas">
                <v-stage ref="stage" :config="configKonva">

                    <v-layer ref="layer">
                        <v-image :config="backgroundImg"></v-image>
                    </v-layer>

                    <v-layer ref="layer">
                        <v-line 
                            ref="line" 
                            v-for="item in poligonsArr" 
                            :key="item.id" 
                            :config="item.config"
                            @mouseover="handleMouseOver" 
                            @mouseout="handleMouseOut" 
                            @click="handleMouseClick" 
                        />
                    </v-layer>                    
                </v-stage>
            </div>

            <div class="toolbar">

                <div class="toolbar-materials">
                    <button v-on:click="changeColor" class="material-select material-1" id="material-1"> </button>
                    <button v-on:click="changeColor" class="material-select material-2" id="material-2"> </button>
                    <button v-on:click="changeColor" class="material-select material-3" id="material-3"> </button>
                    <button v-on:click="changeMaterial" class="material-select material-4" id="material-4" style="background: url(assets/img/materials/Bradshaw.jpg);"> </button>
                    <button v-on:click="changeMaterial" class="material-select material-5" style="background: url(assets/img/materials/Zirix.jpg);"> </button>
                    <button v-on:click="changeMaterial" class="material-select material-6" style="background: url(assets/img/materials/CK230_Mykonos_Beige.jpg);"> </button>
                    <button v-on:click="getFiles" class="material-select material-7">Файлы</button>                   
                    
                    <button v-on:click="changeMaterial" class="material-select material-6" style="background: url(assets/img/objects/table_green.png);">Фото</button>
                    <button v-on:click="resetColor" class="material-select" id="material-reset">Сброс</button>
                </div>
            </div>
            <div style="clear: both;"></div>
            <h3>Отладка:</h3>
            <p>&nbsp;<b>{{ success }}</b></p>
        </div>
    </template>

    <script src="assets/js/vuejs/vue.js"></script>
    <script src="assets/js/konva.min.js"></script>
    <script src="assets/js/vue-konva.min.js"></script>
    <script src="assets/js/axios.min.js"></script>
    <script src="assets/js/vuejs/app_vizualizator_v3.js
    "></script>

</body>
</html>
