$(document).ready(function(){
  //For tooltip	
	$('[data-toggle="tooltip"]').tooltip();
	// Select/Deselect checkboxes
	var checkbox = $('table input[type="checkbox"]');
	$("#selectAll").click(function(){
		if(this.checked){
			checkbox.each(function(){
				this.checked = true;                        
			});
		} else{
			checkbox.each(function(){
				this.checked = false;                        
			});
		} 
	});
	checkbox.click(function(){
		if(!this.checked){
			$("#selectAll").prop("checked", false);
		}
	});
});

// $('form').submit(function(e) {
//     e.preventDefault();
//     $('#addEmployeeModal').modal('hide'); 
//     return false;
// });
//For searching using playlist name
function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchbar");
    filter = input.value.toUpperCase();
    table = document.getElementById("example");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[1];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }



  
// function addRow()
// {
//     var playlistname= document.getElementById('playlistname').value;
//     var courses= document.getElementById('courses').value;
//     var editedon= document.getElementById('editedon').value;
//     var editedby= document.getElementById('editedby').value;
//     var table=document.getElementsByTagName('table')[0];

    //Insert a row
    // var newRow = table.insertRow(1);

    //Insert cells to the row
    // var cel0=newRow.insertCell(0);
    // var cel1=newRow.insertCell(1);
    // var cel2=newRow.insertCell(2);
    // var cel3=newRow.insertCell(3);
    // var cel4=newRow.insertCell(4);
    // var cel5=newRow.insertCell(5);

    //Insert data to the cells from form
//     cel0.innerHTML="<span class='custom-checkbox'><input type='checkbox' class='select' id='checkbox1' name='options[]'><label for='checkbox1'></label></span>";
//     cel1.innerHTML= playlistname;
//     cel2.innerHTML="<a href='#'><i class='fa fa-eye' aria-hidden='true'></i></a>";
//     cel3.innerHTML= courses;
//     cel4.innerHTML= editedon;
//     cel5.innerHTML= editedby;
// }

//Delete checked rows
// function deleteRow() {
//     document.querySelectorAll('#example .select:checked').forEach(e => {
//       e.parentNode.parentNode.parentNode.remove()
//     });
//   }



// function modifyRow(event)
// {
    
    // console.log(document.querySelector('#example .select:checked').parentNode.parentNode.parentNode);
    // rowno=document.querySelector('#example .select:checked').parentNode.parentNode.parentNode;

//     rowno= event.currentTarget.parentNode.parentNode;
//     console.log(rowno);
//     document.getElementById("playlistname1").value = rowno.cells[1].innerHTML;
//     document.getElementById("courses1").value = rowno.cells[3].innerHTML;
//     document.getElementById("editedon1").value = rowno.cells[4].innerHTML;
//     document.getElementById("editedby1").value = rowno.cells[5].innerHTML;
// }

// function editHtmlTbleSelectedRow()
//     {
//         rowno=document.querySelector('#example .select:checked').parentNode.parentNode.parentNode;
//         var playlistname1 = document.getElementById("playlistname1").value,
//             courses1 = document.getElementById("courses1").value,
//             editedon1 = document.getElementById("editedon1").value,
//             editedby1 = document.getElementById("editedby1").value;
//             if(!checkEmptyInput()){
//             rowno.cells[1].innerHTML = playlistname1;
//             rowno.cells[3].innerHTML = courses1;
//             rowno.cells[4].innerHTML = editedon1;
//             rowno.cells[5].innerHTML = editedby1;
//             }

//     }

//     function checkEmptyInput()
//     {
//         var isEmpty = false,
//             playlistname1 = document.getElementById("playlistname1").value,
//             courses1 = document.getElementById("courses1").value,
//             editedon1 = document.getElementById("editedon1").value,
//             editedby1 = document.getElementById("editedby1").value;
    
//         if(playlistname1 === ""){
//             alert("Playlist Name Cannot Be Empty");
//             isEmpty = true;
//         }
//         else if(courses1 === ""){
//             alert("Courses Cannot Be Empty");
//             isEmpty = true;
//         }
//         else if(editedon1 === ""){
//             alert("Edited On Cannot Be Empty");
//             isEmpty = true;
//         }
//         else if(editedby1 === ""){
//             alert("Edited By Cannot Be Empty");
//             isEmpty = true;
//         }
//         return isEmpty;
//     }