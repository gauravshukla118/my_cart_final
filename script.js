var mycart=[];

$(document).ready(function(){
   dynamic_listing();

   $('.add-to-cart').click(function(){
        var id=$(this).data('id');
        var temp = getcartproduct(id);
        //console.log(temp);  //temp will stoe obj of that id in form of array
        if(temp.length>0)
        {
            temp[0].quantity++;
        }
        else
        {
            mycart.push({'id':id, 'quantity':1});
        }

        displayCart();
   });

   //delete the product from table
   $('body').on('click','#btn',function(){
    var id = $(this).data('id');
    deleteCartElement(id);
   displayCart();
   });

   //update the entered quantity
   $('body').on('click','.update',function(){
    var id = $(this).data('id');
    var qt = parseInt($('#update-'+id).val());
    var temp = getcartproduct(id);
    temp[0].quantity += qt;
    displayCart();
   });

   //empty cart functionality
   $('body').on('click','#empty',function(){
        mycart.length = 0;
        displayCart();
        $('#empty').hide();
        $('#tableshow').hide();
        $('#carttbl').html("The cart is empty!Keep adding the products!!");
   });

});

//delete cart element function
function deleteCartElement(id){
    for(var i=0;i<mycart.length;i++){
        if(id == mycart[i].id)
        mycart.splice(i,1);
        break;
       }
}

// function to get cart product
function getcartproduct(obj)
{
    var temp = mycart.filter((v,i) => {
        return obj == v.id;
    });
        return temp;
}

// function to get product from products array
function getproduct(obj)
{
    var temp = products.filter((v,i) => {
        return obj == v.id;
    });
        return temp;
}

// //function to display cart array in table format below products listing
function displayCart()
{ 
    var newhtml = '';
    newhtml += '<table id="tableshow">';
    newhtml += '<tr> <th>Product Id      </th><th>Product Name       </th><th>  Product Image   </th><th>  Product Price    </th><th>  Quantity</th><th>    Update Quantity</th><th>  Action</th></tr>';
    //console.log(mycart);
    for(var i=0;i<mycart.length;i++)
    {
        var id = mycart[i].id; 
        var prod = getproduct(id);
        // newhtml += '<tr><td>'+mycart[i].id+'</td><td>'+prod+'</td><td>'${mycart[i].quantity}'</td><td>'<input type="number" placeholder="Enter your quantity here">'</td><td><input type="button"></td></tr>';
        newhtml += '<tr>';
        newhtml += '<td>'+prod[0].id+'</td>';
        newhtml += '<td>'+prod[0].name+'</td>';
        newhtml += '<td><img src="images/'+prod[0].image+'"></td>';
        newhtml += '<td>'+prod[0].price+'</td>';
        newhtml += '<td>'+mycart[i].quantity+'</td>';
        newhtml += '<td class="update"><input type="number" id="update-'+mycart[i].id+'"placeholder="Enter Quantity">\
         <a class="update" href="#" data-id="'+mycart[i].id+'">Update</a></td>';
        newhtml += '<td><input type="button" id="btn" value="Remove"data-id="'+mycart[i].id+'"</td>';
    }
    newhtml += '</table><br><a href="#" id="empty">Empty Cart</a>';
    $('#carttbl').html(newhtml);
}

//dynamic listing of elements
function dynamic_listing()
{
    html = '';
    for(var i=0;i<products.length;i++)
    {
        html += '<div id="'+products[i].id+'" class="product">\
        <img src="images/'+products[i].image+'">\
        <h3 class="title"><a href="#">'+products[i].name+'</a></h3>\
        <span>Price: '+products[i].price+'</span>\
        <a class="add-to-cart" data-id="'+products[i].id+'" href="#">Add To Cart</a>\
    </div>';
    }
    $("#products").html(html);
}

