(function(event){
	"use strict"; 
	var app = {
		
		init: function(){
			var gridContainer = $("#gridHolder");
			var txtInput = $("#txtInputText");
			var btnSubmit = $("#btnSubmit");
			btnSubmit.click(function(event){
				if(txtInput.val().length <1){
					return;
				}else{
					app.addElement(txtInput.val());
					txtInput.val("");
				}
			});

			txtInput.keydown(function(event){
				if(event.keyCode == 13){
					event.preventDefault();
					btnSubmit.trigger("click");
				}
			});

			$("#list").click(function(event){
				gridContainer.removeClass("gridContainerLayout").addClass("listContainer");
				gridContainer.children("div").removeClass("gridItem").addClass("listItem");
			});

			$("#grid").click(function(event){
				gridContainer.removeClass("listContainer").addClass("gridContainerLayout");
				gridContainer.children("div").removeClass("listItem").addClass("gridItem");
			});
		},

		addElement: function(shortText, longText){
			var gridContainer = $("#gridHolder");
			gridContainer.append("<div class=\"gridItem\">" + 
								"<p class=\"shortText\"> "+ shortText + "</p>"+
								"<p class=\"longText\"> "+ longText + "</p>"+
								"</div>");
			
		},

		readJson: function(data){
			$.getJSON("JSON/all.json", function(data){
				$.each(data.response, function(key, value){
					app.processJSON(value);
				});
			});
		},

		processJSON: function(response){
			app.addElement(response.description.short, response.description.long);
		}
		
	};
	$(document).ready(function(event){
		app.init();
		app.readJson();
	});

})();