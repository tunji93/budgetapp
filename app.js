var UIController = (function(){
    return {
        getInput: function() { return{
            type:  document.querySelector('.add__type').value,
            description:  document.querySelector('.add__description').value,
            value: parseFloat(document.querySelector('.add__value').value)
        }
    },

    addListItem:  function(obj,type) {
        
       var incomecont = '.income__list'
       var expensecont = '.expenses__list'
        if (type==='inc') {
            var element = incomecont
            var html='<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">DEL</button></div></div></div>'
        }

        else {
            var element = expensecont
            var html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">DEL</button></div></div></div>'
    }
        var newHtml= html.replace('%id%', obj.id)
         newHtml= newHtml.replace('%description%', obj.description)
         newHtml= newHtml.replace('%value%', obj.item)

         document.querySelector(element).insertAdjacentHTML("beforeend",newHtml)

    }, 

    clearfeilds : function() {
        var feilds = document.querySelectorAll( '.add__description'+ ', '  + '.add__value');
        var feildsArr = Array.prototype.slice.call(feilds);
        feildsArr.forEach(function( current,){
            current.value=''
            
        });
        feildsArr[0].focus()
    }
        

    }
            
    

})()

var budgetController = (function() {
    var Expenses = function(id,description,item) {
        this.id = id
        this.description = description
        this.item= item
    };

    var Income = function(id,description,item) {
        this.id = id
        this.description = description
        this.item= item
    };

    var data = {
        item: {
            exp:[],
            inc:[]
        },
        total: {
            exp:0,
            inc:0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if(data.item[type]>0) {
                ID = data.item[type][data.item[type].length-1].id + 1;
            }
            else{ ID = 0}
            if (type==='inc') {
                newItem = new Income(ID,des,val)
            }
            else if (type==='exp') {
                newItem = new Expenses(ID,des,val)
            }

            data.item[type].push(newItem)
            return newItem
        },

        testing: function() {
            console.log(data)
        }
    }


    
})()





var Controller = (function(uctrl,bctrl) {

    


    function ctrlAddItem() {
        var input = uctrl.getInput();
        if (input.description !== '' && !isNaN(input.item) && input.item>0) {
            var newEntry = bctrl.addItem(input.type, input.description,input.value);
            uctrl.addListItem(newEntry, input.type);
            uctrl.clearfeilds()
            
            }
    };

    function setUpEventListeners() {
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode===13) {
                ctrlAddItem()
            };
        });
    }

        return {
            init: function() {
                setUpEventListeners()
            },

            

            

            

            
        
    }


    
        
    
    
   
})(UIController, budgetController)

Controller.init()



