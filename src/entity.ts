class Entity{
    id:number
    name:string
    parent:number
    type:string
    children = new Set<number>()
    store:EntityStore

    onEvent:EventQueue = new EventQueue()

    // onCreate
    // onDelete
    // onChange
    // onTick
    // onDraw

    constructor(init?:Partial<Entity>){
        Object.assign(this,init)
        this.type = 'entity'
    }

    ancestor(type:string){
        return this.store.ancestor(this,type)
    }

    _parent(){
        return this.store.parent(this)
    }

    _children(){
        return this.store.children(this)
    }

    descendants(){
        return this.store.descendants(this)
    }

    
}


