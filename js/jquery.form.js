{% block headcss %}
{% parent %}
{% endblock headcss %}
{% block headjavascript %}
{% parent %}
<script type="text/javascript" src="../js/jquery.form.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	var $dialog = $("#new-lesson-dialog").dialog({
		autoOpen: false,
		resizable: false,
		modal: true,
		width: 400,
		buttons: {
			"Сохранить": function() {
				//alert("Нажата кнопка Применить");
				$("#new-lesson-form").submit();
				$(this).dialog("close");
			},
			"Закрыть": function() {
			  $(this).dialog("close");
			}}
	});
	$('#link-new-lesson').click(function() {
		$dialog.dialog('open');
		// prevent the default action, e.g., following a link
		return false;
	});
	$(".date_input").datepicker({
		changeMonth: true,
		changeYear: true
	});
	$("button, input:submit").button();

	$('#dateRangeForm').ajaxForm ({ 
    	target: '#gradesBlock' 
	}); 

	$('#new-lesson-form').submit(function() {
		$(this).ajaxSubmit({target: '#gradesBlock'}); 
		return false; 
	}); 

	$("#gradesBlock").ajaxSuccess(function(evt, request, settings){
   		//alert("Table successfully loaded!");
   	});
	$('#dateRangeForm').submit();

});
</script>
{% endblock headjavascript %}
{% block content %}
<br />
	
 <select name="lesson_type_id" id="$lesson_type_id">
{% for lesson_type in lesson_types %}
<option value="{{lesson_type['lesson_type_id']}}">{{lesson_type['lesson_type_name']}}</option>
{% endfor %} 
</select>
 
{% endblock %}
{% block footer %}
{% parent %}
{% endblock %}
