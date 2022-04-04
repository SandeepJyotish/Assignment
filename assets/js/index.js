$('#add_trans').submit(function(event){
   
    alert("Data updated successfully.");
})
$('#edit_trans').submit(function(event){
    event.preventDefault();
    var unindexed_array=$(this).serializeArray();
    var data={}
    $.map(unindexed_array,function(n,i){
    data[n['name']]=n['value']
})
console.log(data);
var request={
    "url":`http://localhost:3000/api/trans/${data.id}`,
    "method":"PUT",
    "data":data
}
$.ajax(request).done(function(response){
    alert("Data updated successfully.");
})
})

if(window.location.pathname=="/trans"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        var request={
            "url":`http://localhost:3000/api/trans/${id}`,
            "method":"DELETE"
        }
        if(confirm("do you realy want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }
    })
}
