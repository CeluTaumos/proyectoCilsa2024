$(document).ready(function () {
  $(".filter-btn").on("click", function () {
    const filterValue = $(this).data("filter");
    if (filterValue === "todos") {
      $(".product").show();
    } else {
      $(".product").hide();
      $("." + filterValue).show();
    }
  });
});
