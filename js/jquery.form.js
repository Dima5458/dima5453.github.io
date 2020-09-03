<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: quarter.php 4 2010-02-02 18:52:58Z kuzmich $
#

define('ADMIN_ZONE', true);

include_once ('../init.php');
include_once ('../include/curriculums.php');

if (isset($_REQUEST['school_year_id'])) {
	$school_year_id = intval($_REQUEST['school_year_id']);
} else {
  $school_year_id = 0;
}

if (isset($_REQUEST['quarter_id'])) {
	$quarter_id = intval($_REQUEST['quarter_id']);
} else {
  $quarter_id = 0;
}

$mode = @$_REQUEST['mode'];

if ($quarter_id == 0 && $mode == '') {
	$mode = 'add';
} elseif ($quarter_id != 0 && $mode == '') {
	$mode = 'update';
}



if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];

  if ($action == 'add') {

    $fields[] = "quarter_name='". mysql_escape_string(substr($_POST['quarter_name'], 0, 50))."'";
    $fields[] = "started='".implode('-', array_reverse(explode('.', $_POST['started'])))."'";
    $fields[] = "finished='".implode('-', array_reverse(explode('.', $_POST['finished']))  )."'";
    $fields[] = "quarter_type=".intval($_POST['quarter_type']);
    $fields[] = "school_year_id=".$school_year_id;

    db_query("INSERT quarters SET ".implode(', ', $fields));
    header('Location: quarter.php?mode=success_add');
    exit();

  } elseif ($action == 'update') {
    $fields = array();

    $fields[] = "quarter_name='". mysql_escape_string(substr($_POST['quarter_name'], 0, 50))."'";
    $fields[] = "started='".implode('-', array_reverse(explode('.', $_POST['started'])))."'";
    $fields[] = "finished='".implode('-', array_reverse(explode('.', $_POST['finished']))  )."'";
    $fields[] = "quarter_type=".intval($_POST['quarter_type']);


    db_query($sql = "UPDATE quarters SET ".implode(', ', $fields).' WHERE quarter_id='.$quarter_id);
    header('Location: quarter.php?mode=success_update');
    exit();

  }
}
  include('../header_dialog.php');
?>

  <body style="margin-left: 0px;	margin-right: 0px;">
<?php

  if ($mode == 'success_update') {
  	echo '<center>Информация о четверте успешно обновлена.<br /><br />';
  	echo '<input type="button" value="&nbsp;&nbsp;Закрыть&nbsp;&nbsp;" onclick="self.parent.tb_remove();self.parent.location.reload();" /></center>';
  } elseif ($mode == 'success_add') {
  	echo '<center>Новая четверть успешно добавлен.<br /><br />';
  	echo '<input type="button" value="&nbsp;&nbsp;Закрыть&nbsp;&nbsp;" onclick="self.parent.tb_remove();self.parent.location.reload();" />
  	&nbsp;&nbsp;<input type="button" value="&nbsp;&nbsp;Продолжить&nbsp;&nbsp;" onclick="document.location=\'school_year.php\'" /></center>';
  } elseif ($mode == 'update') {
    $quarter  = get_quarter($quarter_id);
    outQuarterForm($quarter);
  } elseif ($mode == 'add') {
    outQuarterForm();
  }

