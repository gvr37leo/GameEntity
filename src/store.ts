class EntityStore{

    map = new Map<number,Entity>()
    counter = 0

    get(id:number){
        return this.map.get(id)
    }

    add(item:Entity,parent:Entity){
        item.id = this.counter++
        this.map.set(item.id, item)
        this.move(item, parent)
        return item
    }

    list(){
        return Array.from(this.map.values())
    }

    remove(id){
        var ent = this.map.get(id)
        this.map.get(ent.parent).children.delete(ent.id)
        this.map.delete(id)
        return ent
    }

    move(ent:Entity, parent:Entity){
        var oldparent = this.get(ent.parent)
        if(oldparent != null){
            oldparent.children.delete(ent.id)
        }
        parent.children.add(ent.id)
        ent.parent = parent.id
    }

}