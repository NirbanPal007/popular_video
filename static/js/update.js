function reorder_rows()
{
    var rows= document.getElementsByTagName('tr');

    for (var i=0; i<rows.length; i++) {
        var dataRow = rows[i].children[1];
        dataRow.textContent = i+1;
        console.log(i);
      }

}

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


    //For displaying selected courses
    selectedCourse=[];
    course=$('.presentcourses ul li').each(function(){
        val=$(this).text()
        selectedCourse.push(val);
    });
    // console.log(selectedCourse)
    // courses=document.querySelectorAll('#allcourses');
    var course_list= document.querySelector('.select2-selection--multiple ul');
    console.log(course_list)
    $('#selected_courses option').each(function() {
        value=$(this).val()
        if(value>-1)
        {
            console.log(value)
            if(jQuery.inArray(value,selectedCourse)>-1)
            {
                $(this).attr("selected","selected");
                var course_name=$(this).text();
                course_list.innerHTML+=`<li class="select2-selection__choice" title="All Courses" data-select2-id="select2-data-3-g90t"><button type="button" class="select2-selection__choice__remove" tabindex="-1" title="Remove item" aria-label="Remove item" aria-describedby="select2-selected_courses-container-choice-a1ku--1"><span aria-hidden="true"> x </span></button><span class="select2-selection__choice__display" id="select2-selected_courses-container-choice-a1ku--1">${course_name}</span></li>`;
                // $('.select2-selection--multiple ul li span').text(course_name)
            } 
        }
       
                           
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
                    <input type="checkbox" name="checkbox-1" id="checkboxsmall" class="select"/>
                </td>
                <td id="order">${rowCount}</td>
                <td>${vidname}</td>
                <td><i class="fa-brands fa-youtube"></i>
                <span class="ykey" data-toggle="modal" data-target="#addVideoPlayModal">${ytkey}</span></td>
                <td><i class="fa-solid fa-grip cur-mov"></i></td>
                <td class="last">
                    <button href="" onclick="onDeleteRow(event)" class="deleteBtn btn btn-outline-danger shw-del" style="border: 1px solid red;" data-toggle="tooltip" data-placement="right" title="Remove">Remove</button>
                </td>	
        `;
        document.getElementById('myfrm').reset();
        
}


formEl.addEventListener('submit',onAddWebsite)


var TableData = new Array();
$("#submitbtn").click(function(){ 
    var object_id = $("#object_id").val(); 
    var ptitle = $("#ptitle").val(); 
    var pdesc = $("#pdesc").val();
    var course = [].filter.call(selected_course.options , option=>option.selected).map(option=>option.value);

    if (ptitle==""||pdesc==""){
        alert("title and description both are mandatory");
        return false
    }
    else{ 
        
        $('#example tr').each(function(row, tr){ 
            is_deleted=$(tr).find('td:eq(4)').text();
            if(is_deleted==0)
            {
                TableData[row]={ 
                    "orderno" : $(tr).find('td:eq(1)').text(), 
                    "viname" :$(tr).find('td:eq(2)').text(), 
                    "ykey" : $(tr).find('td:eq(3)').text().trim(),
    
                } 
            }

          
        });  
        
        dictfinal = { 
            ptitle:ptitle, 
            pdesc:pdesc, 
            videos:TableData 
        } 
        // window.location.assign("http://127.0.0.1:8000/update_playlist"),
        $.ajax({
            url: 'update_playlist',
            type: "POST",
            data:{
                'id' : object_id,
                'updated_by' : 'ash',
                'course' : course,
                'ptitle': ptitle,
                'pdesc' : pdesc,
                'videos' : JSON.stringify(TableData),
            },
        })
        console.log(dictfinal);  
        
    }
    
}) 

function onDeleteRow(e){
    // if (!e.target.classList.contains("deleteBtn")) {
    //     return;
    // }
    const btn = e.target;
    btn.closest('tr').remove();
    reorder_rows();

}
// tableEl.addEventListener('click',onDeleteRow);

function deleteAll(){
    var selected_checkbox= document.querySelectorAll('#checkboxsmall');
    console.log(selected_checkbox);
    $(selected_checkbox).each(function() {
        if(this.checked == true)
        {
            row= this.parentNode.parentNode;
            // console.log(this)
            row.remove();
        } 
    })
    reorder_rows();
}



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



$("#selected_courses").select2({
    placeholder: "Select Courses",
    maximumSelectionLength: 5,
});



{/* <ul class="select2-selection__rendered" id="select2-selected_courses-container"></ul> */}