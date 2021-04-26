/// <reference path="libs/vector/vector.ts" />
/// <reference path="libs/utils/rng.ts" />
/// <reference path="libs/utils/table.ts" />
/// <reference path="libs/utils/utils.ts" />
/// <reference path="libs/utils/stopwatch.ts" />
/// <reference path="libs/utils/ability.ts" />
/// <reference path="libs/utils/anim.ts" />
/// <reference path="libs/rect/rect.ts" />
/// <reference path="libs/event/eventqueue.ts" />
/// <reference path="libs/event/eventsystem.ts" />
/// <reference path="libs/utils/camera.ts" />
/// <reference path="src/store.ts" />
/// <reference path="src/entity.ts" />
/// <reference path="src/quadgrid.ts" />
/// <reference path="src/gameobject.ts" />






var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt

var grid = new Grid(new Vector(4,4))
var store = new EntityStore()
var root = store.add(new Entity(),null)
var rng = new RNG(0)

for(var i = 0; i < 1; i++){
    
    var obj = store.add(new GameObject({
        speed:new Vector(rng.range(5,10),rng.range(5,10)),
        pos:new Vector(rng.range(-50,50),rng.range(-50,50)),
    }),root) as GameObject
    obj.gridclient = grid.newClient(obj.pos,new Vector(1,1))
}

loop((dt) => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)
    ctxt.fillRect(10,10,10,10)

    var entities = store.list()
    for(var entity of entities){
        entity.onEvent.addAndTrigger('tick',dt)
    }

    for(var entity of entities){
        entity.onEvent.addAndTrigger('draw',ctxt)
    }
})
