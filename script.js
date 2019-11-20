$(document).ready(function() 
{
  timeSlots = [
    {time: 9,  label: "09 AM", entry:""},
    {time: 10, label: "10 AM", entry:""},
    {time: 11, label: "11 AM", entry:""},
    {time: 12, label: "12 PM", entry:""},
    {time: 13,  label: "01 PM", entry:""},
    {time: 14,  label: "02 PM", entry:""},
    {time: 15,  label: "03 PM", entry:""},
    {time: 16,  label: "04 PM", entry:""},
    {time: 17,  label: "05 PM", entry:""},
    {time: 18,  label: "06 PM", entry:""}];

  //build the dynamic page
  function pageRender()
  { 
    //first check to see the local storage has been built
    if (localStorage.getItem("timeSlots") !== null)
    {timeSlots = JSON.parse(localStorage.getItem("timeSlots"))};

    //then build the basic structure of the page (cycle through for each line)
    $.each(timeSlots,function(index,value)
    {
      $("#main").append("<div id='lineDiv_" + index + "' class='input-group' ></div>");
      $("#lineDiv_" + index).append("<div id='label_" + index + "' class='input-group-prepend hour' ><span class='input-group-text'>" + value.label + "</span></div>");
      $("#lineDiv_" + index).append("<input id='input_" + index + "' class='form-control' type='text' value='" + value.entry + "'></input>");
      $("#lineDiv_" + index).append("<div id='buttonDiv_" + index + "' class='input-group-append'><button class='btn btn-outline-secondary saveBtn' type='button' value ='" + index + "'>Save</div>");
    })
  };

  //this function updates both the date in the header and checks every minute to update the color coding based on current time
  function updateStatus()
  {
    $("#currentDay").text(moment().format('MMMM Do YYYY'));

    //note that the time check is ONLY the hour in military time
    $.each(timeSlots,function(index,value)
    {
      if(value.time == moment().format('H'))
      {
        $("#input_" + index).addClass("present");
        $("#input_" + index).removeClass("past", "future");
      };
      if(value.time < moment().format('H'))
      {
        $("#input_" + index).addClass("past");
        $("#input_" + index).removeClass("present", "future");
      }
      if(value.time > moment().format('H'))
      {
        $("#input_" + index).addClass("future");
        $("#input_" + index).removeClass("past", "present");
      }
    })
  };

  //save to local storage 
  function saveToLocal()
  {
    console.log(event);
    event.preventDefault();
    var tempIndex = event.target.value;
    var tempValue = document.getElementById("input_" + tempIndex).value
    //JASON ... ask why the line below does not work
    //var tempValue = $("#input_" + tempIndex).value
    timeSlots[tempIndex].entry = tempValue
    localStorage.setItem("timeSlots", JSON.stringify(timeSlots));
  };

  pageRender();
  updateStatus();
  internvalID = setInterval(updateStatus,60000);
  $(".saveBtn").on("click" , saveToLocal);
  console.log("ready")
})