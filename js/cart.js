new Vue({
    el:"#app",
    data:{
        title:"Hello Vue",
        itemList:[],
        checkedAllFlag:false,
        totalPrice:0,
        delFlag:false
    },
    filters:{

    },
    mounted:function(){
        this.$nextTick(function(){
            this.getHttp();
        })
    },
    methods:{
        getHttp:function(){
            this.$http.get("data/cart.json")
            .then((res)=>{
                this.itemList=res.data.result.list;
                console.log(this.itemList)
            })
        },
        computePrice:function(product,way){
            if(way<0){
                product.count-=1;
                if(product.count<1)
                product.count=1;
            }else {
                product.count+=1;
            }
            this.computeTotalPrice();
        },
        selectedClick:function(product){
            if(typeof product.checked=="undefined"){
                //Vue.set(product,"checked",true)
                this.$set(product,"checked",true)
            }else {
                product.checked=!product.checked;
            }
            this.computeTotalPrice();
        },
        checkedAll:function(flag){
            this.checkedAllFlag=!this.checkedAllFlag;
            this.itemList.forEach((value,index)=>{
                if(typeof value.checked=="undefined"){
                    this.$set(value,"checked",this.checkedAllFlag)
                }else {
                    value.checked=this.checkedAllFlag
                }
            })
            this.computeTotalPrice();
        },
        computeTotalPrice(){
            this.totalPrice=0;
            this.itemList.forEach((value,idnex)=>{
                if(value.checked){
                    this.totalPrice+=value.price*value.count;
                }
            })
        }
    }
})