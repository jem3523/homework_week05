//each div will need to look at real time and change color based on past/present/future
//will need to use https://momentjs.com/
//save everything in local storage in an array + save eventListener
//head should include the current day

$(document).ready(function() 
    {console.log("ready")});

  timeSlots = [
    {label: "09 AM", entry:"start work"},
    {label: "10 AM", entry:"get coffee"},
    {label: "11 AM", entry:"take nap"},
    {label: "12 PM", entry:"lunch"},
    {label: "01 PM", entry:""},
    {label: "02 PM", entry:""},
    {label: "03 PM", entry:"open"},
    {label: "04 PM", entry:"open"},
    {label: "05 PM", entry:"go home"}];


function pageRender()
{
  $.each(timeSlots, function(index,value) 
  {
    $("#main").append("<div id='" + index + "_lineDiv' class='input-group' ></div>");
    $("#" + index + "_lineDiv").append("<div id='" + index + "_labelDiv' class='input-group-prepend' ><span class='input-group-text'>" + value.label + "</span></div>");
    $("#" + index + "_lineDiv").append("<div id='" + index + "_inputDiv' class='form-control' type='text' >" + value.entry + "</div>");
    $("#" + index + "_lineDiv").append("<div id='" + index + "_buttonDiv' class='input-group-append' type='button'><button class='btn btn-outline-secondary' type='button' id='" + index + "_button'>Save</div>");
  });
}