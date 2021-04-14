class Entity{
    id:number
    name:string
    parent:number
    type:string
    children = new Set<number>()
    pos:Vector

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

    getByPath(){

    }
}


class XPathStep{
    searchstart//root,current
    searchspace//child,descendant,parent,ancestor
    filter
}