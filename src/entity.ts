class Entity{
    id:number
    name:string
    parent:number
    type:string
    children = new Set<number>()
    pos:Vector
    store:EntityStore

    onEvent:EventQueue = new EventQueue()

    // onCreate
    // onDelete
    // onChange
    // onTick
    // onDraw

    constructor(){

    }

    getAncestor(){

    }

    getDescendants(){

    }

    
}


