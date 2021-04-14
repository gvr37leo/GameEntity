class GridClient{
    minindex
    maxindex

    constructor(public pos:Vector, public size:Vector){

    }
}

class Grid{
    cells = new Map<string, Set<GridClient>>()

    constructor(public cellsize:Vector){
    }

    key(pos:Vector){
        return `${pos.x}:${pos.y}`
    }

    newClient(pos,size){
        var c = new GridClient(pos,size)
        this.insert(c)
        return c
    }

    insert(c:GridClient){
        var {tl,br} = this.convertClient(c)
        c.minindex = tl
        c.maxindex = br
        this.getCells(tl,br).forEach(v => {
            this.upsert(v,c)
        })
    }

    update(c:GridClient){
        this.remove(c)
        this.insert(c)
    }

    remove(c:GridClient){
        this.getCells(c.minindex,c.maxindex).forEach(v => {
            this.downsert(v,c)
        })
    }





    



    upsert(pos:Vector,client:GridClient){
        var set:Set<GridClient>
        if(this.cells.has(this.key(pos))){
            set = this.cells.get(this.key(pos))
        }else{
            set = new Set<GridClient>()
        }
        set.add(client)
    }

    downsert(pos:Vector,client:GridClient){
        var set = this.cells.get(this.key(pos))
        set.delete(client)
        if(set.size == 0){
            this.cells.delete(this.key(pos))
        }
    }

    findNearbyFast(center:Vector,size:Vector):GridClient[]{
        var res = new Set<GridClient>()
        var {tl,br} = this.convertCenterSize(center,size)
        this.getCells(tl,br).forEach(c => {
            var cell = this.cells.get(this.key(c))
            for(var el of cell){
                res.add(el)
            }
        })
        return Array.from(res.values())
    }

    findNearby(center:Vector,radius:number):GridClient[]{
        var cs = this.findNearbyFast(center,new Vector(radius,radius))
        var incirclecs = cs.filter(c => c.pos.to(center).length() <= radius)
        return incirclecs
    }

    Index(abspos:Vector):Vector{
        return abspos.c().div(this.cellsize).floor()
    }

    getCells(tlabs:Vector,brabs:Vector){
        var tl = this.Index(tlabs)
        var br = this.Index(brabs)

        var res:Vector[] = []
        tl.to(br).loop2d(v => {
            var gpos = v.c().add(tl)
            res.push(gpos)
        })
        return res
    }

    convertClient(c:GridClient){
        return this.convertCenterSize(c.pos,c.size)
    }

    convertCenterSize(center:Vector,size:Vector){
        var hs = size.c().scale(0.5)
        var tl = center.c().sub(hs)
        var br = center.c().add(hs)
        return {tl,br}
    }
}

