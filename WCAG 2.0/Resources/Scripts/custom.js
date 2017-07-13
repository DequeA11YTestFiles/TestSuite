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

//tabs        
$(document).ready(function() {
  var panel = new Tabpanel("myTab");
});

function Tabpanel(id) {
  this._id = id;
  this.$tpanel = $('#' + id);
  this.$tabs = this.$tpanel.find('.tab');
  this.$panels = this.$tpanel.find('.tab-pane');

  this.bindHandlers();
  this.init();
}

Tabpanel.prototype.keys = {
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

Tabpanel.prototype.init = function() {
  var $tab;

  this.$panels.attr('aria-hidden', 'true');
  this.$panels.removeClass('active in');

  $tab = this.$tabs.filter('.active');

  if ($tab === undefined) {
    $tab = this.$tabs.first();
    $tab.addClass('active');
  }

  this.$tpanel
    .find('#' + $tab.find('a').attr('aria-controls'))
      .addClass('active in').attr('aria-hidden', 'false');
}

Tabpanel.prototype.switchTabs = function($curTab, $newTab) {
  var $curTabLink = $curTab.find('a'),
    $newTabLink = $newTab.find('a');
  
  $curTab.removeClass('active');
  $curTabLink.attr('tabindex', '-1').attr('aria-selected', 'false');

  $newTab.addClass('active');
  $newTabLink.attr('aria-selected', 'true');

  this.$tpanel
    .find('#' + $curTabLink.attr('aria-controls'))
      .removeClass('active in').attr('aria-hidden', 'true');

  this.$tpanel
    .find('#' + $newTabLink.attr('aria-controls'))
      .addClass('active in').attr('aria-hidden', 'false');

  $newTabLink.attr('tabindex', '0');
  $newTabLink.focus();
}

Tabpanel.prototype.bindHandlers = function() {
  var self = this;
  
  this.$tabs.keydown(function(e) {
    return self.handleTabKeyDown($(this), e);
  });

  this.$tabs.click(function(e) {
    return self.handleTabClick($(this), e);
  });
}

Tabpanel.prototype.handleTabKeyDown = function($tab, e) {
  var $newTab, tabIndex;

  switch (e.keyCode) {
    case this.keys.left:
    case this.keys.up: {

      tabIndex = this.$tabs.index($tab);

      if (tabIndex === 0) {
        $newTab = this.$tabs.last();
      }
      else {
        $newTab = this.$tabs.eq(tabIndex - 1);
      }
      
      this.switchTabs($tab, $newTab);

      e.preventDefault();
      return false;
    }
    case this.keys.right:
    case this.keys.down: {

      tabIndex = this.$tabs.index($tab);

      if (tabIndex === this.$tabs.length-1) {
        $newTab = this.$tabs.first();
      }
      else {
        $newTab = this.$tabs.eq(tabIndex + 1);
      }

      this.switchTabs($tab, $newTab);

      e.preventDefault();
      return false;
    }
  }
}

Tabpanel.prototype.handleTabClick = function($tab, e) {
  var $oldTab = this.$tpanel.find('.tab.active');
  this.switchTabs($oldTab, $tab);
}