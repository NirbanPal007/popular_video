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
// var row;
// function start(){  
//   row = event.target; 
// }
// function dragover(){
//   var e = event;
//   e.preventDefault(); 
  
//   let children= Array.from(e.target.parentNode.parentNode.children);
  
//   if(children.indexOf(e.target.parentNode)>children.indexOf(row))
//     e.target.parentNode.after(row);
//   else
//     e.target.parentNode.before(row);
// }



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
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
//   })


// adding new video
const formEl = document.getElementById('myfrm');
const tbodyEl = document.querySelector('tbody');  
const tableEl = document.querySelector("table");

function onAddWebsite(e) {
    e.preventDefault();
    const vidname = document.getElementById("vname").value;
    const ytkey = document.getElementById("ykey").value;
    var table = document.getElementById("example");
    
    var row = table.insertRow(rowCount);
    var rowCount = table.rows.length;
    row.innerHTML+=  `
                <td>
                    <input type="checkbox" name="checkbox-1" id="checkbox-1" class="select"/>
                </td>
                <td id="order">${rowCount}</td>
                <td>${vidname}</td>
                <td><i class="fa-brands fa-youtube"></i>
                <span class="ykey" data-toggle="modal" data-target="#addVideoPlayModal">${ytkey}</span></td>
                <td><i class="fa-solid fa-grip cur-mov"></i></td>
                <td class="last">
                    <button href="" class="deleteBtn btn btn-outline-danger shw-del" style="border: 1px solid red;" data-toggle="tooltip" data-placement="right" title="Remove">Remove</button>
                </td>	
        `;
        document.getElementById('myfrm').reset();
}


formEl.addEventListener('submit',onAddWebsite)



function onDeleteRow(e){
    if (!e.target.classList.contains("deleteBtn")) {
        return;
    }
    const btn = e.target;
    btn.closest('tr').remove();
    
    const idx = TableData.findIndex(({viname})=> viname === e.target.parentNode.parentNode.children[2].innerHTML);
    TableData.splice(idx,1);
}
tableEl.addEventListener('click',onDeleteRow);


$("#submitbn").click(function(){ 
    var ptitle = $("#title").val(); 
    var pdesc = $("#pdesc").val(); 

    if (ptitle==""||pdesc==""){
        alert("title and description both are mandatory");
        return false
    }
    else{
        var TableData = new Array(); 
         
        $('#example tr').each(function(row, tr){ 
            TableData[row]={ 
                "orderno" : $(tr).find('td:eq(1)').text(), 
                "viname" :$(tr).find('td:eq(2)').text(), 
                "ykey" : $(tr).find('td:eq(3)').text().trim()
            } 
        });  
     
        dictfinal = { 
            ptitle:ptitle, 
            pdesc:pdesc, 
            videos:TableData 
        } 
        console.log(dictfinal);       
    }
 
}) 






var fixHelperModified = function(e, tr) {
    var $originals = tr.children();
    var $helper = tr.clone();
    $helper.children().each(function(order) {
        $(this).width($originals.eq(order).width())
    });
    return $helper;
},
    updateIndex = function(e, ui) {
        $('td#order', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);
        });
    };
$("#example tbody").sortable({
    helper: fixHelperModified,
    stop: updateIndex
}).disableSelection();


jQuery.browser = {};
(function () {
    jQuery.browser.msie = false;
    jQuery.browser.version = 0;
    if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
        jQuery.browser.msie = true;
        jQuery.browser.version = RegExp.$1;
    }
})();
