class GridClient{
    minindex:Vector
    maxindex:Vector
    data:any
    grid:Grid

    constructor(public pos:Vector, public size:Vector){

    }
}

class Grid{
    cells = new Map<string, Set<GridClient>>()

    constructor(public cellsize:Vector){
    }

    newClient(pos,size){
        var c = new GridClient(pos,size)
        c.grid = this
        this._insert(c)
        return c
    }

    update(c:GridClient){
        this.remove(c)
        this._insert(c)
    }

    remove(c:GridClient){
        this._getCells(c.minindex,c.maxindex).forEach(v => {
            this._downsert(v,c)
        })
    }

    findNearbyFast(center:Vector,size:Vector):GridClient[]{
        var res = new Set<GridClient>()
        var {tl,br} = this._convertCenterSize(center,size)
        this._getCells(tl,br).forEach(c => {
            var cell = this.cells.get(this._key(c))
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



    _key(pos:Vector){
        return `${pos.x}:${pos.y}`
    }

    _insert(c:GridClient){
        var {tl,br} = this._convertClient(c)
        c.minindex = tl
        c.maxindex = br
        this._getCells(tl,br).forEach(v => {
            this._upsert(v,c)
        })
    }

    _upsert(pos:Vector,client:GridClient){
        var set:Set<GridClient>
        if(this.cells.has(this._key(pos))){
            set = this.cells.get(this._key(pos))
        }else{
            set = new Set<GridClient>()
        }
        set.add(client)
    }

    _downsert(pos:Vector,client:GridClient){
        var set = this.cells.get(this._key(pos))
        set.delete(client)
        if(set.size == 0){
            this.cells.delete(this._key(pos))
        }
    }

    _Index(abspos:Vector):Vector{
        return abspos.c().div(this.cellsize).floor()
    }

    _getCells(tlabs:Vector,brabs:Vector){
        var tl = this._Index(tlabs)
        var br = this._Index(brabs)

        var res:Vector[] = []

        //todo
        tl.to(br).loop2d(v => {
            var gpos = v.c().add(tl)
            res.push(gpos)
        })
        return res
    }

    _convertClient(c:GridClient){
        return this._convertCenterSize(c.pos,c.size)
    }

    _convertCenterSize(center:Vector,size:Vector){
        var hs = size.c().scale(0.5)
        var tl = center.c().sub(hs)
        var br = center.c().add(hs)
        return {tl,br}
    }
}