function outQuarterForm($quarter = null)
{
	global $school_year_id, $quarter_id;

	echo '
<form action="quarter.php" method="post">';
if (isset($quarter)) {
	echo '<input type="hidden" name="action" value="update" />';
  echo '<input type="hidden" name="quarter_id" value="'.$quarter_id.'" />';
} else {
  echo '<input type="hidden" name="action" value="add" />';
}
echo '<input type="hidden" name="school_year_id" value="'.$school_year_id.'" />';
echo '
<script type="text/javascript">
	jQuery(function($){
	$.mask.definitions[\'~\']=\'[01]\';
	$.mask.definitions[\'a\']=\'[0123]\';
	$.mask.definitions[\'b\']=\'[12]\';
  $.mask.definitions[\'c\']=\'[09]\';
  $("#started_id").mask("a9.~9.bc99");
  $("#finished_id").mask("a9.~9.bc99");
  });
</script>
<table width="100%" id="edit_in">
<tbody>
  <tr>
    <td>Название<font color="red">*</font></td>
    <td><input type="text" name="quarter_name" id="quarter_name_id" size="50" value="'.(isset($quarter)?$quarter['quarter_name']:'').'" /></td>
  </tr>
<tr><td colspan="2">&nbsp;</td></tr>
  <tr>
    <td>Начало<font color="red">*</font></td>
    <td><input type="text" name="started" id="started_id" value="'.(isset($quarter)?date('d.m.Y', strtotime($quarter['started'])):'').'" /></td>
  </tr>
  <tr>
    <td>Окончание<font color="red">*</font></td>
    <td><input type="text" name="finished" id="finished_id" value="'.(isset($quarter)?date('d.m.Y', strtotime($quarter['finished'])):'').'" /></td>
  </tr>
  <tr>
    <td>Тип<font color="red">*</font></td>
    <td><select name="quarter_type" id="quarter_type_id">
     <option value="1"'.(isset($quarter)?($quarter['quarter_type']==1?' selected="selected"':''):'').'>Учеба</option>
     <option value="2"'.(isset($quarter)?($quarter['quarter_type']==2?' selected="selected"':''):'').'>Каникулы</option>
     </select></td>
  </tr>
  <tr>
    <td colspan="2" align="center">';
if (isset($quarter)) {
	echo '<input type="submit" class="button" value="Сохранить" >';
} else {
  echo '<input type="submit" class="button" value="Добавить" >';
}
echo '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<input type="button" class="button" value="&nbsp;&nbsp;Закрыть&nbsp;&nbsp;" onclick="self.parent.tb_remove()" /></td>
</tr></tbody></table></form>';
}

?>
  </body>
</html>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: class.php 19 2010-04-04 08:57:11Z kuzmich $
#

define('ADMIN_ZONE', true);

include_once ('../init.php');
include 'header.php';
include_once ('../include/classes.php');

?>
<div id="dialog" style="display:none"></div>
<div id="editStudentDialog" style="display:none">
<div id="tabs">
	<ul>
		<li><a href="#tabs-1">Ученик</a></li>
		<li><a href="#tabs-2">Родители</a></li>
		<li><a href="#tabs-3">Действия</a></li>
		<li><a href="#tabs-4">История</a></li>
	</ul>

<div id="tabs-1">
<table id="edit_in">
<tbody>
  <tr>
    <td><label for="lname">Фамилия</label></td>
    <td><input type="text" id="last_name" name="last_name" class="required" value="" size="26" /></td>

    <td>&nbsp;</td>
    <td>Дата рождения</td>
    <td>
      <input type="text" name="birthday" id="birthday_id" value="" size="26" />
    </td>
  </tr>
  <tr>
    <td>Имя</td>
    <td><input type="text" id="first_name" name="first_name" class="required" value="" size="26" /></td>
    <td>&nbsp;</td>
    <td>Телефон</td>
    <td><input type="text" name="phone" id="phone_id" class="required" value="" size="26" /></td>
  </tr>
  <tr>
    <td>Отчество</td>
    <td><input type="text" id="middle_name" name="middle_name" class="required" value="" size="26" /></td>
    <td>&nbsp;</td>
    <td>Адрес</td>
    <td><textarea name="address" id="address_id" class="required" rows="4"></textarea></td>
  </tr>
</tbody>
</table>
</div>
<div id="tabs-2"></div>
<div id="tabs-3"></div>
<div id="tabs-4"></div>
</div>
</div>
	<script type="text/javascript">
	$(function() {
		$("#tabs").tabs();
		$("#tabs").tabs( { disabled: [1, 2, 3] } );
	});

	function editStudent(student_id) {
	  $.getJSON("student.php", { action: "student", student_id: student_id }, function(student){
      //alert("JSON Data: " + student.first_name);

   		$("#tabs").tabs( { disabled: [2, 3] } );

      $('#last_name').val(student.last_name);
      $('#first_name').val(student.first_name);
      $('#middle_name').val(student.middle_name);
      $('#editStudentDialog').dialog({
	title:'Редактирование',
	modal:true,
	height:470,
	width:700,
buttons: {'Закрыть': function() {
	        $(this).dialog('close');
	      }}})
    });

	}
	</script>

<?php

$class_id = $_REQUEST['class_id'];

$class   = db_get_first_row('SELECT * FROM classes WHERE class_id='.$class_id);
$teacher = db_get_first_row('SELECT * FROM teachers WHERE teacher_id='.$class['teacher_id']);
?>

Класс <b><?php echo "$class[class]$class[letter]"; ?></b> Классный руководитель: <b><?php echo "$teacher[last_name] $teacher[first_name] $teacher[middle_name]";?></b><br />
<?php echo $class['school_year'].'-'.($class['school_year'] + 1)?> год обучения<br />

<table width="100%">
<tr><td width="50%" valign="top">

<span class="head_top">Список учеников:</span>
<table id="rounded-corner">
<thead>
  <tr>
    <th class="rounded-left">№</th>
    <th>Имя</th>
    <th>&nbsp;</th>
    <th class="rounded-right">&nbsp;</th>
  </tr>
  </thead>
<?php
  $students_list = get_student_classes_list($_GET['class_id']);
  $n=1;
  foreach($students_list as $student) {

  echo "<tr><td>$n</td><td>$student[student_name]</td><td>
  <a href=\"student.php?class_id=$_GET[class_id]&student_id=$student[student_id]&".uniqid('')."&keepThis=true&TB_iframe=true&height=450&width=770&modal=true\" title=\"Редактирвание ученика\" class=\"thickbox\">Редактировать</a></td>";
  echo "<td><a href=\"class.php?class_id=$_GET[class_id]&student_id=$student[student_id]&action=expel\" title=\"Отчислить ученика\">Отчислить</a></td></tr>";
  $n++;
  }
?>
      <tfoot>
    	<tr>
       	  <td colspan="2" class="rounded-foot-left">&nbsp;</td>
        	<td>
        	  <a href="" onClick="javascript: tb_show('Добавить', 'student.php?class_id=<?php echo $_GET['class_id'];?>&<?php echo uniqid(''); ?>&TB_iframe=true&height=450&width=770'); return false;" class="add" title="Добавить">Добавить</a>
          </td>
          <td class="rounded-foot-right">&nbsp;</td>
        </tr>
    </tfoot>
</table>
</td><td width="50%" valign="top">
<span class="head_top">Список преподаваемых дисциплин</span>
<table id="rounded-corner">
<thead>
  <tr>
    <th class="rounded-left">Дисциплина</th>
    <th>Учитель</th>
    <th class="rounded-right">&nbsp;</th>
  </tr>
  </thead>
<?php
  $res = db_query('SELECT subject_id, CONCAT_WS( \' \', teachers.last_name, teachers.first_name, teachers.middle_name ) AS name, discipline
FROM classes
LEFT JOIN subjects ON classes.class_id = subjects.class_id
LEFT JOIN disciplines ON subjects.discipline_id = disciplines.discipline_id
LEFT JOIN teachers ON teachers.teacher_id = subjects.teacher_id
WHERE classes.class_id='.$class_id.' ORDER BY discipline');
while($row = mysql_fetch_assoc($res)) {
  echo "<tr><td>$row[discipline]</td><td>$row[name]</td><td>";
  echo '<a href="subject.php?class_id='.$class_id.'&subject_id='.$row['subject_id'].'&TB_iframe=true&height=150&width=380" title="Изменить" class="thickbox">Изменить</a>';
  echo "</td></tr>";
}
?>
      <tfoot>
    	<tr>
       	  <td colspan="2" class="rounded-foot-left">&nbsp;</td>
        	<td class="rounded-foot-right">
        	  <a href="" onClick="javascript: tb_show('Добавить', 'subject.php?class_id=<?php echo $class_id?>&TB_iframe=true&height=150&width=380'); return false;" class="add" title="Добавить">Добавить</a>
          </td>
        </tr>
    </tfoot>
</table>
</td>
</tr></table>
<?php
include 'footer.php';
?>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: teachers.php 4 2010-02-02 18:52:58Z kuzmich $
#

define('ADMIN_ZONE', true);

include_once ('../init.php');
include 'header.php';
include_once ('../include/teachers.php');
?>
<div align="center">
<span class="head_top">Список учителей школы:</span>
<table id="rounded-corner">
  <thead>
  <tr>
    <th class="rounded-left"> Ф.И.О.</th>
    <th class="rounded-right">&nbsp;</th>
  </tr>
  </thead>
  <tbody>
<?php
  $teacher_list = get_teachers_list();
  foreach($teacher_list as $teacher) {

  echo "<tr><td>$teacher[first_name] $teacher[middle_name] $teacher[last_name]</td><td>
  <a href=\"teacher.php?teacher_id=$teacher[teacher_id]&".uniqid('')."&keepThis=true&TB_iframe=true&height=350&width=330&modal=true\" class=\"thickbox\" title=\"Редактировать информацию об учителе\">Редактировать</a></td></tr>";

  }
?>
</tbody>
<tfoot>
    	<tr>
       	  <td class="rounded-foot-left">&nbsp;</td>
        	<td class="rounded-foot-right"><a href="" onClick="javascript: tb_show('Добавить', 'teacher.php?<?php echo uniqid('') ?>&keepThis=true&TB_iframe=true&height=330&width=350&modal=true'); return false;" class="add" title="Добавить">Добавить</a>
      </td>
        </tr>
    </tfoot>
</table>
</div>
<?php
include 'footer.php';
?>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: class.php 19 2010-04-04 08:57:11Z kuzmich $
#

define('ADMIN_ZONE', true);

include_once ('../init.php');
include 'header.php';
include_once ('../include/classes.php');

?>
<div id="dialog" style="display:none"></div>
<div id="editStudentDialog" style="display:none">
<div id="tabs">
	<ul>
		<li><a href="#tabs-1">Ученик</a></li>
		<li><a href="#tabs-2">Родители</a></li>
		<li><a href="#tabs-3">Действия</a></li>
		<li><a href="#tabs-4">История</a></li>
	</ul>

<div id="tabs-1">
<table id="edit_in">
<tbody>
  <tr>
    <td><label for="lname">Фамилия</label></td>
    <td><input type="text" id="last_name" name="last_name" class="required" value="" size="26" /></td>

    <td>&nbsp;</td>
    <td>Дата рождения</td>
    <td>
      <input type="text" name="birthday" id="birthday_id" value="" size="26" />
    </td>
  </tr>
  <tr>
    <td>Имя</td>
    <td><input type="text" id="first_name" name="first_name" class="required" value="" size="26" /></td>
    <td>&nbsp;</td>
    <td>Телефон</td>
    <td><input type="text" name="phone" id="phone_id" class="required" value="" size="26" /></td>
  </tr>
  <tr>
    <td>Отчество</td>
    <td><input type="text" id="middle_name" name="middle_name" class="required" value="" size="26" /></td>
    <td>&nbsp;</td>
    <td>Адрес</td>
    <td><textarea name="address" id="address_id" class="required" rows="4"></textarea></td>
  </tr>
</tbody>
</table>
</div>
<div id="tabs-2"></div>
<div id="tabs-3"></div>
<div id="tabs-4"></div>
</div>
</div>
	<script type="text/javascript">
	$(function() {
		$("#tabs").tabs();
		$("#tabs").tabs( { disabled: [1, 2, 3] } );
	});

	function editStudent(student_id) {
	  $.getJSON("student.php", { action: "student", student_id: student_id }, function(student){
      //alert("JSON Data: " + student.first_name);

   		$("#tabs").tabs( { disabled: [2, 3] } );

      $('#last_name').val(student.last_name);
      $('#first_name').val(student.first_name);
      $('#middle_name').val(student.middle_name);
      $('#editStudentDialog').dialog({
	title:'Редактирование',
	modal:true,
	height:470,
	width:700,
buttons: {'Закрыть': function() {
	        $(this).dialog('close');
	      }}})
    });

	}
	</script>

<?php

$class_id = $_REQUEST['class_id'];

$class   = db_get_first_row('SELECT * FROM classes WHERE class_id='.$class_id);
$teacher = db_get_first_row('SELECT * FROM teachers WHERE teacher_id='.$class['teacher_id']);
?>

Класс <b><?php echo "$class[class]$class[letter]"; ?></b> Классный руководитель: <b><?php echo "$teacher[last_name] $teacher[first_name] $teacher[middle_name]";?></b><br />
<?php echo $class['school_year'].'-'.($class['school_year'] + 1)?> год обучения<br />

<table width="100%">
<tr><td width="50%" valign="top">

<span class="head_top">Список учеников:</span>
<table id="rounded-corner">
<thead>
  <tr>
    <th class="rounded-left">№</th>
    <th>Имя</th>
    <th>&nbsp;</th>
    <th class="rounded-right">&nbsp;</th>
  </tr>
  </thead>
<?php
  $students_list = get_student_classes_list($_GET['class_id']);
  $n=1;
  foreach($students_list as $student) {

  echo "<tr><td>$n</td><td>$student[student_name]</td><td>
  <a href=\"student.php?class_id=$_GET[class_id]&student_id=$student[student_id]&".uniqid('')."&keepThis=true&TB_iframe=true&height=450&width=770&modal=true\" title=\"Редактирвание ученика\" class=\"thickbox\">Редактировать</a></td>";
  echo "<td><a href=\"class.php?class_id=$_GET[class_id]&student_id=$student[student_id]&action=expel\" title=\"Отчислить ученика\">Отчислить</a></td></tr>";
  $n++;
  }
?>
      <tfoot>
    	<tr>
       	  <td colspan="2" class="rounded-foot-left">&nbsp;</td>
        	<td>
        	  <a href="" onClick="javascript: tb_show('Добавить', 'student.php?class_id=<?php echo $_GET['class_id'];?>&<?php echo uniqid(''); ?>&TB_iframe=true&height=450&width=770'); return false;" class="add" title="Добавить">Добавить</a>
          </td>
          <td class="rounded-foot-right">&nbsp;</td>
        </tr>
    </tfoot>
</table>
</td><td width="50%" valign="top">
<span class="head_top">Список преподаваемых дисциплин</span>
<table id="rounded-corner">
<thead>
  <tr>
    <th class="rounded-left">Дисциплина</th>
    <th>Учитель</th>
    <th class="rounded-right">&nbsp;</th>
  </tr>
  </thead>
<?php
  $res = db_query('SELECT subject_id, CONCAT_WS( \' \', teachers.last_name, teachers.first_name, teachers.middle_name ) AS name, discipline
FROM classes
LEFT JOIN subjects ON classes.class_id = subjects.class_id
LEFT JOIN disciplines ON subjects.discipline_id = disciplines.discipline_id
LEFT JOIN teachers ON teachers.teacher_id = subjects.teacher_id
WHERE classes.class_id='.$class_id.' ORDER BY discipline');
while($row = mysql_fetch_assoc($res)) {
  echo "<tr><td>$row[discipline]</td><td>$row[name]</td><td>";
  echo '<a href="subject.php?class_id='.$class_id.'&subject_id='.$row['subject_id'].'&TB_iframe=true&height=150&width=380" title="Изменить" class="thickbox">Изменить</a>';
  echo "</td></tr>";
}
?>
      <tfoot>
    	<tr>
       	  <td colspan="2" class="rounded-foot-left">&nbsp;</td>
        	<td class="rounded-foot-right">
        	  <a href="" onClick="javascript: tb_show('Добавить', 'subject.php?class_id=<?php echo $class_id?>&TB_iframe=true&height=150&width=380'); return false;" class="add" title="Добавить">Добавить</a>
          </td>
        </tr>
    </tfoot>
</table>
</td>
</tr></table>
<?php
include 'footer.php';
?>
students WHERE pin_code=%n and pin_code>0";
	$res = db_query($sql,$pincode);
	if (!$res) {
		return false;
	}
	$row = mysql_fetch_assoc($res);
	return $row;
}

function get_student_class_id($student_id) {
	$sql = 'SELECT class_id FROM students_in_class WHERE student_id=%n';
	$result = db_query($sql,$student_id);
	if (!$result) {
		return false;
	}
	$row = mysql_fetch_assoc($result);
	return $row['class_id'];
}

function get_student_grades($student_id, $date_from, $date_to) {
	$sql = <<<EOS
SELECT
  students_in_class.student_id AS student_id,
  lessons.lesson_date          AS lesson_date,
  WEEKDAY(lessons.lesson_date) AS lesson_weekday,
  lessons.lesson_id            AS lesson_id,
  DATE_FORMAT(lessons.lesson_date,'%%d') AS lesson_day,
  DATE_FORMAT(lessons.lesson_date,'%%m') AS lesson_month,
  DATE_FORMAT(lessons.lesson_date,'%%Y') AS lesson_year,
  lessons.lesson_type_id       AS lesson_type_id,
  lt.lesson_type_name          AS lesson_type_name,
  subjects.discipline_id       AS discipline_id,
  disciplines.discipline       AS discipline,
  lessons.topic                AS topic,
  students_on_lesson.grade     AS grade
FROM students_in_class
  JOIN subjects
    ON subjects.class_id = students_in_class.class_id
  JOIN lessons
    ON lessons.subject_id = subjects.subject_id
  LEFT JOIN lesson_types lt ON lt.lesson_type_id=lessons.lesson_type_id
  LEFT JOIN students_on_lesson
    ON students_on_lesson.student_id = students_in_class.student_id
      AND students_on_lesson.lesson_id = lessons.lesson_id
  LEFT JOIN disciplines
    ON disciplines.discipline_id = subjects.discipline_id
WHERE grade IS NOT NULL
    AND students_in_class.student_id = %n
    AND lesson_date BETWEEN '%s' AND '%s'
ORDER BY lessons.lesson_date, disciplines.discipline, lessons.lesson_id
EOS;
	$result = db_query($sql, $student_id, $date_from, $date_to);
	if (!$result) {
		return false;
	}
	$array = array();
	while($row = mysql_fetch_assoc($result)){
		$array[] = $row; 
	}
	return $array;
}
?>
<?php
#
# $Id: footer.php 11 2010-03-20 21:11:22Z kuzmich $
#

?>
<br />
<div align="center">
<table border="0" cellspacing="0" cellpadding="0" class="table_menu">
  <tr>
    <td><img src="../images/circle_left_top.gif" alt="" width="6" height="6"></td>
    <td valign="top" class="border_top"><img src="../images/border.gif" alt="" width="1" height="1"></td>
    <td><img src="../images/circle_right_top.gif" alt="" width="6" height="6"></td>
  </tr>
  <tr>
    <td class="border_left">&nbsp;</td>
    <td class="padding" align="center"> <br /><nowrap>Èäåÿ: <a href="http://www.my-edu.ru/">Þðèé Êîðäûê</a>, Ðåàëèçàöèÿ: <a href="http://www.kuzin.name">Êóçèí Ñåðãåé</a>, Ïðè ïîääåðæêå: <a href="http://www.name4yoursite.ru">Name4YourSite.Ru</a></nowrap><br /><br /></td>
    <td class="border_right">&nbsp;</td>
  </tr>
  <tr>
    <td><img src="../images/circle_left_bottom.gif" alt="" width="6" height="6"></td>
    <td width="99%" valign="bottom" class="border_bottom"><img src="../images/border.gif" alt="" width="1" height="1"></td>
    <td><img src="../images/circle_right_bottom.gif" alt="" width="6" height="6"></td>
  </tr>
</table>
</div>
  </body>
</html>
<?php
#
# $Id: header.php 17 2010-03-30 16:45:00Z kuzmich $
#

?>
<html>
  <head>
    <title>Школьный журнал</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/i18n/jquery-ui.datepicker-ru.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
<?php if (isset($_SESSION['student_id']))  { ?>
<br />
<div align="center">
 <table border="0" cellspacing="0" cellpadding="0" class="table_menu" style="width:200px">
  <tr>
    <td><img src="images/circle_left_top.gif" alt="" width="6" height="6"></td>
    <td valign="top" class="border_top"><img src="images/border.gif" alt="" width="1" height="1"></td>
    <td><img src="images/circle_right_top.gif" alt="" width="6" height="6"></td>
  </tr>
  <tr>
    <td class="border_left">&nbsp;</td>
    <td class="padding"><table>
      <tr>
        <td nowrap="nowrap">&nbsp;<a href="index.php">Просмотр оценок</a>&nbsp;</td>
        <td align="center"><img src="../images/dec.png" alt="" width="1" height="51"></td>
        <td>&nbsp;<a href="index.php?action=logout">Выход</a>&nbsp;</td>
      </tr>
    </table></td>
    <td class="border_right">&nbsp;</td>
  </tr>
  <tr>
    <td><img src="images/circle_left_bottom.gif" alt="" width="6" height="6"></td>
    <td width="99%" valign="bottom" class="border_bottom"><img src="images/border.gif" alt="" width="1" height="1"></td>
    <td><img src="images/circle_right_bottom.gif" alt="" width="6" height="6"></td>
  </tr>
</table>
</div>

<?php
$student = get_student($_SESSION['student_id']);

echo "$student[last_name] $student[first_name] $student[middle_name]<br />";
?>
<?php } ?>
<?php
#
# $Id: header_dialog.php 19 2010-04-04 08:57:11Z kuzmich $
#

?>
<html>
  <head>
    <script type="text/javascript" src="../js/jquery.js"></script>
    <script type="text/javascript" src="../js/jquery-ui.js"></script>
    <script type="text/javascript" src="../js/i18n/jquery-ui.datepicker-ru.js"></script>
    <script type="text/javascript" src="../js/jquery.validate.js"></script>
    <script type="text/javascript" src="../js/i18n/jquery.validate-ru.js"></script>
    <script type="text/javascript" src="../js/jquery.maskedinput.js"></script>
    <script type="text/javascript" src="../js/thickbox.js"></script>
    <link rel="stylesheet" type="text/css" href="../ui-theme/<?php echo $config['ui']['theme']?>/jquery-ui.css" />
    <link rel="stylesheet" type="text/css" href="../thickbox.css" media="screen" />
    <link rel="stylesheet" type="text/css" href="../style.css" />
  </head>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2010 Z.                                                       |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: index.php 4 2010-02-02 18:52:58Z kuzmich $
#

define('STUDENT_ZONE', true);
include_once ('init.php');
include_once ('include/students.php');
include_once ('include/classes.php');
include_once ('include/curriculums.php');

$renderArray = array();
$fromAjax = intval($_REQUEST['fromAjax']);
$template_name = 'index.html';

if ($fromAjax) {
	$template_name = 'index-ajax.html';
	$quarter_id = intval($_REQUEST['quarter_id']) or die('Invalid quarter_id');
	$quarter = get_quarter($quarter_id) or die("No quarter for $quarter_id=$quarter_id");
	$date_from = $quarter['started'];
	$date_to = $quarter['finished'];
	$day_of_week = array(0 => 'Пн', 1 => 'Вт'
	, 2 => 'Ср', 3 => 'Чт'
	, 4 => 'Пт', 5 => 'Сб', 6 => 'Вс');
	$class_id = get_student_class_id($student_id) or die('Unknown student');
	$student_grades = get_student_grades($student_id, $date_from, $date_to);
	$disciplines = get_disciplines_from_class($class_id);
	$dates = array();
	$grades = array();
	foreach ($student_grades as $grade) {
		$lesson_monthyear = $grade['lesson_month'].'.'.$grade['lesson_year'];
		$dates[$lesson_monthyear][$grade['lesson_date']] = array('lesson_weekday' 	=> $grade['lesson_weekday']
		, 'lesson_weekday_w'	=> $day_of_week[$grade['lesson_weekday']]
		, 'lesson_day' 		=> $grade['lesson_day']
		, 'lesson_month' 	=> $grade['lesson_month']
		, 'lesson_year' 		=> $grade['lesson_year']);
		$grades[$grade['discipline_id']][$grade['lesson_date']][] = array('grade'=>$grade['grade'],
		'topic' => $grade['topic'], 'lesson_id'=> $grade['lesson_id'],
		'lesson_type_id' => $grade['lesson_type_id'], 'lesson_type_name' => $grade['lesson_type_name']);
	}
	$quarter['started_date'] = date("d.m.Y",strtotime($quarter['started']));
	$quarter['finished_date'] = date("d.m.Y",strtotime($quarter['finished']));
	$renderArray['quarter'] = $quarter;
	$renderArray['dates'] = $dates;
	$renderArray['disciplines'] = $disciplines;
	$renderArray['grades'] = $grades;
} else {
	$year = get_current_year() or die('Now current year');
	$quarters = get_quarters_in_year($year['school_year_id'],1);
	$renderArray['ui_theme'] = $config['ui']['theme'];
	$renderArray['year'] = $year;
	$renderArray['quarters'] = $quarters;
}

$template = $twig->loadTemplate('students/'.$template_name);
echo $template->render($renderArray);
?>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2010 Z.
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

include_once ('init.php');
include_once ('include/students.php');

$loginError = '';
if (isset($_REQUEST['action'])) {
  $action = $_REQUEST['action'];
  if ($action == 'login') {
  	$pin = intval($_POST['pin_code']);
  	$student = student_login($pin);
    if ($student and intval($student['student_id']) != 0) {
    	$_SESSION['student_id'] = $student['student_id'];
    	header('Location: index.php');
    	exit();
    } else {
    	$loginError = 'ПИН неверен';
    }
  } elseif ($action == 'logout') {
    unset($_SESSION['student_id']);
    header('Location: index.php');
    exit();
  }

}

$renderArray = array();
$template_name = 'login.html';
$renderArray['loginError']=$loginError;

$template = $twig->loadTemplate('students/'.$template_name);
echo $template->render($renderArray);
?>
<?php
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2010 Z.                                                       |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

#
# $Id: add_class.php 4 2010-02-02 18:52:58Z kuzmich $
#


define('ADMIN_ZONE', true);

include_once ('../init.php');
include_once ('../include/teachers.php');
include_once ('../include/classes.php');

$renderArray['class_numbers'] = $config['class']['numbers'];
$renderArray['class_letters'] = $config['class']['letters'];

if (isset($_REQUEST['action']) and $_REQUEST['action'] == 'add') {
	$res = add_new_class(intval($_REQUEST['class']),$_REQUEST['letter'],intval($_REQUEST['school_year_id']), intval($_REQUEST['teacher_id']));
	echo json_encode($res);
	
} else {
	$teachers = get_teachers_list();
	$school_year_id = intval(@$_REQUEST['school_year_id']) or die('Invalid call');
	$template_name = 'add_class-ajax.html';
	$renderArray['teachers'] = $teachers;
	$renderArray['school_year_id'] = $school_year_id;
	$template = $twig->loadTemplate('admins/'.$template_name);
	echo $template->render($renderArray);
}

?>
/*!
 * jQuery Form Plugin
 * version: 2.49 (18-OCT-2010)
 * @requires jQuery v1.3.2 or later
 *
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
;(function($) {

/*
	Usage Note:
	-----------
	Do not use both ajaxSubmit and ajaxForm on the same form.  These
	functions are intended to be exclusive.  Use ajaxSubmit if you want
	to bind your own submit handler to the form.  For example,
	$(document).ready(function() {
		$('#myForm').bind('submit', function(e) {
			e.preventDefault(); // <-- important
			$(this).ajaxSubmit({
				target: '#output'
			});
		});
	});
	Use ajaxForm when you want the plugin to manage all the event binding
	for you.  For example,
	$(document).ready(function() {
		$('#myForm').ajaxForm({
			target: '#output'
		});
	});
	When using ajaxForm, the ajaxSubmit function will be invoked for you
	at the appropriate time.
*/

/**
 * ajaxSubmit() provides a mechanism for immediately submitting
 * an HTML form using AJAX.
 */
$.fn.ajaxSubmit = function(options) {
	// fast fail if nothing selected (http://dev.jquery.com/ticket/2752)
	if (!this.length) {
		log('ajaxSubmit: skipping submit process - no element selected');
		return this;
	}

	if (typeof options == 'function') {
		options = { success: options };
	}

	var url = $.trim(this.attr('action'));
	if (url) {
		// clean url (don't include hash vaue)
		url = (url.match(/^([^#]+)/)||[])[1];
	}
	url = url || window.location.href || '';

	options = $.extend(true, {
		url:  url,
		type: this.attr('method') || 'GET',
		iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
	}, options);

	// hook for manipulating the form data before it is extracted;
	// convenient for use with rich editors like tinyMCE or FCKEditor
	var veto = {};
	this.trigger('form-pre-serialize', [this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-pre-serialize trigger');
		return this;
	}

	// provide opportunity to alter form data before it is serialized
	if (options.beforeSerialize && options.beforeSerialize(this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSerialize callback');
		return this;
	}

	var n,v,a = this.formToArray(options.semantic);
	if (options.data) {
		options.extraData = options.data;
		for (n in options.data) {
			if(options.data[n] instanceof Array) {
				for (var k in options.data[n]) {
					a.push( { name: n, value: options.data[n][k] } );
				}
			}
			else {
				v = options.data[n];
				v = $.isFunction(v) ? v() : v; // if value is fn, invoke it
				a.push( { name: n, value: v } );
			}
		}
	}

	// give pre-submit callback an opportunity to abort the submit
	if (options.beforeSubmit && options.beforeSubmit(a, this, options) === false) {
		log('ajaxSubmit: submit aborted via beforeSubmit callback');
		return this;
	}

	// fire vetoable 'validate' event
	this.trigger('form-submit-validate', [a, this, options, veto]);
	if (veto.veto) {
		log('ajaxSubmit: submit vetoed via form-submit-validate trigger');
		return this;
	}

	var q = $.param(a);

	if (options.type.toUpperCase() == 'GET') {
		options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + q;
		options.data = null;  // data is null for 'get'
	}
	else {
		options.data = q; // data is the query string for 'post'
	}

	var $form = this, callbacks = [];
	if (options.resetForm) {
		callbacks.push(function() { $form.resetForm(); });
	}
	if (options.clearForm) {
		callbacks.push(function() { $form.clearForm(); });
	}

	// perform a load on the target only if dataType is not provided
	if (!options.dataType && options.target) {
		var oldSuccess = options.success || function(){};
		callbacks.push(function(data) {
			var fn = options.replaceTarget ? 'replaceWith' : 'html';
			$(options.target)[fn](data).each(oldSuccess, arguments);
		});
	}
	else if (options.success) {
		callbacks.push(options.success);
	}

	options.success = function(data, status, xhr) { // jQuery 1.4+ passes xhr as 3rd arg
		var context = options.context || options;   // jQuery 1.4+ supports scope context 
		for (var i=0, max=callbacks.length; i < max; i++) {
			callbacks[i].apply(context, [data, status, xhr || $form, $form]);
		}
	};

	// are there files to upload?
	var fileInputs = $('input:file', this).length > 0;
	var mp = 'multipart/form-data';
	var multipart = ($form.attr('enctype') == mp || $form.attr('encoding') == mp);

	// options.iframe allows user to force iframe mode
	// 06-NOV-09: now defaulting to iframe mode if file input is detected
   if (options.iframe !== false && (fileInputs || options.iframe || multipart)) {
	   // hack to fix Safari hang (thanks to Tim Molendijk for this)
	   // see:  http://groups.google.com/group/jquery-dev/browse_thread/thread/36395b7ab510dd5d
	   if (options.closeKeepAlive) {
		   $.get(options.closeKeepAlive, fileUpload);
		}
	   else {
		   fileUpload();
		}
   }
   else {
	   $.ajax(options);
   }

	// fire 'notify' event
	this.trigger('form-submit-notify', [this, options]);
	return this;


	// private function for handling file uploads (hat tip to YAHOO!)
	function fileUpload() {
		var form = $form[0];

		if ($(':input[name=submit],:input[id=submit]', form).length) {
			// if there is an input with a name or id of 'submit' then we won't be
			// able to invoke the submit fn on the form (at least not x-browser)
			alert('Error: Form elements must not have name or id of "submit".');
			return;
		}
		
		var s = $.extend(true, {}, $.ajaxSettings, options);
		s.context = s.context || s;
		var id = 'jqFormIO' + (new Date().getTime()), fn = '_'+id;
		window[fn] = function() {
			var f = $io.data('form-plugin-onload');
			if (f) {
				f();
				window[fn] = undefined;
				try { delete window[fn]; } catch(e){}
			}
		}
		var $io = $('<iframe id="' + id + '" name="' + id + '" src="'+ s.iframeSrc +'" onload="window[\'_\'+this.id]()" />');
		var io = $io[0];

		$io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });

		var xhr = { // mock object
			aborted: 0,
			responseText: null,
			responseXML: null,
			status: 0,
			statusText: 'n/a',
			getAllResponseHeaders: function() {},
			getResponseHeader: function() {},
			setRequestHeader: function() {},
			abort: function() {
				this.aborted = 1;
				$io.attr('src', s.iframeSrc); // abort op in progress
			}
		};

		var g = s.global;
		// trigger ajax global events so that activity/block indicators work like normal
		if (g && ! $.active++) {
			$.event.trigger("ajaxStart");
		}
		if (g) {
			$.event.trigger("ajaxSend", [xhr, s]);
		}

		if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
			if (s.global) { 
				$.active--;
			}
			return;
		}
		if (xhr.aborted) {
			return;
		}

		var cbInvoked = false;
		var timedOut = 0;

		// add submitting element to data if we know it
		var sub = form.clk;
		if (sub) {
			var n = sub.name;
			if (n && !sub.disabled) {
				s.extraData = s.extraData || {};
				s.extraData[n] = sub.value;
				if (sub.type == "image") {
					s.extraData[n+'.x'] = form.clk_x;
					s.extraData[n+'.y'] = form.clk_y;
				}
			}
		}

		// take a breath so that pending repaints get some cpu time before the upload starts
		function doSubmit() {
			// make sure form attrs are set
			var t = $form.attr('target'), a = $form.attr('action');

			// update form attrs in IE friendly way
			form.setAttribute('target',id);
			if (form.getAttribute('method') != 'POST') {
				form.setAttribute('method', 'POST');
			}
			if (form.getAttribute('action') != s.url) {
				form.setAttribute('action', s.url);
			}

			// ie borks in some cases when setting encoding
			if (! s.skipEncodingOverride) {
				$form.attr({
					encoding: 'multipart/form-data',
					enctype:  'multipart/form-data'
				});
			}

			// support timout
			if (s.timeout) {
				setTimeout(function() { timedOut = true; cb(); }, s.timeout);
			}

			// add "extra" data to form if provided in options
			var extraInputs = [];
			try {
				if (s.extraData) {
					for (var n in s.extraData) {
						extraInputs.push(
							$('<input type="hidden" name="'+n+'" value="'+s.extraData[n]+'" />')
								.appendTo(form)[0]);
					}
				}

				// add iframe to doc and submit the form
				$io.appendTo('body');
				$io.data('form-plugin-onload', cb);
				form.submit();
			}
			finally {
				// reset attrs and remove "extra" input elements
				form.setAttribute('action',a);
				if(t) {
					form.setAttribute('target', t);
				} else {
					$form.removeAttr('target');
				}
				$(extraInputs).remove();
			}
		}

		if (s.forceSync) {
			doSubmit();
		}
		else {
			setTimeout(doSubmit, 10); // this lets dom updates render
		}
	
		var data, doc, domCheckCount = 50;

		function cb() {
			if (cbInvoked) {
				return;
			}

			$io.removeData('form-plugin-onload');
			
			var ok = true;
			try {
				if (timedOut) {
					throw 'timeout';
				}
				// extract the server response from the iframe
				doc = io.contentWindow ? io.contentWindow.document : io.contentDocument ? io.contentDocument : io.document;
				
				var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
				log('isXml='+isXml);
				if (!isXml && window.opera && (doc.body == null || doc.body.innerHTML == '')) {
					if (--domCheckCount) {
						// in some browsers (Opera) the iframe DOM is not always traversable when
						// the onload callback fires, so we loop a bit to accommodate
						log('requeing onLoad callback, DOM not available');
						setTimeout(cb, 250);
						return;
					}
					// let this fall through because server response could be an empty document
					//log('Could not access iframe DOM after mutiple tries.');
					//throw 'DOMException: not available';
				}

				//log('response detected');
				cbInvoked = true;
				xhr.responseText = doc.documentElement ? doc.documentElement.innerHTML : null; 
				xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
				xhr.getResponseHeader = function(header){
					var headers = {'content-type': s.dataType};
					return headers[header];
				};

				var scr = /(json|script)/.test(s.dataType);
				if (scr || s.textarea) {
					// see if user embedded response in textarea
					var ta = doc.getElementsByTagName('textarea')[0];
					if (ta) {
						xhr.responseText = ta.value;
					}
					else if (scr) {
						// account for browsers injecting pre around json response
						var pre = doc.getElementsByTagName('pre')[0];
						var b = doc.getElementsByTagName('body')[0];
						if (pre) {
							xhr.responseText = pre.innerHTML;
						}
						else if (b) {
							xhr.responseText = b.innerHTML;
						}
					}			  
				}
				else if (s.dataType == 'xml' && !xhr.responseXML && xhr.responseText != null) {
					xhr.responseXML = toXml(xhr.responseText);
				}
				data = $.httpData(xhr, s.dataType);
			}
			catch(e){
				log('error caught:',e);
				ok = false;
				xhr.error = e;
				$.handleError(s, xhr, 'error', e);
			}

			// ordering of these callbacks/triggers is odd, but that's how $.ajax does it
			if (ok) {
				s.success.call(s.context, data, 'success', xhr);
				if (g) {
					$.event.trigger("ajaxSuccess", [xhr, s]);
				}
			}
			if (g) {
				$.event.trigger("ajaxComplete", [xhr, s]);
			}
			if (g && ! --$.active) {
				$.event.trigger("ajaxStop");
			}
			if (s.complete) {
				s.complete.call(s.context, xhr, ok ? 'success' : 'error');
			}

			// clean up
			setTimeout(function() {
				$io.removeData('form-plugin-onload');
				$io.remove();
				xhr.responseXML = null;
			}, 100);
		}

		function toXml(s, doc) {
			if (window.ActiveXObject) {
				doc = new ActiveXObject('Microsoft.XMLDOM');
				doc.async = 'false';
				doc.loadXML(s);
			}
			else {
				doc = (new DOMParser()).parseFromString(s, 'text/xml');
			}
			return (doc && doc.documentElement && doc.documentElement.tagName != 'parsererror') ? doc : null;
		}
	}
};

/**
 * ajaxForm() provides a mechanism for fully automating form submission.
 *
 * The advantages of using this method instead of ajaxSubmit() are:
 *
 * 1: This method will include coordinates for <input type="image" /> elements (if the element
 *	is used to submit the form).
 * 2. This method will include the submit element's name/value data (for the element that was
 *	used to submit the form).
 * 3. This method binds the submit() method to the form for you.
 *
 * The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
 * passes the options argument along after properly binding events for submit elements and
 * the form itself.
 */
$.fn.ajaxForm = function(options) {
	// in jQuery 1.3+ we can fix mistakes with the ready state
	if (this.length === 0) {
		var o = { s: this.selector, c: this.context };
		if (!$.isReady && o.s) {
			log('DOM not ready, queuing ajaxForm');
			$(function() {
				$(o.s,o.c).ajaxForm(options);
			});
			return this;
		}
		// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
		log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
		return this;
	}
	
	return this.ajaxFormUnbind().bind('submit.form-plugin', function(e) {
		if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
			e.preventDefault();
			$(this).ajaxSubmit(options);
		}
	}).bind('click.form-plugin', function(e) {
		var target = e.target;
		var $el = $(target);
		if (!($el.is(":submit,input:image"))) {
			// is this a child element of the submit el?  (ex: a span within a button)
			var t = $el.closest(':submit');
			if (t.length == 0) {
				return;
			}
			target = t[0];
		}
		var form = this;
		form.clk = target;
		if (target.type == 'image') {
			if (e.offsetX != undefined) {
				form.clk_x = e.offsetX;
				form.clk_y = e.offsetY;
			} else if (typeof $.fn.offset == 'function') { // try to use dimensions plugin
				var offset = $el.offset();
				form.clk_x = e.pageX - offset.left;
				form.clk_y = e.pageY - offset.top;
			} else {
				form.clk_x = e.pageX - target.offsetLeft;
				form.clk_y = e.pageY - target.offsetTop;
			}
		}
		// clear form vars
		setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
	});
};

// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
	return this.unbind('submit.form-plugin click.form-plugin');
};

/**
 * formToArray() gathers form element data into an array of objects that can
 * be passed to any of the following ajax functions: $.get, $.post, or load.
 * Each object in the array has both a 'name' and 'value' property.  An example of
 * an array for a simple login form might be:
 *
 * [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
 *
 * It is this array that is passed to pre-submit callback functions provided to the
 * ajaxSubmit() and ajaxForm() methods.
 */
$.fn.formToArray = function(semantic) {
	var a = [];
	if (this.length === 0) {
		return a;
	}

	var form = this[0];
	var els = semantic ? form.getElementsByTagName('*') : form.elements;
	if (!els) {
		return a;
	}
	
	var i,j,n,v,el,max,jmax;
	for(i=0, max=els.length; i < max; i++) {
		el = els[i];
		n = el.name;
		if (!n) {
			continue;
		}

		if (semantic && form.clk && el.type == "image") {
			// handle image inputs on the fly when semantic == true
			if(!el.disabled && form.clk == el) {
				a.push({name: n, value: $(el).val()});
				a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
			}
			continue;
		}

		v = $.fieldValue(el, true);
		if (v && v.constructor == Array) {
			for(j=0, jmax=v.length; j < jmax; j++) {
				a.push({name: n, value: v[j]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: n, value: v});
		}
	}

	if (!semantic && form.clk) {
		// input type=='image' are not found in elements array! handle it here
		var $input = $(form.clk), input = $input[0];
		n = input.name;
		if (n && !input.disabled && input.type == 'image') {
			a.push({name: n, value: $input.val()});
			a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
		}
	}
	return a;
};

/**
 * Serializes form data into a 'submittable' string. This method will return a string
 * in the format: name1=value1&amp;name2=value2
 */
$.fn.formSerialize = function(semantic) {
	//hand off to jQuery.param for proper encoding
	return $.param(this.formToArray(semantic));
};

/**
 * Serializes all field elements in the jQuery object into a query string.
 * This method will return a string in the format: name1=value1&amp;name2=value2
 */
$.fn.fieldSerialize = function(successful) {
	var a = [];
	this.each(function() {
		var n = this.name;
		if (!n) {
			return;
		}
		var v = $.fieldValue(this, successful);
		if (v && v.constructor == Array) {
			for (var i=0,max=v.length; i < max; i++) {
				a.push({name: n, value: v[i]});
			}
		}
		else if (v !== null && typeof v != 'undefined') {
			a.push({name: this.name, value: v});
		}
	});
	//hand off to jQuery.param for proper encoding
	return $.param(a);
};

/**
 * Returns the value(s) of the element in the matched set.  For example, consider the following form:
 *
 *  <form><fieldset>
 *	  <input name="A" type="text" />
 *	  <input name="A" type="text" />
 *	  <input name="B" type="checkbox" value="B1" />
 *	  <input name="B" type="checkbox" value="B2"/>
 *	  <input name="C" type="radio" value="C1" />
 *	  <input name="C" type="radio" value="C2" />
 *  </fieldset></form>
 *
 *  var v = $(':text').fieldValue();
 *  // if no values are entered into the text inputs
 *  v == ['','']
 *  // if values entered into the text inputs are 'foo' and 'bar'
 *  v == ['foo','bar']
 *
 *  var v = $(':checkbox').fieldValue();
 *  // if neither checkbox is checked
 *  v === undefined
 *  // if both checkboxes are checked
 *  v == ['B1', 'B2']
 *
 *  var v = $(':radio').fieldValue();
 *  // if neither radio is checked
 *  v === undefined
 *  // if first radio is checked
 *  v == ['C1']
 *
 * The successful argument controls whether or not the field element must be 'successful'
 * (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
 * The default value of the successful argument is true.  If this value is false the value(s)
 * for each element is returned.
 *
 * Note: This method *always* returns an array.  If no valid value can be determined the
 *	   array will be empty, otherwise it will contain one or more values.
 */
$.fn.fieldValue = function(successful) {
	for (var val=[], i=0, max=this.length; i < max; i++) {
		var el = this[i];
		var v = $.fieldValue(el, successful);
		if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
			continue;
		}
		v.constructor == Array ? $.merge(val, v) : val.push(v);
	}
	return val;
};

/**
 * Returns the value of the field element.
 */
$.fieldValue = function(el, successful) {
	var n = el.name, t = el.type, tag = el.tagName.toLowerCase();
	if (successful === undefined) {
		successful = true;
	}

	if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
		(t == 'checkbox' || t == 'radio') && !el.checked ||
		(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
		tag == 'select' && el.selectedIndex == -1)) {
			return null;
	}

	if (tag == 'select') {
		var index = el.selectedIndex;
		if (index < 0) {
			return null;
		}
		var a = [], ops = el.options;
		var one = (t == 'select-one');
		var max = (one ? index+1 : ops.length);
		for(var i=(one ? index : 0); i < max; i++) {
			var op = ops[i];
			if (op.selected) {
				var v = op.value;
				if (!v) { // extra pain for IE...
					v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
				}
				if (one) {
					return v;
				}
				a.push(v);
			}
		}
		return a;
	}
	return $(el).val();
};

/**
 * Clears the form data.  Takes the following actions on the form's input fields:
 *  - input text fields will have their 'value' property set to the empty string
 *  - select elements will have their 'selectedIndex' property set to -1
 *  - checkbox and radio inputs will have their 'checked' property set to false
 *  - inputs of type submit, button, reset, and hidden will *not* be effected
 *  - button elements will *not* be effected
 */
$.fn.clearForm = function() {
	return this.each(function() {
		$('input,select,textarea', this).clearFields();
	});
};

/**
 * Clears the selected form elements.
 */
$.fn.clearFields = $.fn.clearInputs = function() {
	return this.each(function() {
		var t = this.type, tag = this.tagName.toLowerCase();
		if (t == 'text' || t == 'password' || tag == 'textarea') {
			this.value = '';
		}
		else if (t == 'checkbox' || t == 'radio') {
			this.checked = false;
		}
		else if (tag == 'select') {
			this.selectedIndex = -1;
		}
	});
};

/**
 * Resets the form data.  Causes all form elements to be reset to their original value.
 */
$.fn.resetForm = function() {
	return this.each(function() {
		// guard against an input with the name of 'reset'
		// note that IE reports the reset function as an 'object'
		if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
			this.reset();
		}
	});
};

/**
 * Enables or disables any matching elements.
 */
$.fn.enable = function(b) {
	if (b === undefined) {
		b = true;
	}
	return this.each(function() {
		this.disabled = !b;
	});
};

/**
 * Checks/unchecks any matching checkboxes or radio buttons and
 * selects/deselects and matching option elements.
 */
$.fn.selected = function(select) {
	if (select === undefined) {
		select = true;
	}
	return this.each(function() {
		var t = this.type;
		if (t == 'checkbox' || t == 'radio') {
			this.checked = select;
		}
		else if (this.tagName.toLowerCase() == 'option') {
			var $sel = $(this).parent('select');
			if (select && $sel[0] && $sel[0].type == 'select-one') {
				// deselect all other options
				$sel.find('option').selected(false);
			}
			this.selected = select;
		}
	});
};

// helper fn for console logging
// set $.fn.ajaxSubmit.debug to true to enable debug logging
function log() {
	if ($.fn.ajaxSubmit.debug) {
		var msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
		if (window.console && window.console.log) {
			window.console.log(msg);
		}
		else if (window.opera && window.opera.postError) {
			window.opera.postError(msg);
		}
	}
};

})(jQuery);
<?php 
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2010 Z.                                                       |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

$config = array();
$config['db']['db_host'] = '{{db_server}}';
$config['db']['db_user'] = '{{db_login}}';
$config['db']['db_passwd'] = '{{db_passwd}}';
$config['db']['db_base'] = '{{db_name}}';

$config['epochtasms']['login'] = '{{epochtasms_login}}';
$config['epochtasms']['passwd'] = '{{epochtasms_passwd}}';
$config['epochtasms']['from'] = '{{epochtasms_from}}';

$config['ui']['theme'] = 'south-street';

$config['class']['numbers'] = range(1, 12);
$config['class']['letters'] = array('А','Б','В','Г','Д');

?>
<?php
#
# $Id: header.php 17 2010-03-30 16:45:00Z kuzmich $
#

?>
<html>
  <head>
    <title>Школьный журнал</title>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery-ui.js"></script>
    <script type="text/javascript" src="js/i18n/jquery-ui.datepicker-ru.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css" />
  </head>
  <body>
<?php if (isset($_SESSION['student_id']))  { ?>
<br />
<div align="center">
 <table border="0" cellspacing="0" cellpadding="0" class="table_menu" style="width:200px">
  <tr>
    <td><img src="images/circle_left_top.gif" alt="" width="6" height="6"></td>
    <td valign="top" class="border_top"><img src="images/border.gif" alt="" width="1" height="1"></td>
    <td><img src="images/circle_right_top.gif" alt="" width="6" height="6"></td>
  </tr>
  <tr>
    <td class="border_left">&nbsp;</td>
    <td class="padding"><table>
      <tr>
        <td nowrap="nowrap">&nbsp;<a href="index.php">Просмотр оценок</a>&nbsp;</td>
        <td align="center"><img src="../images/dec.png" alt="" width="1" height="51"></td>
        <td>&nbsp;<a href="index.php?action=logout">Выход</a>&nbsp;</td>
      </tr>
    </table></td>
    <td class="border_right">&nbsp;</td>
  </tr>
  <tr>
    <td><img s
<?php 
/*****************************************************************************\
+-----------------------------------------------------------------------------+
| SchoolReg                                                                   |
| Copyright (c) 2010 Z.                                                       |
| Copyright (c) 2009 Sergey V. Kuzin <sergey@kuzin.name>                      |
| All rights reserved.                                                        |
+-----------------------------------------------------------------------------+
\*****************************************************************************/

$config = array();
$config['db']['db_host'] = '{{db_server}}';
$config['db']['db_user'] = '{{db_login}}';
$config['db']['db_passwd'] = '{{db_passwd}}';
$config['db']['db_base'] = '{{db_name}}';

$config['epochtasms']['login'] = '{{epochtasms_login}}';
$config['epochtasms']['passwd'] = '{{epochtasms_passwd}}';
$config['epochtasms']['from'] = '{{epochtasms_from}}';

$config['ui']['theme'] = 'south-street';

$config['class']['numbers'] = range(1, 12);
$config['class']['letters'] = array('А','Б','В','Г','Д');

?>
<?php

Class epochtasms
   {
    /**
    * GetCommandStatus - декодирует ответ от сервера
    *
    * @param $status string - Статус комманды от сервера
    *
    * @return string Расшифровка - статус комманды от сервера
    */
    function GetCommandStatus($status)
     {
      switch($status)
       {
        case '0':
          return 'Запрос верный';
        break;

        case '-1':
          return 'Неправильный логин и/или пароль';
        break;

        case '-2':
          return 'Неправильный формат XML';
        break;

        case '-3':
          return 'Недостаточно кредитов на аккаунте пользователя';
        break;

        case '-4':
          return 'Нет верных номеров получателей';
        break;

        default:
          return 'Ответ не распознан';
        break;
      } // switch($status)

    } // GetCommandStatus


    /**
    * SendToServer - отправка запроса на сервер через cURL
    *
    * @param $xml_data string XML-запрос к серверу (SOAP)
    * @param $headers string Заголовки запроса к серверу (SOAP)
    *
    * @return string XML-ответ от сервера (SOAP)
    */
    function SendToServer($xml_data,$headers)
       {
        $ch = curl_init(); // Инициализировать библиотеку cURL
        curl_setopt($ch, CURLOPT_URL,"http://atompark.com/members/sms/xml.php");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Должен быть ответ (ожидание ответа) от сервера
        curl_setopt($ch, CURLOPT_TIMEOUT, 60); // Задать тайм-аут работы с сокетами
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); // Задать заголовки HTTP запроса
        curl_setopt($ch, CURLOPT_POST, 1); // Будет POST запрос
        curl_setopt($ch, CURLOPT_POSTFIELDS, $xml_data); // Задать тело POST
        $data = curl_exec($ch); // Выполнить HTTP обмен
        if(curl_errno($ch))
           {
            die("Error: ".curl_error($ch));
            }
        else
           {
            curl_close($ch);
            return $data;
            }

        } // SendToServer

    /**
    * GetCreditBalance – запрос на получение баланса пользователя
    *
    * @param $login string Логин пользователя
    * @param $password string Пароль пользователя
    *
    * @return array("Ответ сервера" => (string), "Балланс" => (decimal)) Ответ сервера в виде массива данных
    */
    function GetCreditBalance($login,$password)
       {

$xml_data = '<SMS>
<operations>
<operation>BALANCE</operation>
</operations>
<authentification>
<username>'.$login.'</username>
<password>'.$password.'</password>
</authentification>
</SMS>';

        $headers = array(
            "POST /members/sms/xml.php HTTP/1.1",
            "HOST atompark.com",
            "Content-Type: text/xml; charset=utf-8",
            "Content-length: ".strlen($xml_data),
            );

        $data = $this->SendToServer($xml_data,$headers);
        // Show me the result
        $p = xml_parser_create();
        xml_parse_into_struct($p,$data,$results);
        xml_parser_free($p);
        return array(
            "Ответ сервера" => $this->GetCommandStatus($results[1]['value']),
            "Балланс" => $results[3]['value']
            );
        } // GetCreditBalance

    /**
    * SendTextMessage - передача простого текстового SMS-сообщения
    *
    * @param $login string Логин пользователя
    * @param $password string Пароль пользователя
    * @param $destinationAddress string Мобильный телефонный номер получателя сообщения, в международном формате: код страны + код сети + номер телефона. Пример: 7903123456
    * @param $messageData string Текст сообщения, поддерживаемые кодировки IA5 и UCS2
    * @param $sourceAddress string Адрес отправителя сообщения. До 11 латинских символов или до 15 цифровых
    * @param $deliveryReport boolean Запрашивать отчет о статусе данного сообщения
    * @param $flashMessage boolean Отправка Flash-SMS
    * @param $validityPeriod integer Время жизни сообщения, устанавливается в минутах
    *
    * @return array("Ответ сервера" => (string), "ID сообщения" => (decimal)) Ответ сервера в виде массива данных
    */
    function SendTextMessage($login,$password,$destinationAddress,$messageData,$sourceAddress)
       {
$messageId = uniqid('sms');
$xml_data = '
<SMS>
<operations>
<operation>SEND</operation>
</operations>
<authentification>
<username>'.$login.'</username>
<password>'.$password.'</password>
</authentification>
<message>
<sender>'.$sourceAddress.'</sender>
<text>'.$messageData.'</text>
</message>
<numbers>
<number messageID="'.$messageId.'">'.$destinationAddress.'</number>
</numbers>
</SMS>
';

        $headers = array(
            "POST /members/sms/xml.php HTTP/1.1",
            "HOST atompark.com",
            "Content-Type: text/xml; charset=utf-8",
            "Content-length: ".strlen($xml_data),
            );

        $data = $this->SendToServer($xml_data,$headers);
        // Show me the result
        $p = xml_parser_create();
        xml_parse_into_struct($p,$data,$results);
        xml_parser_free($p);

    }
  }


?>
