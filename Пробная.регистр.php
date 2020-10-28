//элемент с классом row, который находится внутри элемента с id wrap
let parent = element.closest('#wrap .row');
//или div, у которого есть атрибут data-description
let div = element.closest('div[data-description]');
