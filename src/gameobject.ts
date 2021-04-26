class GameObject extends Entity{
    active:boolean
    pos:Vector
    size:Vector
    speed:Vector
    gridclient:GridClient

    constructor(init?:Partial<GameObject>){
        super(init)
        this.type = 'gameobject'

        this.onEvent.listen('tick',(dt) => {

            this.pos.add(this.speed)
            this.gridclient.pos = this.pos
            this.gridclient.grid.update(this.gridclient)
        })

        this.onEvent.listen('draw',(ctxt) => {
            var neighbours = this.gridclient.grid.findNearbyFast(this.pos,new Vector(1,1))
            ctxt.fillRect(this.pos.x,this.pos.y,10,10)
        })
    }
}