class EntityStore{

    map = new Map<number,Entity>()
    counter = 0

    get(id:number){
        return this.map.get(id)
    }

    add(item:Entity,parent:Entity){
        item.store = this
        item.id = this.counter++
        this.map.set(item.id, item)
        this.move(item, parent)//event trigger happens in move
        return item
    }

    list(){
        return Array.from(this.map.values())
    }

    remove(id){
        var ent = this.map.get(id)
        var parent = this.map.get(ent.parent)
        parent.children.delete(ent.id)
        this.map.delete(id)
        parent.onEvent.addAndTrigger('remove',id)
        return ent
    }

    move(ent:Entity, parent:Entity){
        var oldparent = this.get(ent.parent)
        if(oldparent != null){
            oldparent.children.delete(ent.id)
            oldparent.onEvent.addAndTrigger('remove',ent)
            
        }
        parent.children.add(ent.id)
        ent.parent = parent.id
        parent.onEvent.addAndTrigger('add',ent)
    }

    getByPath(){

    }
}
/*
    bookstore//book
    current^^deck//ability
*/
function xpathString2Xpath(str):XPathStep[]{
    return null
}

class XPathStep{
    direction//child,descendant,parent,ancestor
    filter
}