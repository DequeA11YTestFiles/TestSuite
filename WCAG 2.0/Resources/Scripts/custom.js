$(document).ready(function () {

	var index = window.location.href.lastIndexOf("/") + 1,
	        filenameWithExtension = window.location.href.substr(index),
	        filename = filenameWithExtension.split(".html")[0];
					$('#cid').val(filename);
					var _categoryID=$("#cid").val();
					var tablelen=$('table[id^=test] tr').length-1;
					var count;
					for (count=1;count<=tablelen;count++){

			 		$("#eid").append($('<option></option>').val(count).html(count))
	 }

					$('.Examplerow').each(function(index,value){
						var exampleID = $(this).find('th').text();
						SetExample(exampleID,_categoryID,$(this));
					});
});

	$('.updatebtn').click(function(e){
		var _categoryID=$("#cid").val();
		var _ExampleID=$("#eid option:selected").text();
		var _Toolname=$('#tools option:selected').text();
		var _Status=$('#teststatus option:selected').text();
		//alert(_categoryID +" "+_ExampleID+" "+_Toolname+" "+_Status);
		if(_Toolname !="Select")
		{

		if (_Toolname =="FireEyes1" && _Status !="Select") {

			AddFE1(_categoryID,_ExampleID,_Status);
		}
		else if (_Toolname =="FireEyes2" && _Status !="Select") {

			AddFE2(_categoryID,_ExampleID,_Status);
		}
		else if (_Toolname =="aXe" && _Status !="Select") {

			AddFE3(_categoryID,_ExampleID,_Status);
		}
		else {
		 alert("Please Select status for Example "+_ExampleID+ " " +_Toolname+" tool");
		}
}
else {
	alert("Please select Tool for Example"+_ExampleID);
}
//AddOrUpdateExample(_categoryID,_ExampleID, _Fe1status1,_Fe1status2,_axestatus);
});

function AddFE1(categoryID,exampleId,FireEyes1)
{
	//alert(categoryID +""+exampleId+""+FireEyes1);
							var obj = JSON.stringify({ CodeID: exampleId, CategoryID: categoryID, FE1: FireEyes1});
							console.log(obj);
	            $.ajax({
	                type: "POST",
	                url: "TestResultsWebService.asmx/AddTestResultForFE1",
			            data: obj,
	                contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                success: function (response) {
										console.log(response.d)

	                },
	                error: function (msg) {

	                }
	            }).complete(function(response){

	console.log(response.responseText);
	alert("Record Updated");
	location.reload();

	});

}

function AddFE2(categoryID,exampleId,FireEyes2)
{
							var obj = JSON.stringify({ CodeID: exampleId, CategoryID: categoryID, FE2: FireEyes2});
							console.log(obj);
	            $.ajax({
	                type: "POST",
	                url: "TestResultsWebService.asmx/AddTestResultForFE2",
			            data: obj,
	                contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                success: function (response) {
										console.log(response.d)

	                },
	                error: function (msg) {

	                }
	            }).complete(function(response){

	console.log(response.responseText);
	alert("Record Updated");
	location.reload();
	});

}
function AddFE3(categoryID,exampleId,axe)
{
							var obj = JSON.stringify({ CodeID: exampleId, CategoryID: categoryID, Axe: axe});
							console.log(obj);
	            $.ajax({
	                type: "POST",
	                url: "TestResultsWebService.asmx/AddTestResultForAxe",
			            data: obj,
	                contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                success: function (response) {
										console.log(response.d)

	                },
	                error: function (msg) {

	                }
	            }).complete(function(response){

	console.log(response.responseText);
	alert("Record Updated");
	location.reload();

	});

}
        function SetExample(exampleId,categoryID,element) {

                $.ajax({
                    type: "POST",
                    url: "TestResultsWebService.asmx/GetResultForExample",
                    data: JSON.stringify({ CodeID: exampleId, CategoryID: categoryID }),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {
											var Example = JSON.parse(response.d);

											  element.find('.FE1').text(Example[0].FireEyes1);
												element.find('.FE2').text(Example[0].FireEyes2);
												element.find('.axe').text(Example[0].Axe);
												console.log(Example);

                    },

                    failure: function (msg) {
                        alert(msg);
                    }
                });


        }

        function AddOrUpdateExample(categoryID, exampleId, FireEyes1, FireEyes2, Axe) {

						var obj = JSON.stringify({ CodeID: exampleId, CategoryID: categoryID, FE1: FireEyes1, FE2: FireEyes2, Axe: Axe });
						console.log(obj);
            $.ajax({
                type: "POST",
                url: "TestResultsWebService.asmx/AddTestResult",
		            data: obj,
                contentType: "application/json; charset=utf-8",
                    dataType: "json",
                success: function (response) {
									console.log(response.d)

                },
                error: function (msg) {

                }
            }).complete(function(response){

console.log(response.responseText);
alert("Record Updated");
location.reload();

});
        }
