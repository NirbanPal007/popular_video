//edit modal off
$('form').submit(function(e) {
    e.preventDefault();
    // Coding
    $('#addVideoModal').modal('hide'); 
    return false;
});

//select all function
$('#select-all').click(function(event) {   
    if(this.checked) {
        // Iterate each checkbox
        $(':checkbox').each(function() {
            this.checked = true;                        
        });
    } else {
        $(':checkbox').each(function() {
            this.checked = false;                       
        });
    }
}); 

//Drag and drop rows
var row;
function start(){  
  row = event.target; 
}
function dragover(){
  var e = event;
  e.preventDefault(); 
  
  let children= Array.from(e.target.parentNode.parentNode.children);
  
  if(children.indexOf(e.target.parentNode)>children.indexOf(row))
    e.target.parentNode.after(row);
  else
    e.target.parentNode.before(row);
}



//stopping the video when modal is closed
$(document).ready(function() {
    var url = $("#cls").attr('src');
    $("#addVideoPlayModal").on('hide.bs.modal', function() {
        $("#cls").attr('src', '');
    });
    $("#addVideoPlayModal").on('show.bs.modal', function() {
        $("#cls").attr('src', url);
    });
});

//for tooltip
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
  })
