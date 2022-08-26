// edit modal off
$('#myfrm').submit(function(e) {
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


// adding new video
const formEl = document.getElementById('myfrm');
const tbodyEl = document.querySelector('tbody');  
const tableEl = document.querySelector("table");
var dict = [];

function onAddWebsite(e) {
    e.preventDefault();
    const vidname = document.getElementById("vname").value;
    const ytkey = document.getElementById("ykey").value; 
    tbodyEl.innerHTML += `
        <tr draggable="true" ondragstart="start()"  ondragover="dragover()">
            <td>
                <input type="checkbox" name="checkbox-1" id="checkbox-1" class="select"/>
            </td>
            <td class="order"></td>
            <td>${vidname}</td>
            <td><i class="fa-brands fa-youtube"></i>
            <span class="ykey" data-toggle="modal" data-target="#addVideoPlayModal">${ytkey}</span></td>
            <td><i class="fa-solid fa-grip cur-mov"></i></td>
            <td class="last">
                <button href="" class="deleteBtn btn btn-outline-danger shw-del" style="border: 1px solid red;" data-toggle="tooltip" data-placement="right" title="Remove">Remove</button>
            </td>

        </tr>	
    `;
    dict.push({
        viname : vidname,
        ykey : ytkey 
    });
    document.getElementById('myfrm').reset();
    // console.log(dict);
}

formEl.addEventListener('submit',onAddWebsite)



function onDeleteRow(e){
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }
    const btn = e.target;
    btn.closest('tr').remove();
    
    const idx = dict.findIndex(({viname})=> viname === e.target.parentNode.parentNode.children[2].innerHTML);
    dict.splice(idx,1);
}
tableEl.addEventListener('click',onDeleteRow)




$("#submitbn").click(function(){
    var ptitle = $("#title").val();
    var pdesc = $("#pdesc").val();
    dictfinal = {
        ptitle:ptitle,
        pdesc:pdesc,
        videos:dict
    }
    console.log(dictfinal);
})
