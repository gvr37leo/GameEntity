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






var screensize = new Vector(document.documentElement.clientWidth,document.documentElement.clientHeight)
var crret = createCanvas(screensize.x,screensize.y)
var canvas = crret.canvas
var ctxt = crret.ctxt

var grid = new Grid(new Vector(4,4))
var store = new EntityStore()

loop((dt) => {
    ctxt.clearRect(0,0,screensize.x,screensize.y)
    ctxt.fillRect(10,10,10,10)

    var entities = store.list()
    for(var entity of entities){
        entity.onEvent.addAndTrigger('tick',dt)
    }

    for(var entity of entities){
        entity.onEvent.addAndTrigger('draw',null)
    }
})
