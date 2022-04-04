$('#sign_up').submit(function(event){
    alert("Registration successfull.");
 });


 if(window.location.pathname=="/IndexAcc"){
    $ondelete=$(".table tbody td a.delete");
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        var request={
            "url":`http://localhost:3000/api/acc/${id}`,
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
$('#add_trans').submit(function(event){
    alert("Registration successfull.");
 });
