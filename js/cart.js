new Vue({
    el:"#app",
    data:{
        title:"Hello Vue",
        itemList:[]
    },
    filters:{

    },
    mounted:function(){
        this.getHttp();
    },
    methods:{
        getHttp:function(){
            this.$http.get("data/cart.json")
            .then((res)=>{
                this.itemList=res.data.result.list;
                console.log(this.itemList)
            })
        }
    }
})