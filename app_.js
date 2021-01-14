var UIController = (function() {
    return{
        getInput: function() { return {
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
             var html='<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">DEL</button></div></div></div>'
         }
 
         else {
             var element = expensecont
             var html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">DEL</button></div></div></div>'
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
    },

    displayBudget: function(obj) {
        document.querySelector('.budget__value').textContent=obj.myBudget
        
        document.querySelector('.budget__income--value').textContent=obj.myInc
        document.querySelector('.budget__expenses--value').textContent=obj.myExp
        if (obj.myPercentage>1) {
            document.querySelector('.budget__expenses--percentage').textContent=obj.myPercentage + '%'
        }
        else{document.querySelector('.budget__expenses--percentage').textContent= '---'}
    },

    deleteElement: function(selectorID) {
        var el = document.querySelector(selectorID)
        el.parentNode.removeChild(el)
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
        },
        budget: 0,
        percentage:-1
    };

    

    function addExp() {
        var sumExp = 0
        if (data.item.exp.length > 0) {
            for (i=0; i<data.item.exp.length; i++){
                sumExp+= data.item.exp[i].item
            }
            
        }
        else {sumExp=0};
        data.total.exp=sumExp
        sumExp = 0
    };
    function addInc() {
        var sumInc = 0
        if (data.item.inc.length > 0) {
            for (j=0; j<data.item.inc.length; j++){
                sumInc+= data.item.inc[j].item
            }
            
        }
        else {sumInc=0};
        data.total.inc=sumInc
        sumInc = 0
    }

    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            if(data.item[type].length>0) {
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

        removeItem:function (type, id) {
            var ids = data.item[type].map(function(cur) {
                cur.id
            })
            console.log(ids)
            
        },

        updateBudget: function(){
            addExp()
            addInc()
            data.budget = (data.total.inc) - (data.total.exp)
            if(data.total.inc !== 0){
                data.percentage = Math.round(((data.total.exp) / (data.total.inc))*100)
            }
            
        },

        getBudget: function(){
            return {
                myBudget: data.budget,
                myPercentage: data.percentage,
                myInc: data.total.inc,
                myExp: data.total.exp
            }
        },

        

        testing: function() {
            console.log(data)
        }
    }

})()


var controller = (function(UIctrl, Bctrl) {

    function ctrlAddItem() {
        var input = UIctrl.getInput()
        var newEntry = Bctrl.addItem(input.type, input.description,input.value)
       if(input.description !=='' && input.value>0 && !isNaN(input.value)) {
        UIctrl.addListItem(newEntry,input.type)
        UIctrl.clearfeilds()
        Bctrl.updateBudget()
        var budgetReturn = Bctrl.getBudget()
        UIctrl.displayBudget(budgetReturn)
       }
        
    }

    function ctrlDeleteItem(e){
        var itemID = e.target.parentNode.parentNode.parentNode.id
        if (itemID) {
            var splitID = itemID.split('-')
            var typeID  = splitID[0]
            var myID = splitID[1]
            UIctrl.deleteElement(itemID)



        }

    }


    function setUpEventListeners() {
        document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(e) {
            if (e.keyCode===13) {
                ctrlAddItem()
            };
        });
        document.querySelector('.container').addEventListener('click', ctrlDeleteItem);
    }
    return {
        init: function() {
            UIctrl.displayBudget({
                myBudget: 0,
                myPercentage: -1,
                myInc: 0,
                myExp: 0
            })
            setUpEventListeners()
        }
    }

})(UIController,budgetController)
controller.init()